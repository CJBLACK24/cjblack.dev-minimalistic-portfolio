"use client";
import React from "react";
import {
  ProjectGrid,
  ProjectGridItem,
} from "@/components/ui/layout/project-grid";
import { SparklesCore } from "@/components/ui/backgrounds/sparkles";
import { projectsData } from "@/constants/projects-data";
import Image from "next/image";

import { AuthAvatar } from "@/components/projects/auth-avatar";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-24 md:py-32 px-4 md:px-8 w-full relative overflow-hidden"
    >
      {/* Sparkles Background Effect */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="projects-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={3}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            A small selection of{" "}
            <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              recent projects
            </span>
          </h2>
        </div>

        {/* Projects Grid - 2 columns using the new ProjectGrid */}
        <ProjectGrid className="md:grid-cols-2">
          {projectsData.map((project, index) => (
            <ProjectGridItem
              key={project.id}
              index={index}
              title={project.title}
              description={project.description}
              header={project.header}
              icon={project.icon}
              className={project.className}
              liveDemo={project.liveDemo}
              viewButton={project.viewButton}
              techStack={
                <div className="flex items-center -space-x-2">
                  {project.techStack.map((tech) => (
                    <div
                      key={tech.id}
                      className="relative w-9 h-9 md:w-10 md:h-10 rounded-full bg-neutral-900 border-2 border-neutral-800 flex items-center justify-center overflow-hidden z-0 hover:z-10 transition-transform duration-200 hover:scale-110"
                      title={tech.name}
                    >
                      <Image
                        src={tech.image || ""}
                        alt={tech.name}
                        width={24}
                        height={24}
                        className="object-contain w-3/5 h-3/5"
                      />
                    </div>
                  ))}
                </div>
              }
              customAction={
                project.id === "auth-system" ? <AuthAvatar /> : undefined
              }
            />
          ))}
        </ProjectGrid>
      </div>
    </section>
  );
}
