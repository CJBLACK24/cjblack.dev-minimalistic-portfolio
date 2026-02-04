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
          <h2 className="mb-2 text-4xl font-bold text-white md:text-5xl">
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
          className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-4 md:p-5"
        >
          <div className="mb-8 flex items-center gap-2">
            <IconBriefcase className="h-6 w-6 text-white" />
            <h3 className="text-xl font-semibold text-white">
              Professional Experience
            </h3>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-neutral-800">
              <Image
                src="/work exp/DOLE.png"
                alt="DOLE Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="flex w-full flex-col">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg leading-tight font-medium text-white md:text-xl">
                  DOLE VI
                </h3>
                <div className="text-sm whitespace-nowrap text-neutral-500 md:text-base">
                  Feb 2026—Present
                </div>
              </div>
              <div className="mt-1 flex flex-col gap-1">
                <p className="text-base text-neutral-400">
                  IT Internship / OJT
                </p>

                <a
                  href="https://www.facebook.com/p/DOLE-Western-Visayas-61557377919466/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-sm text-cyan-500 hover:text-cyan-400 hover:underline"
                >
                  View Official Facebook Page
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
