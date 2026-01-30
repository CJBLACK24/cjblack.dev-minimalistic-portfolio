"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useRef, useEffect } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/primitives/avatar";
import {
  IconMenu2,
  IconX,
  IconBrandX,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconLogout,
  IconArrowLeft,
} from "@tabler/icons-react";
import { DotBackground } from "@/components/backgrounds/dot-background";
import { FeedbackWall } from "@/components/feedback/FeedbackWall";
import { AnimatePresence } from "motion/react";

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

export default function WallPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white transition-colors duration-300 dark:bg-black">
      {/* Fixed Header */}
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-neutral-200/20 bg-white/10 backdrop-blur-xl transition-colors duration-300 dark:border-neutral-800/20 dark:bg-black/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="group flex items-center">
              <span className="font-sports text-2xl font-bold tracking-wider text-neutral-900 dark:text-white">
                CJBLACK
              </span>
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    item.label === "Wall"
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {/* User Avatar Menu - Added to Wall Page only as requested */}
              {!isPending && session?.user && (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="cursor-pointer rounded-full p-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    aria-label="User menu"
                  >
                    <Avatar className="h-8 w-8 border border-neutral-200 text-xs transition-colors hover:border-cyan-500 dark:border-neutral-800">
                      <AvatarImage
                        src={session.user.image || ""}
                        alt={session.user.name || "User"}
                      />
                      <AvatarFallback className="bg-cyan-600 font-semibold text-white">
                        {getInitials(session.user.name || "User")}
                      </AvatarFallback>
                    </Avatar>
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
                      >
                        <div className="border-b border-neutral-200 p-4 dark:border-neutral-800">
                          <p className="truncate text-sm font-medium text-neutral-900 dark:text-white">
                            {session.user.name}
                          </p>
                          <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                            {session.user.email}
                          </p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 px-4 py-3 text-left text-red-500 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          <IconLogout size={16} />
                          <span className="text-sm font-medium">Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-neutral-500 transition-colors duration-300 hover:text-neutral-900 dark:hover:text-white"
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
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-neutral-200/20 bg-white/10 backdrop-blur-xl transition-colors duration-300 md:hidden dark:border-neutral-800/20 dark:bg-black/10"
          >
            <div className="space-y-2 px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2.5 text-base font-medium ${
                    item.label === "Wall"
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-neutral-200/30 pt-4 dark:border-neutral-800/30">
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
      </header>

      {/* Content Section */}
      <DotBackground className="min-h-screen pt-24">
        <div className="mx-auto mb-8 max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-4 py-2 text-neutral-600 transition-all duration-300 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <IconArrowLeft size={16} />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
        <FeedbackWall />
      </DotBackground>
    </main>
  );
}
