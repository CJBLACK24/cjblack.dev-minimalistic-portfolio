"use client";

import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import { PinContainer } from "@/components/ui/3d-pin";
import { ProjectProps } from "@/types";

export const ProjectPinCard = ({ project }: { project: ProjectProps }) => {
  return (
    <div className="flex h-[380px] w-full items-center justify-center sm:h-[400px] md:h-[420px] lg:h-[440px]">
      <PinContainer
        title={project.link ? "Visit Project" : "View Details"}
        href={project.link || "#"}
      >
        <div className="flex h-[340px] w-[320px] flex-col p-4 tracking-tight text-slate-100/50 sm:h-[360px] sm:w-[380px] md:h-[380px] md:w-[440px] lg:h-[400px] lg:w-[480px] xl:w-[520px]">
          <h3 className="m-0! max-w-xs pb-2! text-lg font-bold text-slate-100 sm:text-xl">
            {project.title}
          </h3>
          <div className="m-0! p-0! text-base font-normal sm:text-lg md:text-xl">
            <span
              className="line-clamp-2"
              style={{ color: "rgb(194, 205, 231)" }}
            >
              {project.description}
            </span>
          </div>
          <div className="relative mt-4 flex w-full flex-1 overflow-hidden rounded-lg border border-white/10 bg-neutral-900">
            {/* Header Component */}
            <div className="absolute inset-0 h-full w-full">
              {project.header}
            </div>
          </div>

          {/* Tech Stack Footer */}
          <div className="mt-4 flex w-full flex-row items-center justify-between">
            <div className="flex items-center -space-x-1.5 sm:-space-x-2">
              {project.techStack.map((tech) => (
                <div
                  key={tech.id}
                  className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-neutral-800 bg-neutral-900 transition-transform hover:z-10 hover:scale-110 sm:h-10 sm:w-10"
                  title={tech.name}
                >
                  <Image
                    src={tech.image || ""}
                    alt={tech.name}
                    width={20}
                    height={20}
                    className="h-3/5 w-3/5 object-contain"
                  />
                </div>
              ))}
            </div>
            {/* View Button - Right Edge */}
            <div className="group/btn pointer-events-none ml-auto flex items-center gap-1">
              <span className="text-sm font-bold whitespace-nowrap text-cyan-400 group-hover/btn:underline sm:text-base">
                {project.id === "patch-up" ? "View Project" : "Check Live Site"}
              </span>
              <IconArrowUpRight className="h-3.5 w-3.5 text-cyan-400 opacity-70 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:opacity-100 sm:h-4 sm:w-4" />
            </div>
          </div>
        </div>
      </PinContainer>
    </div>
  );
};
