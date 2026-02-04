"use client";

import { useEffect, useState, useCallback } from "react";
import { getFeedback } from "@sentry/nextjs";
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
    typeof getFeedback
  > | null>(null);

  // Get feedback instance on client mount only
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5;

    const tryGetFeedback = () => {
      const feedbackInstance = getFeedback();
      console.log(
        `[BugReportButton] Attempt ${retryCount + 1} to get feedback:`,
        feedbackInstance,
      );

      if (feedbackInstance) {
        setFeedback(feedbackInstance);
      } else if (retryCount < maxRetries) {
        retryCount++;
        setTimeout(tryGetFeedback, 1000); // Wait 1s between retries
      } else {
        console.warn(
          "[BugReportButton] Failed to find Sentry Feedback integration after retries",
        );
      }
    };

    // Initial attempt after a small delay to allow Sentry to initialize
    const timeoutId = setTimeout(tryGetFeedback, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleClick = useCallback(async () => {
    console.log("[BugReportButton] Clicked");

    // Try getting a fresh instance if state is null
    const feedbackInstance = feedback || getFeedback();

    if (!feedbackInstance) {
      console.error("[BugReportButton] Sentry Feedback integration not found");
      toast.error(
        "Bug report system is still loading. Please try again in a few seconds.",
      );
      return;
    }

    try {
      // For Sentry v8+, use createForm explicitly when autoInject is false
      const form = await feedbackInstance.createForm();
      if (form) {
        // Form might already be in DOM depending on implementation, but appendToDom is safe for v8
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
