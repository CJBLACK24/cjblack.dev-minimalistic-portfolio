"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  Server,
  Cpu,
  ClipboardList,
  FileText,
  Paintbrush,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   STATIC DATA
   ═══════════════════════════════════════════════════════════ */

const responsibilities = [
  {
    title: "Network Technician",
    description: "LAN cabling, SSID config & cable management",
    icon: Server,
    tileClass: "bg-tile-blue",
    iconClass: "text-icon-blue",
  },
  {
    title: "Hardware Support Specialist",
    description: "Diagnostics & repair for Epson printing systems",
    icon: Cpu,
    tileClass: "bg-tile-amber",
    iconClass: "text-icon-amber",
  },
  {
    title: "IT Asset Coordinator",
    description: "Inventory lifecycle tracking, serial numbers & specs",
    icon: ClipboardList,
    tileClass: "bg-tile-green",
    iconClass: "text-icon-green",
  },
  {
    title: "Data Entry & Reporting",
    description: "Structured Excel encoding from verbal/written input",
    icon: FileText,
    tileClass: "bg-tile-purple",
    iconClass: "text-icon-purple",
  },
  {
    title: "Creative Technical Assistant",
    description: "AI-assisted graphic design for company branding",
    icon: Paintbrush,
    tileClass: "bg-tile-pink",
    iconClass: "text-icon-pink",
  },
] as const;

const tags = [
  { label: "Tech Support", highlight: true },
  { label: "Networking", highlight: false },
  { label: "Hardware", highlight: false },
  { label: "IT Assets", highlight: false },
  { label: "Government", highlight: false },
  { label: "Intern", highlight: false },
] as const;

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

export function WorkExperienceSection() {
  return (
    <section id="work-experience" className="w-full bg-black py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 md:mb-7"
        >
          <h2 className="section-heading mb-1">Work Experience</h2>
          <p className="text-sm font-normal text-[var(--text-muted)] md:text-[15px]">
            Professional roles and internships
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl border-[0.5px] border-[var(--card-border)] bg-[var(--card)] lg:rounded-[20px]"
        >
          {/* Accent line — top on mobile, left on desktop */}
          <div className="h-[2px] w-full bg-accent-cyan lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-[3px] lg:rounded-l-[20px]" />

          <div className="p-4 md:p-6 lg:py-7 lg:pr-7 lg:pl-8">
            {/* ── Card header ── */}
            <div className="flex items-start gap-3 md:gap-4">
              {/* Logo */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-[var(--secondary)] md:h-[52px] md:w-[52px] md:rounded-xl">
                <Image
                  src="/work exp/DOLE.png"
                  alt="DOLE Logo"
                  width={52}
                  height={52}
                  className="h-full w-full object-contain"
                  unoptimized
                />
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-medium text-[var(--text-primary)] md:text-lg">
                  <span className="md:hidden">DOLE VI</span>
                  <span className="hidden md:inline">
                    Department of Labor and Employment Region VI
                  </span>
                </h3>
                <p className="mt-0.5 text-[13px] font-normal text-[var(--text-secondary)] md:text-sm">
                  Intern · IMSD – ICT Unit
                </p>
              </div>

              {/* Completed badge */}
              <span className="mt-0.5 inline-flex shrink-0 items-center gap-[5px] rounded-full border-[0.5px] border-neutral-800 bg-neutral-900/50 px-2.5 py-[3px] text-[11px] font-medium leading-none text-neutral-400 md:px-3 md:py-1 md:text-xs">
                <span className="h-[5px] w-[5px] rounded-full bg-neutral-500" />
                Completed
              </span>
            </div>

            {/* ── Metadata chips ── */}
            <div className="mt-3.5 flex flex-wrap gap-2 md:mt-4 md:gap-2.5">
              <span className="inline-flex items-center gap-[5px] rounded-full border-[0.5px] border-[var(--border)] bg-[var(--secondary)] px-2.5 py-[5px] text-xs font-normal leading-none text-[var(--text-muted)] md:px-3 md:py-1.5 md:text-[13px]">
                <Calendar className="h-[13px] w-[13px] shrink-0" />
                Feb 2026 – May 2026
              </span>
              <span className="inline-flex items-center gap-[5px] rounded-full border-[0.5px] border-[var(--border)] bg-[var(--secondary)] px-2.5 py-[5px] text-xs font-normal leading-none text-[var(--text-muted)] md:px-3 md:py-1.5 md:text-[13px]">
                <Clock className="h-[13px] w-[13px] shrink-0" />
                Mon–Fri · 8:00–5:00 PM
              </span>
            </div>

            {/* ── Divider ── */}
            <div className="my-4 h-[0.5px] w-full bg-[var(--border)] md:my-5" />

            {/* ── Responsibilities ── */}
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--text-muted)] md:mb-3.5">
              Responsibilities
            </p>

            <div className="flex flex-col gap-2.5 md:gap-3 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-3">
              {responsibilities.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-2.5 md:gap-3"
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] md:h-8 md:w-8 md:rounded-lg ${item.tileClass}`}
                  >
                    <item.icon
                      className={`h-[15px] w-[15px] md:h-[17px] md:w-[17px] ${item.iconClass}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium leading-[1.3] text-[var(--text-primary)] md:text-sm">
                      {item.title}
                    </div>
                    <div className="mt-px text-xs font-normal leading-[1.4] text-[var(--text-secondary)] md:text-[13px]">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Tags ── */}
            <div className="mt-4 flex flex-wrap gap-1.5 md:mt-5 md:gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.label}
                  className={`inline-flex items-center rounded-[6px] px-2.5 py-1 text-[11px] font-medium leading-none md:rounded-lg md:px-3 md:py-[5px] md:text-xs ${
                    tag.highlight
                      ? "border-[0.5px] border-info-border bg-info-soft text-accent-cyan"
                      : "border-[0.5px] border-[var(--border)] bg-[var(--secondary)] text-[var(--text-secondary)]"
                  }`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
