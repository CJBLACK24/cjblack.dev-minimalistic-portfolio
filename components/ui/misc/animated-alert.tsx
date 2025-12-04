"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/primitives/alert";
import { IconCheck, IconX } from "@tabler/icons-react";

interface AnimatedAlertProps {
  title: string;
  description: string;
  variant?: "default" | "destructive" | "success";
  isVisible: boolean;
  onClose?: () => void;
}

export const AnimatedAlert = ({
  title,
  description,
  variant = "default",
  isVisible,
}: AnimatedAlertProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-50 w-[calc(100%-2rem)] max-w-sm md:bottom-8"
        >
          <Alert
            className={`border-l-4 shadow-lg flex items-center ${
              variant === "success"
                ? "border-cyan-500 bg-neutral-900 text-white"
                : variant === "destructive"
                ? "border-red-500 bg-neutral-900 text-white"
                : "border-neutral-500 bg-neutral-900 text-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 rounded-full p-1 ${
                  variant === "success"
                    ? "bg-cyan-500/20 text-cyan-500"
                    : variant === "destructive"
                    ? "bg-red-500/20 text-red-500"
                    : "bg-neutral-500/20 text-neutral-500"
                }`}
              >
                {variant === "success" ? (
                  <IconCheck size={16} />
                ) : variant === "destructive" ? (
                  <IconX size={16} />
                ) : (
                  <IconCheck size={16} />
                )}
              </div>
              <div className="flex-1">
                <AlertTitle className="text-base font-semibold">
                  {title}
                </AlertTitle>
                <AlertDescription className="mt-1 text-sm text-neutral-400">
                  {description}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
