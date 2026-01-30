"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { IntroLoader } from "@/components/layout/intro-loader";
import { Spotlight } from "@/components/ui/backgrounds/spotlight-new";
import { HeroSection } from "@/components/hero";
import { FloatingNav } from "@/components/ui/layout/floating-navbar";
import { ScrollProgress } from "@/components/ui/effects/scroll-progress";
import { navItems } from "@/constants";

const FeaturesSection = dynamic(
  () => import("@/components/features").then((mod) => mod.FeaturesSection),
  {
    loading: () => <div className="min-h-screen" />,
  },
);
const ProjectsSection = dynamic(
  () => import("@/components/projects").then((mod) => mod.ProjectsSection),
  {
    loading: () => <div className="min-h-screen" />,
  },
);
const ContactSection = dynamic(
  () => import("@/components/contact").then((mod) => mod.ContactSection),
  {
    loading: () => <div className="min-h-screen" />,
  },
);
const Footer = dynamic(
  () => import("@/components/layout/footer").then((mod) => mod.Footer),
  {
    loading: () => <div className="h-20" />,
  },
);
const TechnologiesSection = dynamic(
  () =>
    import("@/components/technologies").then((mod) => mod.TechnologiesSection),
  {
    loading: () => <div className="min-h-screen" />,
  },
);
const PreFooterCTA = dynamic(
  () =>
    import("@/components/layout/cta-section").then((mod) => mod.PreFooterCTA),
  {
    loading: () => <div className="h-40" />,
  },
);

export default function Home() {
  useEffect(() => {
    // IntroLoader handles its own loading state logic internally for the animation
    // But we keep this state if we want to conditionally render other things
    // However, IntroLoader is self-contained with AnimatePresence
  }, []);

  return (
    <main className="relative mx-auto flex flex-col items-center justify-center overflow-hidden bg-black px-4 text-white transition-colors duration-300 sm:px-10">
      <IntroLoader />

      <ScrollProgress className="bg-linear-to-r from-transparent via-cyan-500 to-transparent" />

      <Spotlight />

      <div className="w-full max-w-7xl">
        <HeroSection />
        <FeaturesSection />
        <ProjectsSection />

        <TechnologiesSection />
        <ContactSection />
        <PreFooterCTA />
        <Footer />
      </div>
    </main>
  );
}
