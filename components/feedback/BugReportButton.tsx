"use client";

import { useEffect, useState, useCallback } from "react";
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
  const [feedback, setFeedback] = useState<ReturnType<
    typeof Sentry.getFeedback
  > | null>(null);

  // Get feedback instance on client mount only
  useEffect(() => {
    // Small delay to ensure Sentry is fully initialized
    const timeoutId = setTimeout(() => {
      const feedbackInstance = Sentry.getFeedback();
      console.log("Sentry Feedback instance:", feedbackInstance);
      setFeedback(feedbackInstance ?? null);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleClick = useCallback(async () => {
    console.log("Bug Report Button Clicked");
    console.log("Current feedback instance:", feedback);

    if (!feedback) {
      // Try getting it again in case it wasn't ready before
      const freshFeedback = Sentry.getFeedback();
      console.log("Fresh feedback attempt:", freshFeedback);

      if (!freshFeedback) {
        console.error("Sentry Feedback integration not found");
        toast.error(
          "Bug report system is loading, please try again in a moment",
        );
        return;
      }

      // Use the fresh instance
      try {
        const form = await freshFeedback.createForm();
        if (form) {
          form.appendToDom();
          form.open();
        }
      } catch (e) {
        console.error("Error creating form:", e);
        toast.error("Something went wrong opening the bug report form");
      }
      return;
    }

    try {
      // Use createForm to open the feedback dialog
      const form = await feedback.createForm();
      if (form) {
        form.appendToDom();
        form.open();
      }
      console.log("Feedback form opened");
    } catch (e) {
      console.error("Error opening feedback form:", e);
      toast.error("Something went wrong opening the bug report form");
    }
  }, [feedback]);

  if (variant === "floating") {
    return (
      <button
        type="button"
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
      type="button"
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
