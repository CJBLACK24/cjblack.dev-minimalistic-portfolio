"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  IconBrandX,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandFacebook,
  IconBrandInstagram,
  IconDownload,
  IconMenu2,
  IconX,
  IconArrowLeft,
} from "@tabler/icons-react";
import { CVPreviewModal } from "@/components/modals/cv-preview-modal";

import confetti from "canvas-confetti";

const navItems = [
  { href: "/#home", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#technologies", label: "Technologies" },
  { href: "/#contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://x.com/JohnCjblack", icon: IconBrandX, label: "X" },
  {
    href: "https://github.com/CJBLACK24",
    icon: IconBrandGithub,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/cj-black-a5b110335",
    icon: IconBrandLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://www.facebook.com/ChrisNoLimit1124",
    icon: IconBrandFacebook,
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/cjblack_24/",
    icon: IconBrandInstagram,
    label: "Instagram",
  },
];

export default function AboutPage() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDownloadCVClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsCVModalOpen(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ["#2FA4FF", "#3b82f6", "#ffffff"],
    });
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden transition-colors duration-300 bg-white dark:bg-black">
      {/* Fixed Header - Theme aware */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-colors duration-300 border-neutral-200 dark:border-neutral-800/60 bg-white/80 dark:bg-black/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <IconArrowLeft className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300" />
              <span className="text-xl font-bold text-neutral-900 dark:text-white">
                CJ<span className="text-cyan-500 dark:text-[#2FA4FF]">.</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-300 relative group ${
                    item.label === "About"
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-500 transition-all duration-300 ${
                      item.label === "About"
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-1">
                {socialLinks.slice(0, 3).map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
              <button
                onClick={handleDownloadCVClick}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-[1.02] bg-cyan-500 dark:bg-[#2FA4FF] text-white dark:text-dark-bg"
              >
                <IconDownload size={16} />
                <span>Download CV</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <IconX size={24} />
                ) : (
                  <IconMenu2 size={24} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-neutral-200 dark:border-neutral-800/60 bg-white dark:bg-black"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2.5 text-base font-medium transition-colors duration-300 ${
                    item.label === "About"
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800/60">
                <div className="flex items-center gap-2 mb-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-neutral-100 dark:bg-neutral-900/60 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300"
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
                <button
                  onClick={(e) => {
                    handleDownloadCVClick(e);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium bg-cyan-500 dark:bg-[#2FA4FF] text-white dark:text-dark-bg"
                >
                  <IconDownload size={18} />
                  <span>Download CV</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* CV Preview Modal */}
      <CVPreviewModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        cvUrl="/CV/cjblack_resume.pdf"
      />

      {/* Main Content */}
      <section className="pt-20 pb-20 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-10"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white whitespace-nowrap">
              Meet your junior{" "}
              <span className="bg-linear-to-br from-cyan-600 to-cyan-400 dark:from-white dark:to-[#2FA4FF] bg-clip-text text-transparent">
                full-stack developer.
              </span>
            </h1>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative w-full max-w-md mx-auto lg:mx-0"
            >
              {/* Top Right Corner Accent */}
              <div className="absolute -top-6 -right-6 w-24 h-24 z-0">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  fill="none"
                  className="overflow-visible"
                >
                  <motion.path
                    d="M 20 20 L 60 20 Q 80 20 80 40 L 80 80"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                    className="drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                  />
                </svg>
              </div>

              {/* Bottom Left Corner Accent */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 z-0">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  fill="none"
                  className="overflow-visible"
                >
                  <motion.path
                    d="M 80 80 L 40 80 Q 20 80 20 60 L 20 20"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
                    className="drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                  />
                </svg>
              </div>

              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800/60 bg-neutral-100 dark:bg-neutral-900/40 group z-10">
                <Image
                  src="/cjblackdev.jpg"
                  alt="CJ Black - Junior Full-Stack Developer"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-120"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-8"
            >
              <div className="space-y-6 text-base md:text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
                <p>
                  I&apos;m Christian John Calderon Duque, a web and mobile
                  developer focused on Next.js and the PERN/MERN stacks,
                  building full-stack apps that are clean, solid, and ready for
                  real-world use. One of my recent projects is a University
                  Dashboard Management System built with Next.js, PostgreSQL
                  (NeonDB), Drizzle ORM, and Better Auth for passwordless login,
                  where I handled everything from frontend to backend. I use AI
                  tools to speed things up without cutting corners, making sure
                  features are wired correctly, secure, and fast. I build with
                  strong fundamentals, clear system thinking, and a builder
                  mindset—turning ideas into working products through smart
                  auth, clean databases, and smooth deployment.
                </p>
              </div>

              {/* Stats */}
              <div className="pt-8 border-t-2 border-neutral-200 dark:border-neutral-800/60">
                <div className="grid grid-cols-2 gap-6">
                  <div className="group cursor-default">
                    <p className="text-3xl font-bold text-neutral-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors duration-300">
                      2+
                    </p>
                    <p className="text-sm text-neutral-500 font-medium mt-1">
                      Years Learning
                    </p>
                  </div>
                  <div className="group cursor-default">
                    <p className="text-3xl font-bold text-neutral-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors duration-300">
                      5+
                    </p>
                    <p className="text-sm text-neutral-500 font-medium mt-1">
                      Projects Built
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
