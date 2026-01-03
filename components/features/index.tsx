"use client";

import React from "react";
import { SparklesCore } from "@/components/ui/backgrounds/sparkles";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { motion, Variants } from "motion/react";
import {
  IconBuildingArch,
  IconMessageCircle,
  IconBolt,
} from "@tabler/icons-react";
import { FeatureCard } from "./feature-card";

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
      className="py-20 px-4 w-full relative"
      id="features"
    >
      {/* Sparkles Background Effect */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="features-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={6}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={itemVariants}>
            <FeatureCard
              title="Quality Focus"
              description="Delivering high-quality results while maintaining attention to every detail."
              icon={
                <IconBuildingArch className="h-10 w-10 text-white group-hover/canvas-card:text-cyan-400 group-data-[state=hovered]/canvas-card:text-cyan-400 transition-colors" />
              }
            >
              <CanvasRevealEffect
                animationSpeed={5.1}
                containerClassName="bg-emerald-900"
              />
            </FeatureCard>
          </motion.div>
          <motion.div variants={itemVariants}>
            <FeatureCard
              title="Reliable Communication"
              description="Keeping you updated at every step to ensure transparency and clarity."
              icon={
                <IconMessageCircle className="h-10 w-10 text-white group-hover/canvas-card:text-cyan-400 group-data-[state=hovered]/canvas-card:text-cyan-400 transition-colors" />
              }
            >
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-black"
                colors={[
                  [236, 72, 153],
                  [232, 121, 249],
                ]}
                dotSize={2}
              />
            </FeatureCard>
          </motion.div>
          <motion.div variants={itemVariants}>
            <FeatureCard
              title="On-Time Delivery"
              description="Making sure projects are completed on schedule, with quality & attention to detail."
              icon={
                <IconBolt className="h-10 w-10 text-white group-hover/canvas-card:text-cyan-400 group-data-[state=hovered]/canvas-card:text-cyan-400 transition-colors" />
              }
            >
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-sky-600"
                colors={[[125, 211, 252]]}
              />
            </FeatureCard>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
