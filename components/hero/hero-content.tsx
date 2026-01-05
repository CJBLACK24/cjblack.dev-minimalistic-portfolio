/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { motion, Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  IconBulb,
  IconPalette,
  IconMessageCircle,
  IconCode,
  IconBrandGithub,
  IconArrowNarrowDown,
} from "@tabler/icons-react";
import { BorderMagicButton } from "@/components/ui/buttons/border-magic-button";
import { HoverBorderGradient } from "@/components/ui/buttons/hover-border-gradient";
import { AnimatedTooltip } from "@/components/ui/misc/animated-hero-tooltip";
import { Tooltip } from "@/components/ui/cards/tooltip-card";
import { FlipWords } from "@/components/ui/text/flip-words";
import { HeroContentProps } from "@/types";

const techStack = [
  {
    id: 1,
    name: "Next.js",
    designation: "React Framework",
    image: "/nextjs-logo.svg",
  },
  {
    id: 2,
    name: "React",
    designation: "UI Library",
    image:
      "https://camo.githubusercontent.com/afdf5a3b933086604f6acf89a8fa2a321aaa6d912919c573f87545587a59333f/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f72656163742d69636f6e2e737667",
  },
  {
    id: 3,
    name: "JavaScript",
    designation: "Language",
    image:
      "https://camo.githubusercontent.com/739ff4cc642d6d72a274d75aa0a16d85782c91011453641c1bcc47d872faf42d/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f6a732d69636f6e2e737667",
  },
  {
    id: 4,
    name: "TypeScript",
    designation: "Type Safety",
    image:
      "https://camo.githubusercontent.com/5c3873b6812ecfb1d2bc6ece8c2c548d53d151c2edbf6b0281207672ca3ab0a8/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f74732d69636f6e2e737667",
  },
  {
    id: 5,
    name: "Webpack",
    designation: "Bundler",
    image:
      "https://camo.githubusercontent.com/971dc0f889a81abf890b811ea97765459c01e50470aa92927fc63109867dc35e/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f7765627061636b2d69636f6e2e737667",
  },
];

