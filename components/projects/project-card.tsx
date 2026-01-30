"use client";

import React from "react";
import Image from "next/image";
import { IconBrandFigma, IconCheck } from "@tabler/icons-react";
import { LinkPreview } from "@/components/ui/media/link-preview";

interface ProjectItem {
  category: string;
  title: string;
  src: string;
  description: string;
  features: string[];
  techStack: string[];
  designLink?: string;
}

export const ProjectCard = ({ item }: { item: ProjectItem }) => {
  return (
    <div className="flex h-full flex-col">
      {/* Category Badge */}
      <div className="mb-2">
        <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-bold tracking-widest text-cyan-500 uppercase">
          {item.category}
        </span>
      </div>

      {/* Project Image */}
      <div className="relative mb-4 aspect-video overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
        <Image
          src={item.src}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover/bento:scale-105"
        />
        {item.designLink && (
          <div className="absolute top-2 right-2 z-20">
            <LinkPreview url={item.designLink}>
              <div className="rounded-full border border-white/10 bg-black/50 p-1.5 text-white backdrop-blur-md transition-colors hover:text-cyan-400">
                <IconBrandFigma className="h-4 w-4" />
              </div>
            </LinkPreview>
          </div>
        )}
      </div>

      {/* Content */}
      <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover/bento:text-cyan-400">
        {item.title}
      </h3>
      <p className="mb-4 line-clamp-2 text-sm text-neutral-400">
        {item.description}
      </p>

      {/* Features */}
      <div className="mb-4 flex-1 space-y-1.5">
        {item.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-500" />
            <span className="text-xs text-neutral-300">{feature}</span>
          </div>
        ))}
      </div>

      {/* Tech Stack */}
      <div className="mt-auto flex flex-wrap gap-1.5 border-t border-neutral-800 pt-4">
        {item.techStack.map((tech, idx) => (
          <span
            key={idx}
            className="rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-[10px] font-medium text-neutral-400"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
