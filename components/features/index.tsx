"use client";

import React from "react";
import { motion, Variants } from "motion/react";
import {
  IconBuildingArch,
  IconMessageCircle,
  IconBolt,
} from "@tabler/icons-react";

const features = [
  {
    icon: IconBuildingArch,
    title: "Quality Focus",
    description:
      "Delivering high-quality results while maintaining attention to every detail.",
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    icon: IconMessageCircle,
    title: "Reliable Communication",
    description:
      "Keeping you updated at every step to ensure transparency and clarity.",
    accent: "from-purple-500/20 to-purple-500/5",
  },
  {
    icon: IconBolt,
    title: "On-Time Delivery",
    description:
      "Making sure projects are completed on schedule, with quality & attention to detail.",
    accent: "from-cyan-500/20 to-cyan-500/5",
  },
];

export function FeaturesSection() {
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
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-24 md:py-32 px-4 w-full"
      id="features"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative flex flex-col items-center text-center p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1
                bg-[#0a0a0a] 
                border-neutral-800 
                hover:border-neutral-500"
            >
              {/* Subtle gradient on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${feature.accent} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors bg-[#111] border border-neutral-800 group-hover:border-neutral-600">
                  <feature.icon className="w-7 h-7 transition-colors text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
