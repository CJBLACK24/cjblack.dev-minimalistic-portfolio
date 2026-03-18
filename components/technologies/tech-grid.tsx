"use client";

import { motion, Variants } from "motion/react";
import { BentoGrid, BentoGridItem } from "@/components/ui/layout/bento-grid";
import { AnimatedTooltip } from "@/components/ui/misc/animated-tooltip";
import {
  IconServer,
  IconTools,
  IconDeviceMobile,
  IconTerminal2,
  IconBrain,
} from "@tabler/icons-react";
import {
  backendItems,
  toolsItems,
  webMobileItems,
  programmingLanguageItems,
  currentlyLearningItems,
} from "@/constants";

export const TechGrid = () => {
  const items = [
    {
      title: "Web/Mobile Development",
      description: (
        <p className="mt-1" style={{ fontSize: "14px", lineHeight: 1.5 }}>
          Building interactive user interfaces and cross-platform mobile
          applications.
        </p>
      ),
      header: (
        <div className="flex h-full min-h-16 w-full flex-1 items-center justify-center rounded-xl p-1.5 sm:min-h-20 sm:p-3">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            <AnimatedTooltip
              items={webMobileItems}
              itemClassName="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
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
        <p className="mt-1" style={{ fontSize: "14px", lineHeight: 1.5 }}>
          Core languages for building robust, type-safe, and scalable applications.
        </p>
      ),
      header: (
        <div className="flex h-full min-h-16 w-full flex-1 items-center justify-center rounded-xl p-1.5 sm:min-h-20 sm:p-3">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            <AnimatedTooltip
              items={programmingLanguageItems}
              itemClassName="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
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
        <p className="mt-1" style={{ fontSize: "14px", lineHeight: 1.5 }}>
          Server-side technologies and databases for high-performance backend systems.
        </p>
      ),
      header: (
        <div className="flex h-full min-h-16 w-full flex-1 items-center justify-center rounded-xl p-1.5 sm:min-h-20 sm:p-3">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            <AnimatedTooltip
              items={backendItems}
              itemClassName="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
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
        <p className="mt-1" style={{ fontSize: "14px", lineHeight: 1.5 }}>
          Expanding my skillset with cloud infrastructure and advanced system architecture.
        </p>
      ),
      header: (
        <div className="flex h-full min-h-16 w-full flex-1 items-center justify-center rounded-xl p-1.5 sm:min-h-20 sm:p-3">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            <AnimatedTooltip
              items={currentlyLearningItems}
              itemClassName="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
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
        <p className="mt-1" style={{ fontSize: "14px", lineHeight: 1.5 }}>
          Essential tools for version control, deployment, design, and efficient development workflows.
        </p>
      ),
      header: (
        <div className="flex h-full min-h-16 w-full flex-1 items-center justify-center rounded-xl p-1.5 sm:min-h-20 sm:p-3">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            <AnimatedTooltip
              items={toolsItems}
              itemClassName="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            />
          </div>
        </div>
      ),
      className: "md:col-span-2",
      icon: <IconTools className="h-4 w-4 text-neutral-500" />,
    },
  ];

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
    <BentoGrid className="mx-auto max-w-full gap-4 md:auto-rows-[20rem] md:grid-cols-2 md:gap-6">
      {items.map((item, i) => (
        <motion.div key={i} variants={bentoVariants} className={item.className}>
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
  );
};
