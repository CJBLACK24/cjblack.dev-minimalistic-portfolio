"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { IntroLoader } from "@/components/layout/intro-loader";
import { Spotlight } from "@/components/ui/backgrounds/spotlight-new";
import { HeroSectionOne } from "@/components/sections/hero-section";
import { FloatingNav } from "@/components/ui/layout/floating-navbar";
import { ScrollProgress } from "@/components/ui/effects/scroll-progress";
import { navItems } from "@/constants";

const FeaturesSection = dynamic(
  () =>
    import("@/components/sections/features-section").then(
      (mod) => mod.FeaturesSection
    ),
  {
    loading: () => <div className="min-h-screen" />,
  }
);
const ProjectsSection = dynamic(
  () =>
    import("@/components/sections/projects-section").then(
      (mod) => mod.ProjectsSection
    ),
  {
    loading: () => <div className="min-h-screen" />,
  }
);
const ContactSection = dynamic(
  () =>
    import("@/components/sections/contact-section").then(
      (mod) => mod.ContactSection
    ),
  {
    loading: () => <div className="min-h-screen" />,
  }
);
const Footer = dynamic(
  () => import("@/components/layout/footer").then((mod) => mod.Footer),
  {
    loading: () => <div className="h-20" />,
  }
);
const TechnologiesSection = dynamic(
  () =>
    import("@/components/sections/technologies-section").then(
      (mod) => mod.TechnologiesSection
    ),
  {
    loading: () => <div className="min-h-screen" />,
  }
);

export default function Home() {
  useEffect(() => {
    // IntroLoader handles its own loading state logic internally for the animation
    // But we keep this state if we want to conditionally render other things
    // However, IntroLoader is self-contained with AnimatePresence
  }, []);

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto px-4 sm:px-10 bg-black text-white">
      <IntroLoader />

      <ScrollProgress className="bg-linear-to-r from-transparent via-cyan-500 to-transparent" />

      <FloatingNav navItems={navItems} />

      <Spotlight />

      <div className="max-w-7xl w-full">
        <HeroSectionOne />
        <FeaturesSection />
        <ProjectsSection />
       
        <TechnologiesSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
