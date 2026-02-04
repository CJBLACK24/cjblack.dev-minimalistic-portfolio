/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as Sentry from "@sentry/nextjs";
import { Bug } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { feedbackIntegrationInstance } from "../../sentry.client.config";

interface BugReportButtonProps {
  className?: string;
  variant?: "floating" | "inline";
}

export function BugReportButton({
  className,
  variant = "inline",
}: BugReportButtonProps) {
  const handleClick = async () => {
    console.log("Bug Report Button Clicked");

    try {
      // Use the exported integration instance directly
      const feedback = feedbackIntegrationInstance as any;
      console.log("Feedback instance from config:", feedback);

      if (!feedback) {
        console.error("Sentry Feedback integration instance not found");
        toast.error("Bug report system not available");
        return;
      }

      // In Sentry v8+, the integration instance has methods to create the form
      console.log("Creating feedback form...");
      // Try to open it directly if openDialog exists, or create form
      if (typeof feedback.openDialog === "function") {
        console.log("Opening via openDialog()");
        feedback.openDialog();
      } else if (typeof feedback.createForm === "function") {
        const form = await feedback.createForm();
        console.log("Form created:", form);
        if (form) {
          form.appendToDom();
          form.open();
        }
      } else {
        // Fallback to Sentry.getFeedback() if the instance isn't helping
        const globalFeedback = Sentry.getFeedback();
        console.log("Global Feedback instance:", globalFeedback);
        if (globalFeedback) {
          const form = await globalFeedback.createForm();
          form.appendToDom();
          form.open();
        } else {
          throw new Error("No feedback integration methods found");
        }
      }

      console.log("Feedback process initiated");
    } catch (e) {
      console.error("Error opening feedback form:", e);
      toast.error("Something went wrong opening the bug report form");
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
