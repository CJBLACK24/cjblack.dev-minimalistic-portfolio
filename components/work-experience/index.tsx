"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { IconBriefcase } from "@tabler/icons-react";

export function WorkExperienceSection() {
  return (
    <section id="work-experience" className="w-full bg-black py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="section-heading mb-2">
            Work Experience
          </h2>
          <p className="text-lg text-neutral-400">
            Professional roles and internships.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="group relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/30 p-5 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/50 md:p-6"
        >
          <a
            href="https://www.facebook.com/p/DOLE-Western-Visayas-61557377919466/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10"
          >
            <span className="sr-only">View DOLE Western Visayas Facebook Page</span>
          </a>

          <div className="mb-6 flex items-center gap-2">
            <IconBriefcase className="h-4 w-4 text-neutral-400" />
            <h3 className="text-sm font-medium tracking-wide text-neutral-400 uppercase">
              Professional Experience
            </h3>
          </div>

          <div className="flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-neutral-800 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/work exp/DOLE.png"
                alt="DOLE Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="flex w-full flex-col">
              <div className="flex flex-col items-start justify-between gap-1 sm:flex-row sm:items-center">
                <h3 className="text-lg leading-tight font-semibold text-white md:text-xl">
                  {/* Mobile: short name */}
                  <span className="md:hidden">DOLE VI</span>
                  {/* Desktop: full name */}
                  <span className="hidden md:inline">
                    Department of Labor and Employment Region 6
                  </span>
                </h3>
                <div className="text-[10px] font-medium tracking-tight text-neutral-500 uppercase sm:text-xs">
                  Feb 2026 — Present
                </div>
              </div>
              <div className="mt-2 flex flex-col gap-1">
                <p className="text-sm leading-relaxed text-neutral-400">
                  Intern | IMSD - ICT Unit
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
