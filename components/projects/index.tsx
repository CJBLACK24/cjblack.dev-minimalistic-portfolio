"use client";

import React from "react";
import { projectsData } from "@/constants";
import { motion } from "motion/react";
import { MinimalProjectCard } from "./minimal-project-card";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="section-enhanced px-4 md:px-8 w-full relative"
    >
      {/* Subtle CSS gradient background - replaces heavy effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/30 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header - Cleaner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
            A small selection of{" "}
            <span className="text-cyan-600 dark:text-cyan-400">recent projects</span>
          </h2>
        </motion.div>

        {/* Projects Grid - Minimal Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {projectsData.map((project) => (
            <MinimalProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
