"use client";

import { useCallback } from "react";
import * as Sentry from "@sentry/nextjs";
import { getFeedback } from "@sentry/nextjs";
import { Bug } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BugReportButtonProps {
  className?: string;
  variant?: "floating" | "inline";
}

// Helper function to wait for Sentry Feedback integration to be available
function getFeedbackWithRetry(
  retries = 10,
  delay = 1000,
): Promise<ReturnType<typeof Sentry.getFeedback>> {
  return new Promise((resolve, reject) => {
    const attempt = (remaining: number) => {
      const feedback = getFeedback();
      if (feedback) {
        resolve(feedback);
      } else if (remaining === 0) {
        reject(new Error("Sentry Feedback integration not found"));
      } else {
        setTimeout(() => attempt(remaining - 1), delay);
      }
    };
    attempt(retries);
  });
}

export function BugReportButton({
  className,
  variant = "inline",
}: BugReportButtonProps) {
  const handleClick = useCallback(async () => {
    console.log("[BugReportButton] Clicked");

    try {
      const feedbackInstance = await getFeedbackWithRetry();
      if (!feedbackInstance) throw new Error("Feedback instance not available");
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
      console.error("[BugReportButton] Error:", e);
      toast.error(
        "Bug report system is still loading. Please try again in a few seconds.",
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
