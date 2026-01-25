"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  IconLogout,
  IconMenu2,
  IconX,
  IconBrandX,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconEye,
  IconDownload,
  IconHome,
  IconUserCircle,
  IconBriefcase,
  IconCpu,
  IconMessage2,
} from "@tabler/icons-react";
import { useSession, signOut } from "@/lib/auth-client";
import confetti from "canvas-confetti";
import { Spotlight } from "@/components/ui/backgrounds/spotlight-new";
import { CVPreviewModal } from "@/components/modals/cv-preview-modal";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/primitives/avatar";

const navItems = [
  { name: "Home", link: "/", icon: IconHome },
  { name: "About", link: "/about", icon: IconUserCircle },
  { name: "Projects", link: "/#projects", icon: IconBriefcase },
  { name: "Technologies", link: "/#technologies", icon: IconCpu },
  { name: "Contact", link: "/#contact", icon: IconMessage2 },
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
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
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
          className="text-2xl font-bold tracking-normal flex items-center group text-neutral-500 dark:text-white font-sports"
          aria-label="CJ Black Logo"
        >
          <span className="tracking-[0.05em]">CJBLACK</span>
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

        {/* Mobile Menu Button + Avatar Group */}
        <div className="flex items-center gap-4">
          {!isPending && session?.user && (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
                aria-label="User menu"
              >
                <Avatar className="w-9 h-9 border-2 border-neutral-200 dark:border-neutral-800 hover:border-cyan-500 transition-colors">
                  <AvatarImage
                    src={session.user.image || ""}
                    alt={session.user.name || "User"}
                  />
                  <AvatarFallback className="bg-cyan-600 text-white font-semibold text-xs">
                    {getInitials(session.user.name || "User")}
                  </AvatarFallback>
                </Avatar>
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl overflow-hidden z-50 p-1"
                  >
                    <div className="p-3 border-b border-neutral-100 dark:border-neutral-800 mb-1">
                      <p className="text-neutral-900 dark:text-white font-semibold text-sm truncate">
                        {session.user.name}
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-400 text-xs truncate">
                        {session.user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-3 py-2.5 text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <IconLogout size={18} />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <IconX size={26} /> : <IconMenu2 size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden absolute top-full left-[-16px] right-[-16px] mt-2 z-100 border-y border-neutral-200 dark:border-neutral-800/60 bg-white/90 dark:bg-black/95 backdrop-blur-2xl shadow-2xl overflow-hidden min-h-[500px]"
          >
            {/* Spotlight effect inside menu */}
            <Spotlight className="-top-20 left-0 opacity-50 dark:opacity-40" />

            <div className="p-6 relative z-10 space-y-2">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-4 px-4 text-xl font-bold text-neutral-800 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 rounded-2xl transition-all group"
                  >
                    <span>{item.name}</span>
                    <item.icon
                      size={22}
                      className="text-neutral-400 group-hover:text-cyan-500 transition-colors"
                    />
                  </Link>
                ))}
              </nav>

              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800/60 mt-4">
                {/* Social Links Row */}
                <div className="flex flex-wrap items-center gap-2 mb-8 px-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center bg-neutral-100/50 dark:bg-white/5 rounded-2xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white border border-transparent hover:border-neutral-200 dark:hover:border-white/10 transition-all shadow-sm"
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>

                {/* CV Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                  <a
                    href="/CV/cjblack_resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-base bg-neutral-100/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 backdrop-blur-md text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-white/10 transition-all"
                  >
                    <IconEye size={22} />
                    <span>View CV</span>
                  </a>
                  <a
                    href="/CV/cjblack_resume.pdf"
                    download="CJBLACK_Resume.pdf"
                    onClick={() => {
                      confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.8 },
                      });
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-base bg-black dark:bg-white text-white dark:text-black hover:opacity-90 shadow-xl transition-all"
                  >
                    <IconDownload size={22} />
                    <span>Download CV</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CVPreviewModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        cvUrl="/CV/cjblack_resume.pdf"
      />
    </header>
  );
};
