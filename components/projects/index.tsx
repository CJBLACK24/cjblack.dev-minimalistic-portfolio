"use client";

import React from "react";
import { projectsData } from "@/constants";
import { motion } from "motion/react";
import { MinimalProjectCard } from "./minimal-project-card";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="section-enhanced relative w-full px-4 md:px-8"
    >
      {/* Subtle CSS gradient background - replaces heavy effects */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-neutral-950/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header - Cleaner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center md:mb-16"
        >
          <h2 className="section-heading">
            A small selection of{" "}
            <span className="text-cyan-600 dark:text-cyan-400">
              recent projects
            </span>
          </h2>
        </motion.div>

        {/* Projects Grid - Minimal Cards */}
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          {projectsData.map((project) => (
            <MinimalProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
