"use client";

import React from "react";
import { motion, Variants } from "motion/react";
import {
  IconBuildingArch,
  IconMessageCircle,
  IconBolt,
} from "@tabler/icons-react";

import { FeatureCard } from "./feature-card";

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
        staggerChildren: 0.2,
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
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-24 md:py-32 px-4 w-full relative"
      id="features"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 min-h-[400px]">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="h-full"
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                accent={feature.accent}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
