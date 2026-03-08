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

  if (now - lastSendTime > RESET_DURATION) {
    localStorage.removeItem("contactCooldown");
    return { attempts: 0, cooldownEnd: 0, countdown: 0 };
  } else if (cooldownEnd > now) {
    return {
      attempts,
      cooldownEnd,
      countdown: Math.ceil((cooldownEnd - now) / 1000),
    };
  } else {
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
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export const ContactForm = ({ itemVariants }: SectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
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

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(
    () => loadCooldownState().cooldownEnd,
  );
  const [attemptCount, setAttemptCount] = useState(
    () => loadCooldownState().attempts,
  );
  const [countdown, setCountdown] = useState(
    () => loadCooldownState().countdown,
  );

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cooldownTime > 0 && countdown > 0) {
      return;
    }
    setShowConfirmDialog(true);
  };

  const sendEmail = () => {
    setShowConfirmDialog(false);
    setLoading(true);

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

          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#06b6d4", "#3b82f6", "#ffffff"],
          });

          const now = Date.now();
          const newAttemptCount = attemptCount + 1;
          const cooldownIndex = Math.min(
            newAttemptCount - 1,
            COOLDOWN_DURATIONS.length - 1,
          );
          const cooldownDuration = COOLDOWN_DURATIONS[cooldownIndex] ?? 0;
          const newCooldownEnd = now + cooldownDuration;

          localStorage.setItem(
            "contactCooldown",
            JSON.stringify({
              lastSendTime: now,
              attempts: newAttemptCount,
              cooldownEnd: newCooldownEnd,
            }),
          );

          setAttemptCount(newAttemptCount);
          setCooldownTime(newCooldownEnd);
          setCountdown(Math.ceil(cooldownDuration / 1000));

          setTimeout(
            () => setAlertState((prev) => ({ ...prev, isVisible: false })),
            5000,
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
            5000,
          );
        },
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

      {/* Contact Form - Theme aware */}
      <motion.div
        ref={containerRef}
        variants={itemVariants}
        className="group relative rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-white/20 md:p-8 lg:col-span-1"
      >
        <div className="relative">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors duration-300 group-hover:border-white/20">
              <IconSend className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Send me a message
            </h3>
          </div>

          <form ref={form} onSubmit={handleSubmit} className="space-y-5">
            <LabelInputContainer>
              <Label
                htmlFor="name"
                className="text-sm font-medium text-neutral-600 dark:text-neutral-500"
              >
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Your Name"
                type="text"
                required
                className="rounded-xl border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-all duration-200 placeholder:text-neutral-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-white dark:placeholder:text-neutral-600 dark:focus:border-cyan-500/40"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-neutral-600 dark:text-neutral-500"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="your@email.com"
                type="email"
                required
                className="rounded-xl border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-all duration-200 placeholder:text-neutral-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-white dark:placeholder:text-neutral-600 dark:focus:border-cyan-500/40"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label
                htmlFor="message"
                className="text-sm font-medium text-neutral-600 dark:text-neutral-500"
              >
                Message
              </Label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message..."
                className="flex min-h-[120px] w-full resize-none rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-white transition-all duration-200 placeholder:text-neutral-500 focus-visible:border-white/30 focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </LabelInputContainer>

            <button
              type="submit"
              disabled={loading || (countdown > 0 && cooldownTime > 0)}
              className="relative z-20 mt-2 w-full rounded-lg bg-white py-3 font-semibold text-black transition-all duration-300 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Sending..."
                : countdown > 0 && cooldownTime > 0
                  ? `Wait ${formatTime(countdown)}`
                  : "Send Message"}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="rounded-2xl border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-neutral-900 dark:text-white">
              Confirm Send Message
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3 text-neutral-600 dark:text-neutral-400">
                <p>Are you sure you want to send this message?</p>
                {attemptCount < 3 && (
                  <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-500/20 dark:bg-amber-500/10">
                    <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                      ⚠️ Anti-spam Notice:
                    </p>
                    <p className="mt-1 text-sm text-amber-600 dark:text-amber-300/80">
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
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl border-neutral-200 bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={sendEmail}
              className="rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-100"
            >
              Send Message
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
