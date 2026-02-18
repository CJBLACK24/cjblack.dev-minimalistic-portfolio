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
  const [feedbackReady, setFeedbackReady] = useState(false);

  // Wait for Sentry Feedback integration to be available
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 10;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tryGetFeedback = () => {
      const feedbackInstance = Sentry.getFeedback();
      console.log(
        `[BugReportButton] Attempt ${retryCount + 1} to get feedback:`,
        !!feedbackInstance,
      );

      if (feedbackInstance) {
        setFeedbackReady(true);
      } else if (retryCount < maxRetries) {
        retryCount++;
        timeoutId = setTimeout(tryGetFeedback, 1000);
      } else {
        console.warn(
          "[BugReportButton] Failed to find Sentry Feedback integration after retries",
        );
      }
    };

    // Initial attempt after a small delay to allow Sentry to initialize
    timeoutId = setTimeout(tryGetFeedback, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleClick = useCallback(async () => {
    console.log("[BugReportButton] Clicked");

    // Always grab a fresh reference via the Sentry namespace
    const feedbackInstance = Sentry.getFeedback();

    if (!feedbackInstance) {
      console.error("[BugReportButton] Sentry Feedback integration not found");
      toast.error(
        "Bug report system is still loading. Please try again in a few seconds.",
      );
      return;
    }

    try {
      const form = await feedbackInstance.createForm();
      if (form) {
        if (typeof form.appendToDom === "function") {
          form.appendToDom();
        }
        form.open();
        console.log("[BugReportButton] Feedback form opened");
      } else {
        throw new Error("Form could not be created");
      }
    } catch (e) {
      console.error("[BugReportButton] Error opening feedback form:", e);
      toast.error(
        "Something went wrong opening the bug report form. Please try again.",
      );
    }
  }, []);

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
