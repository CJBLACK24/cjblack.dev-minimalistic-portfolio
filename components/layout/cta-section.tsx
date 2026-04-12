"use client";

import React from "react";
import { motion } from "motion/react";
import {
  IconArrowRight,
  IconStack2,
  IconShieldCheck,
  IconRocket,
  IconBolt,
  IconCode,
  IconCircleCheck,
} from "@tabler/icons-react";
import { Terminal } from "@/components/ui/terminal";

const capabilities = [
  { label: "End-to-End", icon: IconStack2 },
  { label: "Scalable", icon: IconRocket },
  { label: "Secure", icon: IconShieldCheck },
  { label: "Performant", icon: IconBolt },
  { label: "Modern Stack", icon: IconCode },
  { label: "Production-Ready", icon: IconCircleCheck },
] as const;

export function PreFooterCTA() {
  return (
    <section className="relative w-full overflow-hidden border-t border-neutral-800 bg-black py-24 md:py-32">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(6,182,212,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(47,164,255,0.05),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-16"
        >
          {/* Left — Text + Visualization + Buttons */}
          <div className="flex w-full flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
            <h2 className="section-heading mb-4">
              Let&apos;s Build Something{" "}
              <span className="text-gradient-cyan">Exceptional</span>
            </h2>

            <p className="mx-auto mb-8 max-w-lg text-lg leading-relaxed text-neutral-400 md:text-xl lg:mx-0">
              Fullstack developer with end-to-end systems thinking and an
              entrepreneurial mindset. From architecture to deployment — I ship
              products that scale, perform, and convert.
            </p>

            {/* Capability pills — minimalistic visualization */}
            <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 lg:justify-start">
              {capabilities.map(({ label, icon: Icon }, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: 0.15 + i * 0.07,
                    ease: "easeOut",
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 px-3.5 py-1.5 text-xs font-medium text-neutral-300 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-500/30 hover:text-white sm:text-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-cyan-500" />
                  {label}
                </motion.span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex w-full flex-row items-center justify-center gap-2 sm:gap-4 lg:justify-start">
              <a
                href="#contact"
                className="group relative inline-flex h-12 flex-1 items-center justify-center overflow-hidden rounded-none bg-white px-2 text-xs font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-neutral-200 sm:flex-initial sm:px-8 sm:text-base min-[400px]:px-4 min-[400px]:text-sm whitespace-nowrap"
              >
                <span className="mr-1 min-[400px]:mr-2">Start a Project</span>
                <IconArrowRight className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-1 min-[400px]:h-4 min-[400px]:w-4" />
                <div className="absolute inset-0 -z-10 bg-linear-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
              </a>

              <a
                href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCKCHVHpbGPWxtXhphfXPzBbnGgNNDdntPzHZjjJbWsZNbnBzKLfXmvJWBPcGfFVZqxkHnvB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 flex-1 items-center justify-center rounded-none border border-neutral-800 bg-black px-2 text-xs font-medium text-white transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900 sm:flex-initial sm:px-8 sm:text-base min-[400px]:px-4 min-[400px]:text-sm whitespace-nowrap"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Right — Terminal Demo */}
          <div className="w-full lg:w-1/2">
            <Terminal
              username="cjblack.dev"
              commands={[
                "npx create-next-app@latest my-project",
                "cd my-project && npm install motion",
                "npx shadcn@latest add button card",
                "npm run dev",
              ]}
              outputs={{
                0: [
                  "✔ What is your project named? my-project",
                  "✔ Would you like to use TypeScript? Yes",
                  "✔ Would you like to use Tailwind CSS? Yes",
                  "✔ Project created successfully!",
                ],
                1: ["added 2 packages in 1.3s"],
                2: [
                  "✔ Checking registry.",
                  "✔ Installing dependencies.",
                  "✔ Done. Installed button, card.",
                ],
                3: [
                  "  ▲ Next.js 15.0.0",
                  "  - Local: http://localhost:3000",
                  "  ✓ Ready in 1.2s",
                ],
              }}
              typingSpeed={40}
              delayBetweenCommands={900}
              soundPlaybackRate={1.2}
              soundGain={0.07}
              soundDelay={20}
              className="max-w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
