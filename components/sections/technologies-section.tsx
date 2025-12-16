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
} from "@/constants";
import {
  IconServer,
  IconTools,
  IconDeviceMobile,
  IconTerminal2,
} from "@tabler/icons-react";
import { HoverBorderGradient } from "@/components/ui/buttons/hover-border-gradient";

export function TechnologiesSection() {
  const items = [
    {
      title: "Web/Mobile Development",
      description: (
        <span className="text-lg font-normal text-neutral-400">
          Building modern, interactive user interfaces and cross-platform mobile
          apps.
        </span>
      ),
      header: (
        <div className="flex flex-1 w-full h-full min-h-24 rounded-xl p-4 items-center justify-center">
          <div className="grid grid-cols-3 md:flex md:flex-wrap md:justify-center gap-4 md:gap-10">
            <AnimatedTooltip
              items={webMobileItems}
              itemClassName="w-16 h-16 mr-0 md:-mr-4"
            />
          </div>
        </div>
      ),
      className: "md:col-span-1 md:row-span-2",
      icon: <IconDeviceMobile className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Programming Languages",
      description: (
        <span className="text-lg font-normal text-neutral-400">
          Core languages for building robust and scalable applications.
        </span>
      ),
      header: (
        <div className="flex flex-1 w-full h-full min-h-24 rounded-xl p-4 items-center justify-center">
          <div className="grid grid-cols-3 md:flex md:flex-wrap md:justify-center gap-4 md:gap-10">
            <AnimatedTooltip
              items={programmingLanguageItems}
              itemClassName="w-16 h-16 mr-0 md:-mr-4"
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
        <span className="text-lg font-normal text-neutral-400">
          Server-side technologies, databases, and APIs for scalable, secure
          applications.
        </span>
      ),
      header: (
        <div className="flex flex-1 w-full h-full min-h-24 rounded-xl p-4 items-center justify-center">
          <div className="grid grid-cols-3 md:flex md:flex-wrap md:justify-center gap-4 md:gap-10">
            <AnimatedTooltip
              items={backendItems}
              itemClassName="w-16 h-16 mr-0 md:-mr-4"
            />
          </div>
        </div>
      ),
      className: "md:col-span-1",
      icon: <IconServer className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Tools",
      description: (
        <span className="text-lg font-normal text-neutral-400">
          Development tools, version control, deployment platforms, design, and
          real-time communication.
        </span>
      ),
      header: (
        <div className="flex flex-1 w-full h-full min-h-24 rounded-xl p-4 items-center justify-center">
          <div className="grid grid-cols-3 md:flex md:flex-wrap md:justify-center gap-4 md:gap-10">
            <AnimatedTooltip
              items={toolsItems}
              itemClassName="w-16 h-16 mr-0 md:-mr-4"
            />
          </div>
        </div>
      ),
      className: "md:col-span-2",
      icon: <IconTools className="h-4 w-4 text-neutral-500" />,
    },
  ];

  return (
    <div
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
        <div className="mt-8 mb-12 flex justify-center">
          <HoverBorderGradient
            containerClassName="rounded-full"
            className="text-sm font-medium"
          >
            Modern. Scalable. Dynamic.
          </HoverBorderGradient>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-neutral-800 dark:text-neutral-200">
          Technologies
        </h2>
        <BentoGrid className="max-w-full mx-auto md:auto-rows-[22rem] gap-8 md:gap-10">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}
