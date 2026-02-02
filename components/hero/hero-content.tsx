/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { motion, Variants, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  IconBulb,
  IconPalette,
  IconMessageCircle,
  IconCode,
  IconBrandGithub,
  IconArrowNarrowDown,
  IconDownload,
  IconEye,
  IconChevronDown,
} from "@tabler/icons-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BorderMagicButton } from "@/components/ui/buttons/border-magic-button";
import { HoverBorderGradient } from "@/components/ui/buttons/hover-border-gradient";
import { AnimatedTooltip } from "@/components/ui/misc/animated-hero-tooltip";
import { Tooltip } from "@/components/ui/cards/tooltip-card";
import { FlipWords } from "@/components/ui/text/flip-words";
import { HeroContentProps } from "@/types";

import React from "react";
import { HeroClock } from "./hero-clock";

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
    name: "TypeScript",
    designation: "Type Safety",
    image:
      "https://camo.githubusercontent.com/5c3873b6812ecfb1d2bc6ece8c2c548d53d151c2edbf6b0281207672ca3ab0a8/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f74732d69636f6e2e737667",
  },
  {
    id: 4,
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
  const containerRef = React.useRef<HTMLDivElement>(null);
  const gridLinesRef = React.useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [showCVOptions, setShowCVOptions] = useState(false);
  const cvDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cvDropdownRef.current &&
        !cvDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCVOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useGSAP(
    () => {
      if (!gridLinesRef.current) return;

      const lines = gridLinesRef.current.children;

      // Animate vertical lines (left and right)
      gsap.fromTo(
        [lines[0], lines[1]],
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1.8,
          ease: "expo.inOut",
          stagger: 0.3,
          delay: 0.2,
        },
      );

      // Animate horizontal lines (bottom and top)
      gsap.fromTo(
        [lines[2], lines[3]],
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.8,
          ease: "expo.inOut",
          stagger: 0.3,
          delay: 0.5,
        },
      );

      // Animate the cyan highlights (the inner glow divs)
      const highlights = gridLinesRef.current.querySelectorAll(
        ".bg-linear-to-b, .bg-linear-to-r",
      );
      gsap.fromTo(
        highlights,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          delay: 1.5,
          stagger: 0.4,
          ease: "power2.out",
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <motion.div
      className="relative flex flex-1 flex-col items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background/Grid Lines */}
      <div ref={gridLinesRef} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 -left-6 h-full w-px origin-top bg-black opacity-0 md:left-0">
          <div className="absolute top-0 h-100 w-px bg-linear-to-b from-transparent via-cyan-500 to-transparent" />
        </div>
        <div className="bg-black-500 absolute inset-y-0 -right-6 h-full w-px origin-bottom opacity-0 md:right-0">
          <div className="absolute h-100 w-px bg-linear-to-b from-transparent via-cyan-500 to-transparent" />
        </div>
        <div className="absolute -right-6 bottom-0 -left-6 h-px w-auto origin-left bg-black opacity-0 md:right-0 md:left-0">
          <div className="absolute inset-x-0 mx-auto h-px w-3/4 bg-linear-to-r from-transparent via-cyan-500 to-transparent md:w-40" />
        </div>
        <div className="absolute top-0 -right-6 -left-6 h-px w-auto origin-right bg-black opacity-0 md:right-0 md:left-0">
          <div className="absolute inset-x-0 mx-auto h-px w-3/4 bg-linear-to-r from-transparent via-cyan-500 to-transparent md:w-40" />
        </div>
      </div>
      <div className="mt-10 flex h-full w-full flex-col justify-center py-8 md:py-12">
        {/* Two Column Layout: Image Left, Content Right */}
        <div className="grid w-full grid-cols-1 items-center gap-12 px-6 sm:px-10 md:grid-cols-2 md:gap-16 md:px-16 lg:gap-8 lg:px-20">
          {/* Left Column - Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative h-[340px] w-full max-w-[280px] overflow-hidden rounded-2xl bg-neutral-900 sm:h-[400px] sm:max-w-[320px] md:h-[420px] md:max-w-[340px] lg:h-[520px] lg:max-w-[420px] xl:h-[580px] xl:max-w-[460px]">
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={
                  isImageLoaded ? { opacity: 1, filter: "blur(0px)" } : {}
                }
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full w-full"
              >
                <Image
                  src="/cj.png"
                  alt="Profile"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-2xl object-cover shadow-2xl"
                  priority
                  onLoad={() => setIsImageLoaded(true)}
                />
              </motion.div>
              {isImageLoaded && <HeroClock />}
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-500/20 border-t-cyan-500" />
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="flex flex-col items-start text-left">
            {/* Hover Border Gradient Badge */}
            <motion.div variants={itemVariants} className="mb-6 -ml-2 md:ml-0">
              <HoverBorderGradient
                containerClassName="rounded-full"
                className="flex items-center gap-2 text-xs font-medium sm:text-sm"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500"></span>
                </span>
                Available for Opportunities
              </HoverBorderGradient>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="relative z-10 mb-6 w-full bg-linear-to-b from-white to-neutral-500 bg-clip-text text-3xl leading-[1.1] font-bold tracking-tight text-transparent sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl"
            >
              <div className="flex flex-nowrap items-center justify-start gap-1.5 sm:gap-2">
                <span className="inline-block whitespace-nowrap text-white">
                  Shaping&nbsp;
                </span>

                <motion.div
                  key={currentWordIndex}
                  initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 rounded-lg border border-neutral-800 bg-neutral-900/50 p-1 text-cyan-400"
                >
                  {currentWordIndex === 0 && (
                    <IconBulb
                      className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9"
                      stroke={2}
                    />
                  )}
                  {currentWordIndex === 1 && (
                    <IconPalette
                      className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9"
                      stroke={2}
                    />
                  )}
                  {currentWordIndex === 2 && (
                    <IconMessageCircle
                      className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9"
                      stroke={2}
                    />
                  )}
                  {currentWordIndex === 3 && (
                    <IconCode
                      className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9"
                      stroke={2}
                    />
                  )}
                </motion.div>

                <div className="min-w-[70px] sm:min-w-[100px] md:min-w-[120px] lg:min-w-[160px] xl:min-w-[220px] 2xl:min-w-[280px]">
                  <FlipWords
                    words={["Ideas", "Plans", "Designs", "Code"]}
                    duration={2500}
                    className="m-0! p-0! font-bold whitespace-nowrap text-white"
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
                <span className="inline-block bg-linear-to-bl from-cyan-400 to-white bg-clip-text text-transparent">
                  Deliver Results
                </span>
              </div>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="relative z-10 mb-6 max-w-xl text-xl font-normal text-neutral-600 md:mb-8 dark:text-neutral-300"
            >
              I&apos;m{" "}
              <Tooltip
                content={
                  <div className="space-y-2">
                    <div className="border-b border-neutral-200 pb-2 dark:border-neutral-700">
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                        CJBLACK
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Based in Iloilo, Philippines
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Born: November 24, 2002
                      </p>
                    </div>
                  </div>
                }
                containerClassName="inline"
              >
                <span className="cursor-help font-semibold text-cyan-100 underline decoration-cyan-100/30 decoration-dashed underline-offset-4 transition-all hover:text-cyan-300 hover:decoration-cyan-300">
                  Christian John Calderon Duque
                </span>
              </Tooltip>
              , a{" "}
              <Tooltip
                content={
                  <div className="space-y-3">
                    <div className="border-b border-neutral-700 pb-2">
                      <h3 className="mb-1 text-base font-semibold text-white">
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
                            Role
                          </p>
                          <p className="text-sm text-white">IT Intern</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-neutral-300">
                            Graduation
                          </p>
                          <p className="text-sm text-white">Held at April</p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                containerClassName="inline"
              >
                <span className="cursor-help font-semibold text-cyan-100 underline decoration-cyan-100/30 decoration-dashed underline-offset-4 transition-all hover:text-cyan-300 hover:decoration-cyan-300">
                  IT Professional
                </span>
              </Tooltip>{" "}
              and Web & Mobile Fullstack Developer with a passion for code.
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mb-10 flex w-full flex-col items-start gap-6"
            >
              {/* Responsive Action Buttons */}
              <div className="w-full px-4 sm:px-0">
                <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* View Works Button */}
                  <a href="#projects" className="block w-full scroll-smooth">
                    <div className="group relative inline-flex h-12 w-full overflow-hidden rounded-lg p-px focus:outline-none">
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#22d3ee_0%,#083344_50%,#22d3ee_100%)]" />
                      <span className="group inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-black px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-all duration-300">
                        <span>View works</span>
                        <IconArrowNarrowDown className="h-4 w-4" />
                      </span>
                    </div>
                  </a>

                  {/* Curriculum Vitae / CV Options Button */}
                  <div className="relative block w-full" ref={cvDropdownRef}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowCVOptions(!showCVOptions)}
                      className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 text-sm font-bold text-black shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:bg-cyan-300"
                    >
                      <IconDownload className="h-4 w-4" />
                      <span>Curriculum Vitae</span>
                      <IconChevronDown
                        className={`h-4 w-4 transition-transform duration-500 ${showCVOptions ? "rotate-180" : ""}`}
                      />
                    </motion.div>

                    <AnimatePresence mode="wait">
                      {showCVOptions && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          className="absolute top-full left-0 z-100 mt-3 w-full min-w-[220px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 p-1.5 shadow-2xl backdrop-blur-xl will-change-transform"
                        >
                          <button
                            onClick={() => {
                              const link = document.createElement("a");
                              link.href = "/CV/cjblack_resume.pdf";
                              link.download = "cjblack_resume.pdf";
                              link.click();
                              setShowCVOptions(false);
                            }}
                            className="group flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm text-neutral-300 transition-all duration-300 hover:bg-white/5 hover:text-white"
                          >
                            <div className="rounded-lg border border-white/5 bg-white/5 p-2.5 transition-colors group-hover:border-cyan-500/30 group-hover:bg-cyan-500/20 group-hover:text-cyan-400">
                              <IconDownload size={20} />
                            </div>
                            <div className="flex flex-col items-start text-left">
                              <span className="text-sm font-bold text-white">
                                Download CV
                              </span>
                              <span className="text-[11px] text-neutral-400 group-hover:text-neutral-300">
                                PDF Document
                              </span>
                            </div>
                          </button>

                          <button
                            onClick={() => {
                              window.open("/CV/cjblack_resume.pdf", "_blank");
                              setShowCVOptions(false);
                            }}
                            className="group mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm text-neutral-300 transition-all duration-300 hover:bg-white/5 hover:text-white"
                          >
                            <div className="rounded-lg border border-white/5 bg-white/5 p-2.5 transition-colors group-hover:border-cyan-500/30 group-hover:bg-cyan-500/20 group-hover:text-cyan-400">
                              <IconEye size={20} />
                            </div>
                            <div className="flex flex-col items-start text-left">
                              <span className="text-sm font-bold text-white">
                                View CV
                              </span>
                              <span className="text-[11px] text-neutral-400 group-hover:text-neutral-300">
                                In-browser view
                              </span>
                            </div>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-start px-4 sm:px-0">
                <AnimatedTooltip items={techStack} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
