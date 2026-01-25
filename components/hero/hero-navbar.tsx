"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { IconLogout } from "@tabler/icons-react";
import { useSession, signOut } from "@/lib/auth-client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/primitives/avatar";

import { MobileMenu } from "@/components/layout/mobile-menu";

const navItems = [
  { name: "About", link: "/about" },
  { name: "Projects", link: "/#projects" },
  { name: "Technologies", link: "/#technologies" },
  { name: "Contact", link: "/#contact" },
];

export const HeroNavbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await signOut();
    setShowUserMenu(false);
    router.refresh();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="flex items-center justify-between py-4 w-full relative z-50">
      {/* Logo Branding */}
      <div className="flex items-center">
        <Link
          href="/"
          className="text-2xl font-bold tracking-wider flex items-center group text-neutral-500 dark:text-white font-sports"
          aria-label="CJ Black Logo"
        >
          <span>CJBLACK</span>
        </Link>
      </div>

      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="text-base font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300 relative group"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu or Avatar */}
        <div className="flex items-center">
          {!isPending && session?.user ? (
            // Show avatar when logged in (visible on both mobile and desktop)
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-1 hover:bg-neutral-900 rounded-full transition-colors cursor-pointer"
                aria-label="User menu"
              >
                <Avatar className="w-10 h-10 border-2 border-neutral-800 hover:border-cyan-500 transition-colors">
                  <AvatarImage
                    src={session.user.image || ""}
                    alt={session.user.name || "User"}
                  />
                  <AvatarFallback className="bg-cyan-600 text-white font-semibold">
                    {getInitials(session.user.name || "User")}
                  </AvatarFallback>
                </Avatar>
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-neutral-800">
                      <p className="text-white font-medium text-sm truncate">
                        {session.user.name}
                      </p>
                      <p className="text-neutral-400 text-xs truncate">
                        {session.user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-red-400 hover:bg-neutral-800 transition-colors flex items-center gap-2"
                    >
                      <IconLogout size={18} />
                      <span className="text-sm">Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            // Show mobile menu only on small screens
            <div className="md:hidden">
              <MobileMenu />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
