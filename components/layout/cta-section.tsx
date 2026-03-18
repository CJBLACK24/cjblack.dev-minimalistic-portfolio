"use client";

import React from "react";
import { motion } from "motion/react";
import { IconArrowRight } from "@tabler/icons-react";

export function PreFooterCTA() {
  return (
    <section className="relative w-full overflow-hidden border-t border-neutral-800 bg-black py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-heading mb-6">
            Ready to build?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
            Let&apos;s turn your ideas into reality. Whether you need a modern
            web app, a complex dashboard, or a stunning portfolio, I&apos;m here
            to help.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-white px-8 font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-neutral-200"
            >
              <span className="mr-2">Start a Project</span>
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 -z-10 bg-linear-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
            </a>

            <a
              href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCKCHVHpbGPWxtXhphfXPzBbnGgNNDdntPzHZjjJbWsZNbnBzKLfXmvJWBPcGfFVZqxkHnvB"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-md border border-neutral-800 bg-black px-8 font-medium text-white transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
