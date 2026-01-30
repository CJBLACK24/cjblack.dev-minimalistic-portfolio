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
    <main className="min-h-screen w-full overflow-x-hidden transition-colors duration-300 bg-white dark:bg-black">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-colors duration-300 border-neutral-200 dark:border-neutral-800/60 bg-white/80 dark:bg-black/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center group">
              <span className="text-2xl font-bold tracking-wider text-neutral-900 dark:text-white font-sports">
                CJBLACK
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-300 relative group ${
                    item.label === "Wall"
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
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
                    className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-full transition-colors cursor-pointer"
                    aria-label="User menu"
                  >
                    <Avatar className="w-8 h-8 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500 transition-colors text-xs">
                      <AvatarImage
                        src={session.user.image || ""}
                        alt={session.user.name || "User"}
                      />
                      <AvatarFallback className="bg-cyan-600 text-white font-semibold">
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
                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg overflow-hidden z-50"
                      >
                        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                          <p className="text-neutral-900 dark:text-white font-medium text-sm truncate">
                            {session.user.name}
                          </p>
                          <p className="text-neutral-500 dark:text-neutral-400 text-xs truncate">
                            {session.user.email}
                          </p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-3 text-left text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-2"
                        >
                          <IconLogout size={16} />
                          <span className="text-sm font-medium">Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300"
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
            className="md:hidden border-t border-neutral-200 dark:border-neutral-800/60 bg-white dark:bg-black"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2.5 text-base font-medium ${
                    item.label === "Wall"
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800/60">
                <div className="flex items-center gap-2">
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
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Content Section */}
      <DotBackground className="pt-24 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all duration-300"
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
