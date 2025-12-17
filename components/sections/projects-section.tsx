"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import { SparklesCore } from "@/components/ui/backgrounds/sparkles";
import { projectsData } from "@/constants";
import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";

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
      <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
            A small selection of{" "}
            <span className="bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              recent projects
            </span>
          </h2>
        </div>

        {/* Projects Grid with 3D Pin Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-15">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="h-100 md:h-140 flex items-center justify-center w-full"
            >
              <PinContainer
                title={project.link ? "Visit Project" : "View Details"}
                href={project.link || "#"}
              >
                <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] sm:w-104 md:w-120 lg:w-140 h-100 md:h-140">
                  <h3 className="max-w-xs pb-2! m-0! font-bold  text-xl text-slate-100">
                    {project.title}
                  </h3>
                  <div className="text-base m-0! p-0! font-normal">
                    <span className="text-slate-500 line-clamp-2">
                      {project.description}
                    </span>
                  </div>
                  <div className="flex flex-1 w-full rounded-lg mt-4 overflow-hidden relative border border-white/10 bg-neutral-900">
                    {/* Header Component */}
                    <div className="absolute inset-0 w-full h-full">
                      {project.header}
                    </div>
                  </div>

                  {/* Tech Stack Footer */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4 gap-4 md:gap-0">
                    <div className="flex items-center -space-x-2">
                      {project.techStack.map((tech) => (
                        <div
                          key={tech.id}
                          className="relative w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden hover:z-10 hover:scale-110 transition-transform"
                          title={tech.name}
                        >
                          <Image
                            src={tech.image || ""}
                            alt={tech.name}
                            width={20}
                            height={20}
                            className="object-contain w-3/5 h-3/5"
                          />
                        </div>
                      ))}
                    </div>
                    {/* View Button Text matches Pin Title logic generally, but simple text here */}
                    {/* View Button Text matches Pin Title logic generally, but simple text here */}
                    <div className="flex items-center gap-1 group/btn">
                      <span className="text-cyan-400 text-base font-bold group-hover/btn:underline">
                        {project.id === "patch-up"
                          ? "View Project"
                          : "Check Live Site"}
                      </span>
                      <IconArrowUpRight className="h-4 w-4 text-cyan-400 opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </PinContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
