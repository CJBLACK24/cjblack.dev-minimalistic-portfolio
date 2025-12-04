"use client";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/layout/bento-grid";
import { SparklesCore } from "@/components/ui/backgrounds/sparkles";
import { AnimatedTooltip } from "@/components/ui/misc/animated-tooltip";
import { projectsData } from "@/constants/projects-data";

import { AuthAvatar } from "@/components/projects/auth-avatar";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 md:px-8 w-full relative">
      {/* Sparkles Background Effect */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="projects-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={4}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-neutral-800 dark:text-neutral-200">
          Featured{" "}
          <span className="bg-linear-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <BentoGrid className="md:grid-rows-2 md:auto-rows-[20rem]">
          {projectsData.map((project) => (
            <BentoGridItem
              key={project.id}
              title={project.title}
              description={
                <div className="flex flex-col gap-4">
                  <span className="text-lg text-neutral-500 dark:text-neutral-400">
                    {project.description}
                  </span>
                </div>
              }
              header={project.header}
              icon={project.icon}
              className={project.className}
              liveDemo={project.liveDemo}
              viewButton={project.viewButton}
              techStack={
                <div className="grid grid-cols-[repeat(auto-fit,minmax(24px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(28px,1fr))] gap-1 md:gap-2 lg:gap-5 w-full max-w-[200px] md:max-w-none md:w-auto md:flex md:items-center">
                  <AnimatedTooltip
                    items={project.techStack}
                    itemClassName="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                  />
                </div>
              }
              customAction={
                project.id === "auth-system" ? <AuthAvatar /> : undefined
              }
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
