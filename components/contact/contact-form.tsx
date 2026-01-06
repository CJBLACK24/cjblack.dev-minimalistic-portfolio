"use client";

import React, { useState, useRef, useEffect } from "react";
import { IconSend } from "@tabler/icons-react";
import emailjs from "@emailjs/browser";
import { Label } from "@/components/ui/primitives/label";
import { Input } from "@/components/ui/primitives/input";
import { AnimatedAlert } from "@/components/ui/misc/animated-alert";
import { cn } from "@/lib/utils";

import { motion } from "motion/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/primitives/alert-dialog";
import confetti from "canvas-confetti";
import { SectionProps } from "@/types";

// Cooldown durations in milliseconds
const COOLDOWN_DURATIONS = [
  2 * 60 * 1000, // 2 minutes
  5 * 60 * 1000, // 5 minutes
  10 * 60 * 1000, // 10 minutes
];
const RESET_DURATION = 60 * 60 * 1000; // 1 hour

// Helper to load initial cooldown state
const loadCooldownState = () => {
  if (typeof window === "undefined")
    return { attempts: 0, cooldownEnd: 0, countdown: 0 };

  const storedData = localStorage.getItem("contactCooldown");
  if (!storedData) return { attempts: 0, cooldownEnd: 0, countdown: 0 };

  const { lastSendTime, attempts, cooldownEnd } = JSON.parse(storedData);
  const now = Date.now();

  // Check if 1 hour has passed since last send
  if (now - lastSendTime > RESET_DURATION) {
    localStorage.removeItem("contactCooldown");
    return { attempts: 0, cooldownEnd: 0, countdown: 0 };
  } else if (cooldownEnd > now) {
    // Still in cooldown
    return {
      attempts,
      cooldownEnd,
      countdown: Math.ceil((cooldownEnd - now) / 1000),
    };
  } else {
    // Cooldown expired but within 1 hour
    return { attempts, cooldownEnd: 0, countdown: 0 };
  }
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export const ContactForm = ({ itemVariants }: SectionProps) => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState<{
    isVisible: boolean;
    title: string;
    description: string;
    variant: "default" | "destructive" | "success";
  }>({
    isVisible: false,
    title: "",
    description: "",
    variant: "default",
  });

  // Anti-spam states with lazy initialization
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(
    () => loadCooldownState().cooldownEnd
  );
  const [attemptCount, setAttemptCount] = useState(
    () => loadCooldownState().attempts
  );
  const [countdown, setCountdown] = useState(
    () => loadCooldownState().countdown
  );

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Format countdown time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle form submission - show confirmation dialog first
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if in cooldown
    if (cooldownTime > 0 && countdown > 0) {
      return;
    }

    // Show confirmation dialog
    setShowConfirmDialog(true);
  };

  // Actually send the email after confirmation
  const sendEmail = () => {
    setShowConfirmDialog(false);
    setLoading(true);

    // Using provided credentials directly as fallback since .env write was blocked
    const serviceId =
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_y3wm8nt";
    const templateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_b0daahr";
    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "XabdOeH4ulaupnrdS";

    if (form.current) {
      const formData = new FormData(form.current);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const message = formData.get("message") as string;

      // Manually construct template params
      // Appending email to message ensures it shows up in the body
      const templateParams = {
        name: name,
        email: email,
        title: "Portfolio Contact",
        time: new Date().toLocaleString(),
        message: `${message}\n\nSender Email: ${email}`,
      };

      emailjs.send(serviceId, templateId, templateParams, publicKey).then(
        (result) => {
          console.log(result.text);
          setLoading(false);
          setAlertState({
            isVisible: true,
            title: "Success!",
            description: "Your message has been sent successfully.",
            variant: "success",
          });
          form.current?.reset();

          // Fire confetti on success
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#06b6d4", "#3b82f6", "#ffffff"], // Cyan, Blue, White
          });

          // Update cooldown and attempt count
          const now = Date.now();
          const newAttemptCount = attemptCount + 1;
          const cooldownIndex = Math.min(
            newAttemptCount - 1,
            COOLDOWN_DURATIONS.length - 1
          );
          const newCooldownEnd = now + COOLDOWN_DURATIONS[cooldownIndex];

          // Save to localStorage
          localStorage.setItem(
            "contactCooldown",
            JSON.stringify({
              lastSendTime: now,
              attempts: newAttemptCount,
              cooldownEnd: newCooldownEnd,
            })
          );

          setAttemptCount(newAttemptCount);
          setCooldownTime(newCooldownEnd);
          setCountdown(Math.ceil(COOLDOWN_DURATIONS[cooldownIndex] / 1000));

          setTimeout(
            () => setAlertState((prev) => ({ ...prev, isVisible: false })),
            5000
          );
        },
        (error) => {
          console.log(error.text);
          setLoading(false);
          setAlertState({
            isVisible: true,
            title: "Error",
            description: "Something went wrong. Please try again.",
            variant: "destructive",
          });
          setTimeout(
            () => setAlertState((prev) => ({ ...prev, isVisible: false })),
            5000
          );
        }
      );
    }
  };

  return (
    <>
      <AnimatedAlert
        title={alertState.title}
        description={alertState.description}
        variant={alertState.variant}
        isVisible={alertState.isVisible}
        onClose={() => setAlertState((prev) => ({ ...prev, isVisible: false }))}
      />

      {/* Contact Form */}
      <motion.div
        variants={itemVariants}
        className="lg:col-span-1 bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
            <IconSend className="text-white w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-white">Send me an email</h3>
        </div>

        <form ref={form} onSubmit={handleSubmit} className="space-y-6">
          <LabelInputContainer>
            <Label htmlFor="name" className="text-neutral-400">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Your Name"
              type="text"
              required
              className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="email" className="text-neutral-400">
              E-mail
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="your@email.com"
              type="email"
              required
              className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="message" className="text-neutral-400">
              Message
            </Label>
            <textarea
              id="message"
              name="message"
              placeholder="Your message..."
              className="flex min-h-[120px] w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
          </LabelInputContainer>

          <button
            type="submit"
            disabled={loading || (countdown > 0 && cooldownTime > 0)}
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Sending..."
              : countdown > 0 && cooldownTime > 0
              ? `Wait ${formatTime(countdown)}`
              : "To send"}
          </button>
        </form>
      </motion.div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="bg-neutral-900 border-neutral-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-xl">
              Confirm Send Message
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="text-neutral-400 space-y-3">
                <p>Are you sure you want to send this message?</p>
                {attemptCount < 3 && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mt-3">
                    <p className="text-yellow-400 text-sm font-medium">
                      ⚠️ Anti-spam Notice:
                    </p>
                    <p className="text-yellow-300/80 text-sm mt-1">
                      After sending, you&apos;ll need to wait{" "}
                      <span className="font-semibold">
                        {attemptCount === 0
                          ? "2 minutes"
                          : attemptCount === 1
                          ? "5 minutes"
                          : "10 minutes"}
                      </span>{" "}
                      before sending another message.
                    </p>
                    {attemptCount > 0 && (
                      <p className="text-yellow-300/60 text-xs mt-2">
                        This is your {attemptCount === 1 ? "2nd" : "3rd"}{" "}
                        attempt. Cooldown period increases with each send.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={sendEmail}
              className="bg-white text-black hover:bg-neutral-200"
            >
              Send Message
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
