"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconX, IconBrandGithub, IconArrowUpRight } from "@tabler/icons-react";
import { ProjectProps } from "@/types";

interface ProjectDetailsModalProps {
  project: ProjectProps | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {
  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          key="project-details-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Scrollable overlay container */}
          <div
            className="fixed inset-0 z-50 overflow-y-auto"
            onClick={onClose}
          >
            <div className="flex min-h-full items-center justify-center p-4 md:p-6">
              {/* Modal Card */}
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl my-8"
              >
                {/* Close Button — pinned top-center above the card */}
                <button
                  onClick={onClose}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950/90 text-neutral-400 hover:text-white hover:border-neutral-600 transition-all duration-200 backdrop-blur-sm cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                  title="Close Details"
                >
                  <IconX className="h-4 w-4" />
                </button>

                {/* Card */}
                <div className="w-full overflow-hidden rounded-lg border border-neutral-850 bg-[#070707] shadow-[0_0_60px_rgba(0,0,0,0.9)]">
                  {/* Project Header Image */}
                  <div className="relative aspect-16/10 w-full overflow-hidden border-b border-neutral-900 bg-neutral-950">
                    <div className="h-full w-full select-none pointer-events-none">
                      {project.header}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white md:text-3xl mb-1">
                      {project.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-sm font-semibold text-purple-400 tracking-wide mb-5">
                      {project.subtitle || project.techStack.map((tech) => tech.name).join(" · ")}
                    </p>

                    {/* Long Description */}
                    <p className="text-sm md:text-base leading-relaxed text-neutral-300 mb-6 whitespace-pre-wrap">
                      {project.longDescription || project.description}
                    </p>

                    {/* Key Features */}
                    {project.features && project.features.length > 0 && (
                      <div className="mb-6 border-t border-neutral-900 pt-5">
                        <h3 className="text-base font-bold text-white mb-3">Key Features</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-neutral-400">
                          {project.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-purple-400 mt-1 select-none font-bold text-[10px]">•</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Links */}
                    {(project.github || project.link) && (
                      <div className="border-t border-neutral-900 pt-5">
                        <h3 className="text-xs font-bold text-neutral-500 mb-3 tracking-wider uppercase">
                          Links
                        </h3>
                        <div className="flex flex-wrap gap-6 items-center">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-base font-semibold"
                            >
                              <IconBrandGithub className="h-5 w-5" />
                              <span>Code</span>
                            </a>
                          )}
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-base font-semibold group/link"
                            >
                              <IconArrowUpRight className="h-5 w-5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                              <span>Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
