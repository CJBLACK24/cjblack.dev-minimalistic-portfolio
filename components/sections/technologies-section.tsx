"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/components/ui/layout/bento-grid";
import { AnimatedTooltip } from "@/components/ui/misc/animated-tooltip";
import {
  backendItems,
  toolsItems,
  webMobileItems,
  programmingLanguageItems,
  currentlyLearningItems,
} from "@/constants";
import {
  IconServer,
  IconTools,
  IconDeviceMobile,
  IconTerminal2,
  IconBrain,
} from "@tabler/icons-react";
import { HoverBorderGradient } from "@/components/ui/buttons/hover-border-gradient";
import { motion, Variants } from "motion/react";

export function TechnologiesSection() {
  const items = [
    {
      title: "Web/Mobile Development",
      description: (
        <span
          className="text-base sm:text-lg md:text-xl font-normal"
          style={{ color: "rgb(194, 205, 231)" }}
        >
          Building modern, interactive user interfaces and cross-platform mobile
          apps.
        </span>
      ),
      header: (
        <div className="flex flex-1 w-full h-full min-h-20 sm:min-h-24 rounded-xl p-2 sm:p-4 items-center justify-center">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            <AnimatedTooltip
              items={webMobileItems}
              itemClassName="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
            />
          </div>
        </div>
      ),
      className: "md:col-span-1",
      icon: <IconDeviceMobile className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Programming Languages",
      description: (
        <span
          className="text-base sm:text-lg md:text-xl font-normal"
          style={{ color: "rgb(194, 205, 231)" }}
        >
          Core languages for building robust and scalable applications.
        </span>
      ),
      header: (
        <div className="flex flex-1 w-full h-full min-h-20 sm:min-h-24 rounded-xl p-2 sm:p-4 items-center justify-center">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            <AnimatedTooltip
              items={programmingLanguageItems}
              itemClassName="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
            />
          </div>
        </div>
      ),
      className: "md:col-span-1",
      icon: <IconTerminal2 className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Backend",
      description: (
        <span
          className="text-base sm:text-lg md:text-xl font-normal"
          style={{ color: "rgb(194, 205, 231)" }}
        >
          Server-side technologies, databases, and APIs for scalable, secure
          applications.
        </span>
      ),
      header: (
        <div className="flex flex-1 w-full h-full min-h-20 sm:min-h-24 rounded-xl p-2 sm:p-4 items-center justify-center">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            <AnimatedTooltip
              items={backendItems}
              itemClassName="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
            />
          </div>
        </div>
      ),
      className: "md:col-span-1",
      icon: <IconServer className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Currently Learning",
      description: (
        <span
          className="text-base sm:text-lg md:text-xl font-normal"
          style={{ color: "rgb(194, 205, 231)" }}
        >
          Expanding my skillset with cloud computing, containerization, and
          system programming.
        </span>
      ),
      header: (
        <div className="flex flex-1 w-full h-full min-h-20 sm:min-h-24 rounded-xl p-2 sm:p-4 items-center justify-center">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            <AnimatedTooltip
              items={currentlyLearningItems}
              itemClassName="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20"
            />
          </div>
        </div>
      ),
      className: "md:col-span-1",
      icon: <IconBrain className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Tools",
      description: (
        <span
          className="text-base sm:text-lg md:text-xl font-normal"
          style={{ color: "rgb(194, 205, 231)" }}
        >
          Development tools, version control, deployment platforms, design, and
          real-time communication.
        </span>
      ),
      header: (
        <div className="flex flex-1 w-full h-full min-h-20 sm:min-h-24 rounded-xl p-2 sm:p-4 items-center justify-center">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            <AnimatedTooltip
              items={toolsItems}
              itemClassName="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
            />
          </div>
        </div>
      ),
      className: "md:col-span-2",
      icon: <IconTools className="h-4 w-4 text-neutral-500" />,
    },
  ];

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

  const bentoVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="relative flex min-h-200 w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-black py-20"
      id="technologies"
    >
      <div
        className={cn(
          "absolute inset-0",
          "bg-size-[40px_40px]",
          "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      <div className="relative z-20 w-full max-w-6xl md:max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-20 pt-10">
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
          className="text-3xl md:text-5xl font-bold text-center mb-16 text-neutral-800 dark:text-neutral-200"
        >
          Technologies
        </motion.h2>
        <BentoGrid className="max-w-full mx-auto md:grid-cols-2 md:auto-rows-[26rem] gap-6 md:gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={bentoVariants}
              className={item.className}
            >
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={item.header}
                className="h-full"
                icon={item.icon}
              />
            </motion.div>
          ))}
        </BentoGrid>
      </div>
    </motion.div>
  );
}
