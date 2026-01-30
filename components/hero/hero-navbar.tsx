"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  IconBrandX,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

const navItems = [
  { href: "/#home", label: "Home" },
  { href: "/wall", label: "Wall" },
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

export const HeroNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-neutral-200/20 bg-white/10 backdrop-blur-xl transition-colors duration-300 dark:border-neutral-800/20 dark:bg-black/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-sports text-2xl font-bold tracking-wider text-neutral-900 dark:text-white">
              CJBLACK
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-sm font-medium text-neutral-500 transition-colors duration-300 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center md:flex">
            <div className="flex items-center gap-1">
              {socialLinks.slice(0, 3).map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-neutral-400 transition-colors duration-300 hover:bg-neutral-100/50 hover:text-neutral-900 dark:text-neutral-500 dark:hover:bg-neutral-800/30 dark:hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-500 transition-colors duration-300 hover:text-neutral-900 dark:hover:text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-neutral-200/20 bg-white/10 backdrop-blur-xl transition-colors duration-300 md:hidden dark:border-neutral-800/20 dark:bg-black/10"
          >
            <div className="space-y-2 px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 text-base font-medium text-neutral-500 transition-colors duration-300 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-neutral-200/20 pt-4 backdrop-blur-xl transition-colors duration-300 dark:border-neutral-800/20">
                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-neutral-100/50 p-2.5 text-neutral-500 transition-colors duration-300 hover:text-neutral-900 dark:bg-neutral-900/30 dark:hover:text-white"
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
