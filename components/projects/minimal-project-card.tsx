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
      className="group relative flex flex-col rounded-xl border p-5 md:p-6 h-full overflow-hidden transition-all duration-300 
        bg-[#0a0a0a] 
        border-neutral-800 
        hover:border-neutral-500"
    >
      {/* Project Image with scale on hover */}
      <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden mb-5 border transition-colors duration-300 bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800/40">
        <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          {project.header}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col grow relative z-10">
        <h3 className="font-bold text-lg md:text-xl mb-2 transition-colors duration-300 text-white group-hover:text-cyan-400">
          {project.title}
        </h3>
        <p className="text-sm md:text-base mb-5 line-clamp-2 leading-relaxed text-neutral-400">
          {project.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t mt-auto relative z-10 transition-colors duration-300 border-neutral-800">
        {/* Tech Stack */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {project.techStack.slice(0, 4).map((tech) => (
            <div
              key={tech.id}
              className="relative w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110 hover:z-10 
                bg-neutral-900 
                border border-neutral-800
                hover:border-neutral-600"
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
            <div className="px-2 py-1 rounded-md text-xs font-mono transition-colors duration-300 bg-neutral-900 border border-neutral-800 text-neutral-400">
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
            className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="hidden sm:inline">
              {project.id === "patch-up" ? "View Project" : "Live Site"}
            </span>
            <IconArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </motion.article>
  );
};
