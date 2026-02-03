/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as Sentry from "@sentry/nextjs";
import { Bug } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BugReportButtonProps {
  className?: string;
  variant?: "floating" | "inline";
}

export function BugReportButton({
  className,
  variant = "inline",
}: BugReportButtonProps) {
  const handleClick = () => {
    console.log("Bug Report Clicked");

    // Show toast immediately to give user feedback
    toast.info("Preparing bug report...");

    try {
      // 1. Capture a silent event to generate an eventId
      const eventId = Sentry.captureMessage("User opened bug report dialog");
      console.log("Captured Sentry Event ID:", eventId);

      if (eventId) {
        // 2. Show the Crash-Report Modal with that eventId
        Sentry.showReportDialog({
          eventId,
          title: "It looks like we're having internal issues.",
          subtitle:
            "Our team has been notified. If you'd like to help, tell us what happened below.",
          labelName: "Name",
          labelEmail: "Email",
          labelComments: "What happened?",
        });
      } else {
        console.warn("No Event ID returned from Sentry");
        toast.error("Failed to initialize report system.");
      }
    } catch (e) {
      console.error("Error opening dialog:", e);
      toast.error("Something went wrong opening the report dialog.");
    }
  };

  if (variant === "floating") {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg transition-transform hover:scale-110 active:scale-95 dark:bg-white dark:text-black",
          className,
        )}
        title="Report a Bug"
      >
        <Bug className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-white",
        className,
      )}
    >
      <Bug className="h-4 w-4" />
      <span>Report Bug</span>
    </button>
  );
}
