/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/static-components */
"use client";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconMail,
  IconPhone,
  IconSend,
  IconCopy,
} from "@tabler/icons-react";
import emailjs from "@emailjs/browser";
import { Label } from "@/components/ui/primitives/label";
import { Input } from "@/components/ui/primitives/input";
import { AnimatedAlert } from "@/components/ui/misc/animated-alert";
import { HoverBorderGradient } from "@/components/ui/buttons/hover-border-gradient";
import { motion, Variants } from "motion/react";
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

export function ContactSection() {
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="w-full py-20 lg:py-40"
      id="contact"
    >
      <AnimatedAlert
        title={alertState.title}
        description={alertState.description}
        variant={alertState.variant}
        isVisible={alertState.isVisible}
        onClose={() => setAlertState((prev) => ({ ...prev, isVisible: false }))}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          variants={itemVariants}
          className="mt-1 mb-8 flex justify-center"
        >
          <HoverBorderGradient containerClassName="rounded-full">
            💭Have a questions or ideas? Let&apos;s talk!🚀
          </HoverBorderGradient>
        </motion.div>
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get in Touch - Let&apos;s Connect!
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column: Contact Form */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                <IconSend className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Send me an email
              </h3>
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

          {/* Right Column: Contact Info Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone */}
            <motion.div variants={itemVariants}>
              <ContactCard
                icon={<IconPhone className="w-6 h-6" />}
                title="Phone number"
                value="🇵🇭 +63 960 418 0219"
                href="#"
                clickable={false}
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <ContactCard
                icon={<IconMail className="w-6 h-6" />}
                title="E-mail"
                value="duquechristianjohncalderon@gmail.com"
                href="#"
                clickable={false}
                copyable
              />
            </motion.div>

            {/* LinkedIn */}
            <motion.div variants={itemVariants}>
              <ContactCard
                icon={<IconBrandLinkedin className="w-6 h-6" />}
                title="LinkedIn"
                value="cj-black-a5b110335"
                href="https://www.linkedin.com/in/cj-black-a5b110335"
              />
            </motion.div>

            {/* GitHub */}
            <motion.div variants={itemVariants}>
              <ContactCard
                icon={<IconBrandGithub className="w-6 h-6" />}
                title="Github"
                value="github.com/CJBLACK24"
                href="https://github.com/CJBLACK24"
              />
            </motion.div>

            {/* Instagram */}
            <motion.div variants={itemVariants}>
              <ContactCard
                icon={<IconBrandInstagram className="w-6 h-6" />}
                title="Instagram"
                value="@cjblack_24"
                href="https://www.instagram.com/cjblack_24/"
              />
            </motion.div>
          </div>
        </div>

        {/* Confirmation Dialog */}
        <AlertDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
        >
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
      </div>
    </motion.div>
  );
}

const ContactCard = ({
  icon,
  title,
  value,
  href,
  copyable = false,
  clickable = true,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
  copyable?: boolean;
  clickable?: boolean;
}) => {
  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);

    // Fire confetti on copy
    confetti({
      particleCount: 50,
      spread: 60,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ["#06b6d4", "#ffffff"], // Cyan and White
      ticks: 200,
      gravity: 1.2,
      scalar: 0.8,
    });
  };

  const CardContent = () => (
    <>
      <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center mb-8 group-hover:bg-neutral-700 transition-colors">
        <div className="text-neutral-400 group-hover:text-white transition-colors">
          {icon}
        </div>
      </div>
      <div>
        <h4 className="text-neutral-400 font-medium mb-1">{title}</h4>
        <div className="flex items-center justify-between">
          <span className="text-white font-medium truncate mr-2">{value}</span>
          {copyable && (
            <button
              onClick={handleCopy}
              className="text-neutral-500 hover:text-white transition-colors cursor-pointer"
              aria-label={`Copy ${title}`}
            >
              <IconCopy className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </>
  );

  if (!clickable) {
    return (
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between group cursor-default">
        <CardContent />
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between hover:bg-neutral-800/50 transition-colors group cursor-pointer"
    >
      <CardContent />
    </a>
  );
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
