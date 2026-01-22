"use client";

import { useState, useEffect } from "react";
import { IconClock } from "@tabler/icons-react";
import { motion } from "motion/react";

export const HeroClock = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [userTimezone] = useState<string>(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleString("en-US", {
        hour: "2-digit",
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
      className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/90"
    >
      <IconClock className="w-3.5 h-3.5" />
      <div className="flex items-baseline gap-1.5">
        <span className="text-xs sm:text-sm font-mono font-medium tabular-nums">
          {currentTime || "00:00:00 AM"}
        </span>
        <span className="text-[10px] text-white/50 font-medium">
          ({userTimezone.split("/")[1]?.replace("_", " ") || userTimezone})
        </span>
      </div>
    </motion.div>
  );
};
