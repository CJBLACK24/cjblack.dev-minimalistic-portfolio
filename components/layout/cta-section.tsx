"use client";

import React from "react";
import { motion } from "motion/react";
import { IconArrowRight } from "@tabler/icons-react";

export function PreFooterCTA() {
  return (
    <section className="py-24 w-full relative overflow-hidden bg-black border-t border-neutral-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black opacity-50" />

      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Ready to build?
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Let&apos;s turn your ideas into reality. Whether you need a modern web
            app, a complex dashboard, or a stunning portfolio, I'm here to help.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-white px-8 font-medium text-black transition-all duration-300 hover:bg-neutral-200 hover:scale-105"
            >
              <span className="mr-2">Start a Project</span>
              <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
            </a>

            <a
              href="mailto:duquechristianjohncalderon@gmail.com"
              className="inline-flex h-12 items-center justify-center rounded-md border border-neutral-800 bg-black px-8 font-medium text-white transition-all duration-300 hover:bg-neutral-900 hover:border-neutral-700"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
