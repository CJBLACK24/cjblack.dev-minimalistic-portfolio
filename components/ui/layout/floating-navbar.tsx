/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSession, signOut } from "@/lib/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/primitives/avatar";
import { IconLogout } from "@tabler/icons-react";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious();
      const direction =
        previous !== null && previous !== undefined ? current - previous : 0;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    // If we are on the home page, we can just scroll smoothly
    if (pathname === "/") {
      e.preventDefault();
      if (link === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const targetId = link.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // If we are NOT on the home page, we need to navigate to the home page first
      // The Link component will handle the navigation, but we might want to ensure
      // the hash is correct.
      // e.g. if link is "#technologies", we want to go to "/#technologies"
      // We don't prevent default here, letting Next.js Link handle the routing
      // But we ensure the href in the Link component is absolute
    }
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.reload();
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/20 rounded-full dark:bg-black bg-white shadow-input z-50 pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem, idx: number) => {
          // Ensure link is absolute if it's a hash
          const href = navItem.link.startsWith("#")
            ? `/${navItem.link}`
            : navItem.link;

          return (
            <Link
              key={`link=${idx}`}
              href={href}
              onClick={(e) => handleNavClick(e, navItem.link)}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-cyan-400 hover:text-cyan-500 transition-colors"
              )}
              aria-label={`Navigate to ${navItem.name}`}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </Link>
          );
        })}
        <Link
          href="/#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className="border text-sm font-medium relative border-neutral-200 dark:border-white/20 text-black dark:text-white px-4 py-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          aria-label="Navigate to Contact section"
        >
          <span>Contact</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-linear-to-r from-transparent via-cyan-500 to-transparent h-px" />
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};
