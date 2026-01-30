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
        <span
          className="text-base font-normal sm:text-lg md:text-xl"
          style={{ color: "rgb(194, 205, 231)" }}
        >
          Building modern, interactive user interfaces and cross-platform mobile
          apps.
        </span>
      ),
      header: (
        <div className="flex h-full min-h-20 w-full flex-1 items-center justify-center rounded-xl p-2 sm:min-h-24 sm:p-4">
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
          className="text-base font-normal sm:text-lg md:text-xl"
          style={{ color: "rgb(194, 205, 231)" }}
        >
          Core languages for building robust and scalable applications.
        </span>
      ),
      header: (
        <div className="flex h-full min-h-20 w-full flex-1 items-center justify-center rounded-xl p-2 sm:min-h-24 sm:p-4">
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
          className="text-base font-normal sm:text-lg md:text-xl"
          style={{ color: "rgb(194, 205, 231)" }}
        >
          Server-side technologies, databases, and APIs for scalable, secure
          applications.
        </span>
      ),
      header: (
        <div className="flex h-full min-h-20 w-full flex-1 items-center justify-center rounded-xl p-2 sm:min-h-24 sm:p-4">
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
          className="text-base font-normal sm:text-lg md:text-xl"
          style={{ color: "rgb(194, 205, 231)" }}
        >
          Expanding my skillset with cloud computing, containerization, and
          system programming.
        </span>
      ),
      header: (
        <div className="flex h-full min-h-20 w-full flex-1 items-center justify-center rounded-xl p-2 sm:min-h-24 sm:p-4">
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
          className="text-base font-normal sm:text-lg md:text-xl"
          style={{ color: "rgb(194, 205, 231)" }}
        >
          Development tools, version control, deployment platforms, design, and
          real-time communication.
        </span>
      ),
      header: (
        <div className="flex h-full min-h-20 w-full flex-1 items-center justify-center rounded-xl p-2 sm:min-h-24 sm:p-4">
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
    <BentoGrid className="mx-auto max-w-full gap-6 md:auto-rows-[26rem] md:grid-cols-2 md:gap-8">
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
