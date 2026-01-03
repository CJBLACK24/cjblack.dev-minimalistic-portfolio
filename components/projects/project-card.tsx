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
    <div className="flex flex-col h-full">
      {/* Category Badge */}
      <div className="mb-2">
        <span className="text-[10px] uppercase tracking-widest font-bold text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded-full">
          {item.category}
        </span>
      </div>

      {/* Project Image */}
      <div className="relative aspect-video mb-4 overflow-hidden rounded-lg bg-neutral-900 border border-neutral-800">
        <Image
          src={item.src}
          alt={item.title}
          fill
          className="object-cover group-hover/bento:scale-105 transition-transform duration-500"
        />
        {item.designLink && (
          <div className="absolute top-2 right-2 z-20">
            <LinkPreview url={item.designLink}>
              <div className="p-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:text-cyan-400 transition-colors">
                <IconBrandFigma className="w-4 h-4" />
              </div>
            </LinkPreview>
          </div>
        )}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover/bento:text-cyan-400 transition-colors">
        {item.title}
      </h3>
      <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
        {item.description}
      </p>

      {/* Features */}
      <div className="space-y-1.5 mb-4 flex-1">
        {item.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <IconCheck className="w-3.5 h-3.5 text-cyan-500 mt-0.5 shrink-0" />
            <span className="text-xs text-neutral-300">{feature}</span>
          </div>
        ))}
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-neutral-800">
        {item.techStack.map((tech, idx) => (
          <span
            key={idx}
            className="text-[10px] font-medium text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
