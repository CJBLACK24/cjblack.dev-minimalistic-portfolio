"use client";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/layout/bento-grid";
import { gridItems } from "@/constants";

export function BentoGridSecondDemo() {
  return (
    <BentoGrid className="max-w-full mx-auto md:auto-rows-[20rem]">
      {gridItems.map((item, i) => (
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
  );
}
