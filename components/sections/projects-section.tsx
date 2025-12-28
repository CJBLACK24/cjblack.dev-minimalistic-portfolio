"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import { SparklesCore } from "@/components/ui/backgrounds/sparkles";
import { projectsData } from "@/constants";
import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import { motion, Variants } from "motion/react";

export function ProjectsSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="projects"
      className="py-24 md:py-32 px-2 md:px-8 w-full relative overflow-hidden"
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
      <div className="w-full max-w-full mx-auto relative z-10 px-4 md:px-6 lg:px-8">
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="h-[380px] sm:h-[400px] md:h-[420px] lg:h-[440px] flex items-center justify-center w-full"
            >
              <PinContainer
                title={project.link ? "Visit Project" : "View Details"}
                href={project.link || "#"}
              >
                <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[320px] sm:w-[380px] md:w-[440px] lg:w-[480px] xl:w-[520px] h-[340px] sm:h-[360px] md:h-[380px] lg:h-[400px]">
                  <h3 className="max-w-xs pb-2! m-0! font-bold text-lg sm:text-xl text-slate-100">
                    {project.title}
                  </h3>
                  <div className="text-base sm:text-lg md:text-xl m-0! p-0! font-normal">
                    <span
                      className="line-clamp-2"
                      style={{ color: "rgb(194, 205, 231)" }}
                    >
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
                  <div className="flex flex-row items-center justify-between mt-4 w-full">
                    <div className="flex items-center -space-x-1.5 sm:-space-x-2">
                      {project.techStack.map((tech) => (
                        <div
                          key={tech.id}
                          className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden hover:z-10 hover:scale-110 transition-transform"
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
                    {/* View Button - Right Edge */}
                    <div className="flex items-center gap-1 group/btn ml-auto">
                      <span className="text-cyan-400 text-sm sm:text-base font-bold group-hover/btn:underline whitespace-nowrap">
                        {project.id === "patch-up"
                          ? "View Project"
                          : "Check Live Site"}
                      </span>
                      <IconArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-400 opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </PinContainer>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
