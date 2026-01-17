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
    <section id="contact" className="w-full section-enhanced">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Header - Refined */}
          <motion.div variants={itemVariants} className="text-center mb-12 md:mb-14">
            <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-3 uppercase tracking-wider">
              Get in touch
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Let&apos;s Connect
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
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
