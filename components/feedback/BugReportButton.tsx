/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as Sentry from "@sentry/nextjs";
import { Bug } from "lucide-react";
import { cn } from "@/lib/utils";

interface BugReportButtonProps {
  className?: string;
  variant?: "floating" | "inline";
}

export function BugReportButton({
  className,
  variant = "inline",
}: BugReportButtonProps) {
  const handleOpenFeedback = () => {
    try {
      // The most reliable way in modern @sentry/nextjs is to use the global showReportDialog
      // if the feedback integration is being tricky, but we try the integration first.
      const feedback = Sentry.getFeedback();

      if (
        feedback &&
        "open" in feedback &&
        typeof (feedback as any).open === "function"
      ) {
        (feedback as any).open();
      } else {
        // Fallback for different SDK versions or lazy-loading states
        console.warn(
          "Feedback integration 'open' not available, using showReportDialog fallback",
        );
        Sentry.showReportDialog();
      }
    } catch (error) {
      console.error("Failed to open Sentry Feedback:", error);
      // Fail-safe fallback to ensure the user can still report issues
      Sentry.showReportDialog();
    }
  };

  if (variant === "floating") {
    return (
      <button
        onClick={handleOpenFeedback}
        className={cn(
          "fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-blue-600 text-white shadow-xl transition-all hover:scale-110 hover:bg-blue-700 active:scale-95 dark:bg-blue-600/90 dark:backdrop-blur-sm",
          className,
        )}
        title="Report a Bug"
      >
        <Bug className="h-6 w-6" />
      </button>
    );
  }

  return (
    <button
      onClick={handleOpenFeedback}
      className={cn(
        "flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/60 transition-all hover:border-blue-500/30 hover:bg-white/10 hover:text-white",
        className,
      )}
    >
      <Bug className="h-4 w-4 text-blue-400" />
      Report a Bug
    </button>
  );
}