export const HeroContent = ({
  containerVariants,
  imageVariants,
  itemVariants,
}: HeroContentProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background/Grid Lines */}
      <div className="absolute inset-y-0 -left-6 md:left-0 h-full w-px bg-neutral-800/50">
        <div className="absolute top-0 h-100 w-px bg-linear-to-b from-transparent via-cyan-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 -right-6 md:right-0 h-full w-px bg-neutral-800/50">
        <div className="absolute h-100 w-px bg-linear-to-b from-transparent via-cyan-500 to-transparent" />
      </div>
      <div className="absolute bottom-0 -left-6 -right-6 md:left-0 md:right-0 h-px w-auto bg-neutral-800/50">
        <div className="absolute inset-x-0 mx-auto h-px w-3/4 md:w-40 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
      </div>
      <div className="absolute top-0 -left-6 -right-6 md:left-0 md:right-0 h-px w-auto bg-neutral-800/50">
        <div className="absolute inset-x-0 mx-auto h-px w-3/4 md:w-40 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
      </div>

      <div className="py-8 md:py-12 w-full h-full flex flex-col justify-center">
        {/* Two Column Layout: Image Left, Content Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-8 items-center w-full px-6 sm:px-10 md:px-16 lg:px-20">
          {/* Left Column - Image */}
          <motion.div
            variants={imageVariants}
            className="flex justify-center md:justify-end"
          >
            <div className="relative w-full max-w-[280px] h-[340px] sm:max-w-[320px] sm:h-[400px] md:max-w-[340px] md:h-[420px] lg:max-w-[420px] lg:h-[520px] xl:max-w-[460px] xl:h-[580px]">
              <Image
                src="/cj.png"
                alt="Profile"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-2xl object-cover shadow-2xl"
                priority
              />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <div className="flex flex-col items-start text-left">
            {/* Hover Border Gradient Badge */}
            <motion.div variants={itemVariants} className="mb-6 -ml-2 md:ml-0">
              <HoverBorderGradient
                containerClassName="rounded-full"
                className="text-xs sm:text-sm font-medium flex items-center gap-2"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                </span>
                Available for Opportunities
              </HoverBorderGradient>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="relative z-10 w-full text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-[1.1]"
            >
              <div className="flex flex-nowrap items-center justify-start gap-1.5 sm:gap-2">
                <span className="inline-block text-white whitespace-nowrap">
                  Shaping&nbsp;
                </span>

                <motion.div
                  key={currentWordIndex}
                  initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-1 rounded-lg bg-neutral-900/50 border border-neutral-800 text-cyan-400 shrink-0"
                >
                  {currentWordIndex === 0 && (
                    <IconBulb
                      className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9"
                      stroke={2}
                    />
                  )}
                  {currentWordIndex === 1 && (
                    <IconPalette
                      className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9"
                      stroke={2}
                    />
                  )}
                  {currentWordIndex === 2 && (
                    <IconMessageCircle
                      className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9"
                      stroke={2}
                    />
                  )}
                  {currentWordIndex === 3 && (
                    <IconCode
                      className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9"
                      stroke={2}
                    />
                  )}
                </motion.div>

                <div className="min-w-[70px] sm:min-w-[100px] md:min-w-[120px] lg:min-w-[160px] xl:min-w-[220px] 2xl:min-w-[280px]">
                  <FlipWords
                    words={["Ideas", "Plans", "Designs", "Code"]}
                    duration={2500}
                    className="text-white font-bold m-0! p-0! whitespace-nowrap"
                    onWordChange={setCurrentWordIndex}
                  />
                </div>
              </div>

              <div className="block whitespace-nowrap">
                <span className="inline-block text-white">
                  into Real Projects
                </span>
              </div>

              <div className="block whitespace-nowrap">
                <span className="text-white">that </span>
                <span className="inline-block text-transparent bg-clip-text bg-linear-to-bl from-cyan-400 to-white">
                  Deliver Results
                </span>
              </div>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="relative z-10 max-w-xl text-xl font-normal mb-6 md:mb-8"
              style={{ color: "rgb(194, 205, 231)" }}
            >
              I&apos;m{" "}
              <Tooltip
                content={
                  <div className="space-y-2">
                    <div className="border-b border-neutral-700 pb-2">
                      <p className="text-sm font-semibold text-white">
                        Christian John Calderon Duque
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-neutral-400">
                        Based in Iloilo, Philippines
                      </p>
                      <p className="text-xs text-neutral-400">
                        Born: November 24, 2002
                      </p>
                    </div>
                  </div>
                }
                containerClassName="inline"
              >
                <span className="text-cyan-100 hover:text-cyan-300 cursor-help transition-colors">
                  CJ
                </span>
              </Tooltip>
              , a{" "}
              <Tooltip
                content={
                  <div className="space-y-3">
                    <div className="border-b border-neutral-700 pb-2">
                      <h3 className="text-base font-semibold text-white mb-1">
                        Western Institute of Technology
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Iloilo City, Philippines
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium text-neutral-300">
                          Degree Program
                        </p>
                        <p className="text-sm text-white">
                          Bachelor of Science in Information Technology (BSIT)
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs font-medium text-neutral-300">
                            Started
                          </p>
                          <p className="text-sm text-white">2022</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-neutral-300">
                            Expected Graduation
                          </p>
                          <p className="text-sm text-white">April 2026</p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                containerClassName="inline"
              >
                <span className="text-cyan-100 hover:text-cyan-300 cursor-help transition-colors">
                  student
                </span>
              </Tooltip>{" "}
              and developer with a passion for code.
            </motion.div>

            {/* View Works Button and Tech Stack */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-start gap-6 mb-10 w-full"
            >
              <div className="w-full sm:w-[90%] md:w-auto px-4 sm:px-0">
                <a href="#projects" className="scroll-smooth block w-full">
                  <div className="relative inline-flex h-12 overflow-hidden rounded-md p-px focus:outline-none w-full md:w-60">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#22d3ee_0%,#083344_50%,#22d3ee_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl gap-2 group hover:bg-slate-900 transition-colors">
                      <span>View works</span>
                      <motion.div
                        whileHover={{ y: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <IconArrowNarrowDown className="w-5 h-5" />
                      </motion.div>
                    </span>
                  </div>
                </a>
              </div>

              <div className="flex items-center justify-start mt-4">
                <AnimatedTooltip items={techStack} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
