"use client";

import React from "react";
import { HoverBorderGradient } from "@/components/ui/buttons/hover-border-gradient";
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
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="contact" className="w-full py-20 lg:py-40">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            variants={itemVariants}
            className="mt-1 mb-8 flex justify-center"
          >
            <HoverBorderGradient containerClassName="rounded-full">
              💭Have a questions or ideas? Let&apos;s talk!🚀
            </HoverBorderGradient>
          </motion.div>
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get in Touch - Let&apos;s Connect!
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Column: Contact Form */}
            <ContactForm itemVariants={itemVariants} />

            {/* Right Column: Contact Info Cards */}
            <ContactInfo itemVariants={itemVariants} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
