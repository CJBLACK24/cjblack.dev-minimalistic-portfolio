"use client";

import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import { ProjectProps } from "@/types";
import { useRef } from "react";

interface MinimalProjectCardProps {
  project: ProjectProps;
}

export const MinimalProjectCard = ({ project }: MinimalProjectCardProps) => {
  const isExternal = project.link?.startsWith("http");
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
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-neutral-800 bg-[#0a0a0a] p-5 transition-all duration-300 hover:border-neutral-500 md:p-6"
    >
      {/* Project Image with scale on hover */}
      <div className="relative mb-5 aspect-16/10 w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 transition-colors duration-300 dark:border-neutral-800/40 dark:bg-neutral-900">
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          {project.header}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex grow flex-col">
        <h3 className="mb-2 text-lg font-bold text-white transition-colors duration-300 group-hover:text-cyan-400 md:text-xl">
          {project.title}
        </h3>
        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-neutral-400 md:text-base">
          {project.description}
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto flex items-center justify-between border-t border-neutral-800 pt-4 transition-colors duration-300">
        {/* Tech Stack */}
        <div className="flex flex-wrap items-center gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <div
              key={tech.id}
              className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 transition-all duration-300 hover:z-10 hover:scale-110 hover:border-neutral-600"
              title={tech.name}
            >
              <Image
                src={tech.image || ""}
                alt={tech.name}
                width={18}
                height={18}
                className="object-contain invert"
              />
            </div>
          ))}
          {project.techStack.length > 4 && (
            <div className="rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 font-mono text-xs text-neutral-400 transition-colors duration-300">
              +{project.techStack.length - 4}
            </div>
          )}
        </div>

        {/* Action Link */}
        {project.link && (
          <Link
            href={project.link}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="flex items-center gap-1.5 text-sm font-semibold text-cyan-600 transition-all duration-300 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="hidden sm:inline">
              {project.id === "patch-up" ? "View Project" : "Live Site"}
            </span>
            <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </motion.article>
  );
};
