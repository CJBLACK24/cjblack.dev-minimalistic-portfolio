/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";

interface ProjectCardProps {
  item: any;
}

/**
 * ProjectHeader Component
 * Displays category, title, and description
 * LOCATION: Top of each project card
 */
const ProjectHeader: React.FC<{ item: any }> = ({ item }) => (
  <div className="px-4 md:px-6 py-3 md:py-4 border-b border-neutral-200 dark:border-neutral-800">
    <p
      className="text-xl font-semibold uppercase tracking-wider mb-2"
      style={{ color: "rgb(194, 205, 231)" }}
    >
      {item.category}
    </p>
    <h3 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-100 leading-tight mb-2">
      {item.title}
    </h3>
    <p
      className="text-xl leading-relaxed"
      style={{ color: "rgb(194, 205, 231)" }}
    >
      {item.description}
    </p>
  </div>
);

/**
 * FeaturesList Component
 * Displays bullet-point list of key features
 */
const FeaturesList: React.FC<{ features: string[] }> = ({ features }) => (
  <div className="space-y-2">
    <h4 className="text-xl md:text-lg font-bold text-neutral-800 dark:text-neutral-200">
      Key Features
    </h4>
    <ul className="space-y-2">
      {features.map((feature: string, idx: number) => (
        <li
          key={idx}
          className="flex items-start text-sm md:text-lg text-neutral-600 dark:text-neutral-400"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 mr-2 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * TechStack Component
 * Displays technology tags in a flexbox layout
 */
const TechStack: React.FC<{ techStack: string[] }> = ({ techStack }) => (
  <div className="space-y-2">
    <h4 className="text-sm md:text-lg font-bold text-neutral-800 dark:text-neutral-200">
      Tech Stack
    </h4>
    <div className="flex flex-wrap gap-1.5">
      {techStack.map((tech: string, idx: number) => (
        <span
          key={idx}
          className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs md:text-sm text-neutral-700 dark:text-neutral-300 font-medium border border-neutral-200 dark:border-neutral-700 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-950/30 transition-colors cursor-default"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
);

/**
 * ImageSection Component
 * Displays the project image (static, no carousel/slider)
 * LOCATION: Left side of project card (below header)
 * POSITIONING: Image fills container without extra grey space below
 */
const ImageSection: React.FC<{ item: any }> = ({ item }) => (
  <div className="w-full md:w-1/2 flex items-stretch bg-neutral-50 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 overflow-hidden">
    <div className="relative w-full min-h-[200px] md:min-h-0">
      <Image src={item.src} alt={item.title} fill className="object-cover" />
    </div>
  </div>
);

/**
 * DetailsSection Component
 * Displays Key Features and Tech Stack
 * LOCATION: Right side of project card (below header)
 */
const DetailsSection: React.FC<{ item: any }> = ({ item }) => (
  <div className="w-full md:w-1/2 flex flex-col p-4 md:p-6 space-y-4">
    {/* Key Features List */}
    <FeaturesList features={item.features} />

    {/* Tech Stack Tags */}
    <TechStack techStack={item.techStack} />
  </div>
);

/**
 * ProjectCard Component
 * Displays a single project's details in a card format
 * Layout: Header (full width) + Split bottom (static image left, details right)
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ item }) => {
  return (
    <div className="flex flex-col h-full">
      {/* PROJECT HEADER - Category, Title, Description */}
      <ProjectHeader item={item} />

      {/* BOTTOM SECTION - Image + Features */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        {/* LEFT: Static Image */}
        <ImageSection item={item} />

        {/* RIGHT: Features & Tech Stack */}
        <DetailsSection item={item} />
      </div>
    </div>
  );
};
