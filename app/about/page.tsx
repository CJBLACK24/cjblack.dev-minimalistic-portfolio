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
} from "@tabler/icons-react";
import { CVPreviewModal } from "@/components/modals/cv-preview-modal";
import confetti from "canvas-confetti";

interface NavItemProps {
  href: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

function NavItem({ href, label, isActive = false, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        relative py-3 px-2 text-xs sm:text-sm font-medium tracking-wider uppercase
        transition-all duration-300 ease-out
        ${isActive ? "text-white" : "text-white/50 hover:text-white/80"}
      `}
      style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
    >
      {label}
      {isActive && (
        <motion.span
          layoutId="activeNav"
          className="absolute left-0 top-0 bottom-0 w-[2px] bg-linear-to-b from-[#2FA4FF] to-purple-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
}

function VerticalNavbar() {
  const [activeItem] = useState("About");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Same nav items as hero navbar
  const navItems = [
    { href: "/about", label: "About" },
    { href: "/#projects", label: "Projects" },
    { href: "/#technologies", label: "Technologies" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <>
      {/* Desktop Vertical Navbar */}
      <nav
        className="fixed left-0 top-0 h-screen w-12 sm:w-14 md:w-16 lg:w-20 hidden sm:flex flex-col items-center z-50"
        style={{ backgroundColor: "#090b1d" }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="mt-4 sm:mt-6 mb-6 sm:mb-8 flex items-center justify-center"
        >
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            CJ<span className="text-[#2FA4FF]">.</span>
          </span>
        </Link>

        {/* Navigation Items */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              href={item.href}
              label={item.label}
              isActive={item.label === activeItem}
            />
          ))}
        </div>
      </nav>

      {/* Mobile Top Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 h-14 sm:hidden flex items-center justify-between px-4 z-50"
        style={{ backgroundColor: "#090b1d" }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center">
          <span className="text-xl font-bold text-white">
            CJ<span className="text-[#2FA4FF]">.</span>
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-14 left-0 right-0 sm:hidden z-40 overflow-hidden"
        style={{ backgroundColor: "#090b1d" }}
      >
        <div className="flex flex-col py-4 px-6 gap-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`
                py-2 text-sm font-medium tracking-wider uppercase
                transition-all duration-300 ease-out
                ${
                  item.label === activeItem
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  hoverColor?: string;
}

function SocialLink({
  href,
  icon,
  hoverColor = "hover:text-[#2FA4FF]",
}: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/70 ${hoverColor} transition-all duration-300 hover:scale-110`}
    >
      {icon}
    </a>
  );
}

export default function AboutPage() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

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
    <main className="min-h-screen w-full bg-[#020013] overflow-x-hidden flex items-center justify-center relative">
      {/* Vertical Navigation Bar */}
      <VerticalNavbar />

      {/* Top Right Actions - Social Icons & Download CV */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="fixed top-4 sm:top-6 right-4 sm:right-6 md:right-8 z-50 flex items-center gap-3 sm:gap-4"
      >
        {/* Social Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <SocialLink
            href="https://x.com/JohnCjblack"
            icon={<IconBrandX size={18} className="sm:w-5 sm:h-5" />}
          />
          <SocialLink
            href="https://github.com/CJBLACK24"
            icon={<IconBrandGithub size={18} className="sm:w-5 sm:h-5" />}
          />
          <SocialLink
            href="https://www.linkedin.com/in/cj-black-a5b110335"
            icon={<IconBrandLinkedin size={18} className="sm:w-5 sm:h-5" />}
            hoverColor="hover:text-[#0A66C2]"
          />
          <SocialLink
            href="https://www.facebook.com/ChrisNoLimit1124"
            icon={<IconBrandFacebook size={18} className="sm:w-5 sm:h-5" />}
            hoverColor="hover:text-[#1877F2]"
          />
          <SocialLink
            href="https://www.instagram.com/cjblack_24/"
            icon={<IconBrandInstagram size={18} className="sm:w-5 sm:h-5" />}
            hoverColor="hover:text-[#E4405F]"
          />
        </div>

        {/* Download CV Button */}
        <button
          onClick={handleDownloadCVClick}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#2FA4FF]/25"
          style={{
            backgroundColor: "#2FA4FF",
            color: "#020013",
          }}
        >
          <IconDownload size={18} className="sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Download CV</span>
          <span className="sm:hidden">CV</span>
        </button>
      </motion.div>

      {/* CV Preview Modal */}
      <CVPreviewModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        cvUrl="/CV/cjblack_resume.pdf"
      />

      {/* Main Content - responsive padding for navbar */}
      <motion.div
        className="max-w-6xl w-full flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 relative z-10 
          px-4 sm:pl-20 md:pl-24 lg:pl-28 sm:pr-6 md:pr-8 lg:pr-12 
          pt-20 sm:pt-6 md:pt-8 lg:pt-10 pb-6 sm:pb-8 md:pb-10 lg:pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <div>
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white"
            variants={itemVariants}
          >
            Meet your junior <br className="hidden md:block" />
            <span className="text-[#2FA4FF]">full-stack developer.</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start">
          {/* Left Side - Image */}
          <motion.div
            variants={itemVariants}
            className="relative w-full aspect-video sm:aspect-[4/3] lg:aspect-square max-h-[280px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[450px] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <Image
              src="/cjblackdev.jpg"
              alt="CJ Black - Junior Full-Stack Developer"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 sm:gap-5 md:gap-6 text-white/90"
          >
            <motion.div
              variants={itemVariants}
              className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-white/80"
            >
              <p>
                I&apos;m a junior full-stack developer and Next.js enthusiast
                working with the MERN and PERN stacks, building both web and
                mobile applications from concept to deployment.
              </p>
              <p>
                I develop faster using AI-assisted, agentic code editors to
                integrate features, connect frontend and backend logic, and
                maintain clean, structured codebases while actively reviewing
                and refining what I ship. As a vibe coder, I focus on turning
                ideas into real products—handling authentication like Google
                OAuth, setting up custom domains and hosting, deploying
                production-ready apps, and improving performance and security.
              </p>
              <p>
                I understand data flow across the stack, value code quality and
                readability, and continuously sharpen my fundamentals while
                building practical, real-world applications.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
