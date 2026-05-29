import { Variants } from "motion/react";
import React from "react";

export interface HeroContentProps {
  containerVariants: Variants;
  itemVariants: Variants;
}

export interface SectionProps {
  itemVariants: Variants;
}

export interface TechItem {
  id: number;
  name: string;
  image?: string;
  designation?: string;
}

export interface ProjectProps {
  id: number | string;
  title: string;
  description: string;
  link: string;
  techStack: TechItem[];
  header?: React.ReactNode;
  github?: string;
  subtitle?: string;
  longDescription?: string;
  features?: string[];
}

export interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
  copyable?: boolean;
  clickable?: boolean;
}

export interface FeatureCardProps {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  description: string;
}
