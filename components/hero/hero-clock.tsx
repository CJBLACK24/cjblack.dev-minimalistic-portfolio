"use client";

import { useState, useEffect } from "react";
import { IconClock } from "@tabler/icons-react";
import { motion } from "motion/react";

export const HeroClock = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-white/90 backdrop-blur-md"
    >
      <IconClock className="h-3.5 w-3.5" />
      <div className="flex items-baseline gap-1.5">
        <span className="font-mono text-xs font-medium tabular-nums sm:text-sm">
          {currentTime || "Loading..."}
        </span>
      </div>
    </motion.div>
  );
};
