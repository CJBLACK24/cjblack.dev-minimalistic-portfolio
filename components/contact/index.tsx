"use client";

import React from "react";
import { motion, Variants } from "motion/react";
import { ContactForm } from "./contact-form";
import { ContactInfo } from "./contact-info";

export function ContactSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="contact" className="section-enhanced w-full">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          {/* Header - Refined */}
          <motion.div
            variants={itemVariants}
            className="mb-12 text-center md:mb-14"
          >
            <p className="mb-3 text-sm font-medium tracking-wider text-cyan-600 uppercase dark:text-cyan-400">
              Get in touch
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl dark:text-white">
              Let&apos;s Connect
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
            {/* Contact Form */}
            <ContactForm itemVariants={itemVariants} />

            {/* Contact Info Cards */}
            <ContactInfo itemVariants={itemVariants} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
