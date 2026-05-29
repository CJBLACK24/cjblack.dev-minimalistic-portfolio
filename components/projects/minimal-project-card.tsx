"use client";

import Image from "next/image";
import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import { motion } from "motion/react";
import { ProjectProps } from "@/types";
import { useRef } from "react";

interface MinimalProjectCardProps {
  project: ProjectProps;
  onDetailsClick: () => void;
}

export const MinimalProjectCard = ({ project, onDetailsClick }: MinimalProjectCardProps) => {
  const cardRef = useRef<HTMLElement>(null);

  // Interactive mouse tracking for glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mouse-x", `${x}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-neutral-850 bg-[#070707] p-5 transition-all duration-300 hover:border-neutral-700 md:p-6"
    >
      {/* Project Image with scale on hover */}
      <div className="relative mb-5 aspect-16/10 w-full overflow-hidden rounded-none border border-neutral-800/40 bg-neutral-900 transition-colors duration-300 dark:border-neutral-900 dark:bg-neutral-950">
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]">
          {project.header}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex grow flex-col">
        {/* Title and Icons inline, connected by a thin line */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-cyan-400 md:text-xl shrink-0">
            {project.title}
          </h3>
          <div className="mx-4 grow border-b border-dashed border-neutral-800/60 group-hover:border-neutral-700/50 transition-colors duration-300" />
          <div className="flex items-center gap-3 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
                title="View Source Code"
              >
                <IconBrandGithub className="h-[21px] w-[21px]" />
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
                title="View Live Site"
              >
                <IconArrowUpRight className="h-[21px] w-[21px]" />
              </a>
            )}
          </div>
        </div>

        {/* Tech Stack Subtitle */}
        <p className="mb-3.5 text-xs font-semibold text-purple-400/90 dark:text-purple-400 tracking-wide">
          {project.subtitle || project.techStack.map((tech) => tech.name).join(" · ")}
        </p>

        {/* Description */}
        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-neutral-400 md:text-base">
          {project.description}
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto flex items-center justify-between border-t border-neutral-800/80 pt-4 transition-colors duration-300">
        {/* Details Link */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDetailsClick();
          }}
          className="flex items-center gap-1 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-300 cursor-pointer"
        >
          <span>Details</span>
          <span className="font-mono text-xs">&gt;</span>
        </button>

        {/* Tech Stack Icons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <div
              key={tech.id}
              className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-none border border-neutral-850 bg-neutral-900 transition-all duration-300 hover:z-10 hover:scale-110 hover:border-neutral-600"
              title={tech.name}
            >
              {tech.image && (
                <Image
                  src={tech.image}
                  alt={tech.name}
                  width={18}
                  height={18}
                  className="object-contain invert"
                />
              )}
            </div>
          ))}
          {project.techStack.length > 4 && (
            <div className="rounded-none border border-neutral-850 bg-neutral-900 px-2 py-1 font-mono text-xs text-neutral-400 transition-colors duration-300">
              +{project.techStack.length - 4}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};
