"use client";
import React, { useState } from "react";
import { BentoGrid } from "@/components/ui/layout/bento-grid";
import { BackgroundLines } from "@/components/ui/backgrounds/background-lines";
import Link from "next/link";
import {
  IconHome,
  IconBrandFigma,
  IconDotsVertical,
} from "@tabler/icons-react";
import { projectsData } from "@/constants/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { LinkPreview } from "@/components/ui/media/link-preview";

/**
 * PageHeader Component
 * Responsive header with mobile menu (kebab icon)
 * LOCATION: Top of page
 * MOBILE: Shows title + kebab menu dropdown
 * DESKTOP: Shows back button + title + view UI button
 */
const PageHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* DESKTOP HEADER - visible on md screens and above */}
      <div className="relative z-10 mb-4 hidden shrink-0 items-center justify-between px-4 md:flex md:px-8">
        {/* LEFT: Back to Home Button */}
        <Link
          href="/#home"
          className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-neutral-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-400"
        >
          <IconHome className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        {/* CENTER: Page Title */}
        <h1 className="absolute left-1/2 -translate-x-1/2 transform bg-linear-to-br from-neutral-200 via-neutral-400 to-neutral-600 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
          Patch Up Ecosystem
        </h1>

        {/* RIGHT: View UI Button */}
        <LinkPreview
          url="https://www.figma.com/design/1PoJ6cj2uOoGcSaqnZ3QC8/TITLE-1-MOBILE-UI"
          className="font-medium"
        >
          <div className="flex cursor-pointer items-center gap-2 rounded-full border border-transparent bg-white px-4 py-2 text-sm font-medium text-black transition-all hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600 hover:shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)]">
            <IconBrandFigma className="h-4 w-4" />
            <span>View UI</span>
          </div>
        </LinkPreview>
      </div>

      {/* MOBILE HEADER - visible on screens below md */}
      <div className="relative z-50 mb-4 flex shrink-0 items-center justify-between px-4 md:hidden">
        {/* CENTER: Page Title (smaller for mobile) */}
        <h1 className="flex-1 bg-linear-to-br from-neutral-200 via-neutral-400 to-neutral-600 bg-clip-text text-center text-lg font-bold text-transparent">
          Patch Up Ecosystem
        </h1>

        {/* RIGHT: Kebab Menu Icon */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-full border border-neutral-800 bg-neutral-900 p-2 text-neutral-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-400"
          aria-label="Menu"
        >
          <IconDotsVertical className="h-5 w-5" />
        </button>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full right-4 z-50 mt-2 w-48 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 shadow-xl">
            <Link
              href="/#home"
              className="flex items-center gap-3 border-b border-neutral-800 px-4 py-3 text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-cyan-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <IconHome className="h-4 w-4" />
              <span className="text-sm">Back to Home</span>
            </Link>

            <LinkPreview
              url="https://www.figma.com/design/1PoJ6cj2uOoGcSaqnZ3QC8/TITLE-1-MOBILE-UI"
              className="block"
            >
              <div
                className="flex cursor-pointer items-center gap-3 px-4 py-3 text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-cyan-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <IconBrandFigma className="h-4 w-4" />
                <span className="text-sm">View UI Design</span>
              </div>
            </LinkPreview>
          </div>
        )}
      </div>
    </>
  );
};

/**
 * ProjectsGrid Component
 * 2-column grid displaying all project cards
 * LOCATION: Main content area
 */
const ProjectsGrid: React.FC = () => (
  <div className="relative z-10 min-h-0 flex-1">
    <BentoGrid className="h-full w-full max-w-none grid-cols-1 gap-0 md:auto-rows-auto md:grid-cols-2">
      {projectsData.map((item, i) => (
        <div
          key={i}
          className="group/bento shadow-input row-span-1 flex flex-col border border-neutral-800 bg-white p-3 transition duration-200 hover:shadow-xl dark:border-white/20 dark:bg-black dark:shadow-none"
        >
          <ProjectCard item={item} />
        </div>
      ))}
    </BentoGrid>
  </div>
);

/**
 * ProjectsPage Component
 * Main page displaying the Patch Up Ecosystem projects in a 2x2 grid
 *
 * STRUCTURE:
 * - Background with decorative lines
 * - Responsive header with mobile menu
 * - 2x2 BentoGrid of project cards
 *
 * RESPONSIVE FEATURES:
 * - Mobile: Compact title + kebab menu dropdown
 * - Desktop: Full header with back/view UI buttons
 * - Reduced text sizes for mobile screens
 */
export default function ProjectsPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-neutral-950 py-4 text-white">
      {/* BACKGROUND: Decorative lines */}
      <BackgroundLines className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0" />
      </BackgroundLines>

      {/* HEADER: Responsive navigation */}
      <PageHeader />

      {/* MAIN GRID: 2x2 project cards */}
      <ProjectsGrid />
    </div>
  );
}
