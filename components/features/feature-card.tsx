"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

import { FeatureCardProps } from "@/types";

export const Icon = ({ className, ...rest }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export const FeatureCard = ({
  title,
  icon,
  children,
  description,
}: FeatureCardProps) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
      data-state={hovered ? "hovered" : "closed"}
      className="border border-black/20 group/canvas-card flex items-center justify-center dark:border-white/20 max-w-sm w-full mx-auto p-4 relative h-120 cursor-pointer"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
            <div className="absolute inset-0 mask-[radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 w-full flex flex-col items-center justify-center text-center">
        <div
          className={cn(
            "group-hover/canvas-card:-translate-y-4 transition duration-200",
            hovered && "-translate-y-4"
          )}
        >
          {icon}
        </div>
        <h2
          className={cn(
            "dark:text-white text-xl text-black mt-4 font-bold transition duration-200",
            hovered
              ? "text-white -translate-y-2"
              : "group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2"
          )}
        >
          {title}
        </h2>
        <h2
          className={cn(
            "text-base dark:text-neutral-300 text-neutral-600 relative z-10 mt-2 font-normal transition duration-200",
            hovered
              ? "opacity-100 text-white -translate-y-2"
              : "opacity-0 group-hover/canvas-card:opacity-100 group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2"
          )}
          style={{ color: "#e4e4e7" }}
        >
          {description}
        </h2>
      </div>
    </div>
  );
};
