"use client";

import { Variants } from "motion/react";
import { Spotlight } from "@/components/ui/backgrounds/spotlight-new";
import { HeroNavbar } from "./hero-navbar";
import { HeroContent } from "./hero-content";

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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
        ease: [0.25, 1, 0.5, 1], // Custom cubic bezier for smooth feel
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, rotate: -2 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8"
    >
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" />

      {/* Header Navigation */}
      <HeroNavbar />

      {/* Hero Content */}
      <HeroContent
        containerVariants={containerVariants}
        itemVariants={itemVariants}
        imageVariants={imageVariants}
      />
    </section>
  );
}
