"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { HoverBorderGradient } from "@/components/ui/buttons/hover-border-gradient";
import { motion, Variants } from "motion/react";
import { TechGrid } from "./tech-grid";

export function TechnologiesSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="technologies"
      className="relative flex min-h-200 w-full flex-col items-center justify-center overflow-hidden bg-white py-20 dark:bg-black"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="h-full w-full"
      >
        <div
          className={cn(
            "absolute inset-0",
            "bg-size-[40px_40px]",
            "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

        <div className="relative z-20 mx-auto w-full max-w-6xl px-6 pt-10 pb-20 md:max-w-7xl md:px-12 lg:px-16">
          {/* Hover Border Gradient Badge */}
          <motion.div
            variants={itemVariants}
            className="mt-8 mb-12 flex justify-center"
          >
            <HoverBorderGradient
              containerClassName="rounded-full"
              className="text-sm font-medium"
            >
              Modern. Scalable. Dynamic.
            </HoverBorderGradient>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mb-16 text-center text-3xl font-bold text-neutral-800 md:text-5xl dark:text-neutral-200"
          >
            Technologies
          </motion.h2>

          <TechGrid />
        </div>
      </motion.div>
    </section>
  );
}
