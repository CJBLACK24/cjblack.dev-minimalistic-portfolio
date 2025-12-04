/* eslint-disable @typescript-eslint/no-explicit-any */
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
      <div className="hidden md:flex relative z-10 justify-between items-center mb-4 shrink-0 px-4 md:px-8">
        {/* LEFT: Back to Home Button */}
        <Link
          href="/#home"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 text-neutral-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors border border-neutral-800 text-sm"
        >
          <IconHome className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* CENTER: Page Title */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl md:text-3xl font-bold bg-linear-to-br from-neutral-200 via-neutral-400 to-neutral-600 bg-clip-text text-transparent">
          Patch Up Ecosystem
        </h1>

        {/* RIGHT: View UI Button */}
        <LinkPreview
          url="https://www.figma.com/design/1PoJ6cj2uOoGcSaqnZ3QC8/TITLE-1-MOBILE-UI"
          className="font-medium"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-cyan-50 hover:text-cyan-600 hover:shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)] transition-all text-sm cursor-pointer border border-transparent hover:border-cyan-200">
            <IconBrandFigma className="w-4 h-4" />
            <span>View UI</span>
          </div>
        </LinkPreview>
      </div>

      {/* MOBILE HEADER - visible on screens below md */}
      <div className="md:hidden relative z-50 flex justify-between items-center mb-4 shrink-0 px-4">
        {/* CENTER: Page Title (smaller for mobile) */}
        <h1 className="text-lg font-bold bg-linear-to-br from-neutral-200 via-neutral-400 to-neutral-600 bg-clip-text text-transparent flex-1 text-center">
          Patch Up Ecosystem
        </h1>

        {/* RIGHT: Kebab Menu Icon */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-full bg-neutral-900 text-neutral-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors border border-neutral-800"
          aria-label="Menu"
        >
          <IconDotsVertical className="w-5 h-5" />
        </button>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full right-4 mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl overflow-hidden z-50">
            <Link
              href="/#home"
              className="flex items-center gap-3 px-4 py-3 text-neutral-300 hover:text-cyan-400 hover:bg-neutral-800 transition-colors border-b border-neutral-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <IconHome className="w-4 h-4" />
              <span className="text-sm">Back to Home</span>
            </Link>

            <LinkPreview
              url="https://www.figma.com/design/1PoJ6cj2uOoGcSaqnZ3QC8/TITLE-1-MOBILE-UI"
              className="block"
            >
              <div
                className="flex items-center gap-3 px-4 py-3 text-neutral-300 hover:text-cyan-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <IconBrandFigma className="w-4 h-4" />
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
  <div className="relative z-10 flex-1 min-h-0">
    <BentoGrid className="h-full grid-cols-1 md:grid-cols-2 gap-0 md:auto-rows-auto w-full max-w-none">
      {projectsData.map((item, i) => (
        <div
          key={i}
          className="row-span-1 group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-3 dark:bg-black dark:border-white/20 bg-white border border-neutral-800 flex flex-col"
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
    <div className="min-h-screen bg-neutral-950 text-white py-4 flex flex-col relative overflow-hidden">
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
