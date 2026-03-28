"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";

export const AnimatedTooltip = ({
  items,
  itemClassName,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image?: string;
    icon?: React.ReactNode;
  }[];
  itemClassName?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const halfWidth = rect.width / 2;
    const xPos = event.clientX - rect.left - halfWidth;
    x.set(xPos);
  };

  return (
    <>
      {items.map((item) => (
        <div
          className={cn("group relative", itemClassName)}
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-linear-to-r from-transparent via-cyan-300 to-transparent" />
                <div className="relative z-30 text-base font-bold text-white">
                  {item.name}
                </div>
                <div className="text-xs text-white">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <div
            onMouseMove={handleMouseMove}
            className={cn(
              "h-full w-full transition duration-500 group-hover:z-30",
            )}
          >
            {item.icon ? (
              <div className="flex h-full w-full items-center justify-center transition-all group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                {item.icon}
              </div>
            ) : (
              <Image
                height={100}
                width={100}
                src={item.image || ""}
                alt={item.name}
                style={{ height: "auto" }}
                className="relative m-0! w-full object-contain object-top p-0! transition duration-500 group-hover:z-30 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
};
