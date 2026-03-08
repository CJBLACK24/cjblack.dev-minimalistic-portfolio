"use client";

import dynamic from "next/dynamic";
import { IntroLoader } from "@/components/layout/intro-loader";
import { Spotlight } from "@/components/ui/backgrounds/spotlight-new";
import { HeroSection } from "@/components/hero";
import { ScrollProgress } from "@/components/ui/effects/scroll-progress";
import { ScrollToTop } from "@/components/ui/effects/scroll-to-top";
import { SectionSkeleton } from "@/components/ui/skeletons/section-skeleton";

const FeaturesSection = dynamic(
  () => import("@/components/features").then((mod) => mod.FeaturesSection),
  {
    loading: () => <SectionSkeleton cards={3} variant="grid" />,
  },
);
const ProjectsSection = dynamic(
  () => import("@/components/projects").then((mod) => mod.ProjectsSection),
  {
    loading: () => <SectionSkeleton cards={3} variant="grid" />,
  },
);
const ContactSection = dynamic(
  () => import("@/components/contact").then((mod) => mod.ContactSection),
  {
    loading: () => <SectionSkeleton variant="contact" />,
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
    loading: () => <SectionSkeleton cards={3} variant="grid" />,
  },
);
const WorkExperienceSection = dynamic(
  () =>
    import("@/components/work-experience").then(
      (mod) => mod.WorkExperienceSection,
    ),
  {
    loading: () => <SectionSkeleton cards={4} variant="list" />,
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
  return (
    <main
      id="main-content"
      className="relative mx-auto flex flex-col items-center justify-center overflow-hidden bg-black px-4 text-white transition-colors duration-300 sm:px-10"
    >
      <IntroLoader />

      <ScrollProgress className="bg-linear-to-r from-transparent via-cyan-500 to-transparent" />

      <Spotlight />

      <div className="w-full max-w-7xl">
        <HeroSection />
        <FeaturesSection />
        <ProjectsSection />

        <TechnologiesSection />
        <WorkExperienceSection />
        <ContactSection />
        <PreFooterCTA />
        <Footer />
      </div>

      {/* Scroll-to-top button — appears after 600px scroll */}
      <ScrollToTop />
    </main>
  );
}
