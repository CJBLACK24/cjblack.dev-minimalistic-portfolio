"use client";

import React from "react";
import { motion } from "motion/react";
import { IconArrowRight } from "@tabler/icons-react";
import { Terminal } from "@/components/ui/terminal";

export function PreFooterCTA() {
  return (
    <section className="relative w-full overflow-hidden border-t border-neutral-800 bg-black py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16"
        >
          {/* Left — Text + Buttons */}
          <div className="flex w-full flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
            <h2 className="section-heading mb-6">Ready to build?</h2>
            <p className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-neutral-400 md:text-xl lg:mx-0">
              Let&apos;s turn your ideas into reality. Whether you need a modern
              web app, a complex dashboard, or a stunning portfolio, I&apos;m
              here to help. I prioritize the security of your website with robust 
              solutions like rate limiting and WAF powered by Arcjet and Cloudflare.
            </p>

            <div className="flex flex-row w-full items-center justify-center gap-2 sm:gap-4 lg:justify-start">
              <a
                href="#contact"
                className="group relative inline-flex h-12 flex-1 sm:flex-initial items-center justify-center overflow-hidden rounded-none bg-white px-2 min-[400px]:px-4 sm:px-8 text-xs min-[400px]:text-sm sm:text-base font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-neutral-200 whitespace-nowrap"
              >
                <span className="mr-1 min-[400px]:mr-2">Start a Project</span>
                <IconArrowRight className="h-3 w-3 min-[400px]:h-4 min-[400px]:w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 -z-10 bg-linear-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
              </a>

              <a
                href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCKCHVHpbGPWxtXhphfXPzBbnGgNNDdntPzHZjjJbWsZNbnBzKLfXmvJWBPcGfFVZqxkHnvB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 flex-1 sm:flex-initial items-center justify-center rounded-none border border-neutral-800 bg-black px-2 min-[400px]:px-4 sm:px-8 text-xs min-[400px]:text-sm sm:text-base font-medium text-white transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900 whitespace-nowrap"
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
