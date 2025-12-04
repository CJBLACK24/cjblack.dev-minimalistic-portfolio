"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconHome,
  IconCode,
  IconMail,
  IconX,
  IconLayoutSidebar,
  IconDownload,
} from "@tabler/icons-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/primitives/drawer";
import { CVPreviewModal } from "@/components/modals/cv-preview-modal";
import confetti from "canvas-confetti";

interface NavItem {
  name: string;
  link: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: "Home", link: "#home", icon: IconHome },
  { name: "Technologies", link: "#technologies", icon: IconCode },
  { name: "Contact", link: "#contact", icon: IconMail },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const pathname = usePathname();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    // If we are on the home page, we handle smooth scrolling manually
    if (pathname === "/") {
      e.preventDefault();
      setOpen(false);
      setTimeout(() => {
        if (link === "#home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const targetId = link.replace("#", "");
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
            });
          }
        }
      }, 400);
    } else {
      // If we are NOT on the home page, we let Next.js Link handle navigation
      // But we need to ensure we close the drawer
      setOpen(false);
      // We don't prevent default, so it navigates to href
    }
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <div className="p-2 hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer">
          <IconLayoutSidebar className="w-6 h-6 text-white" />
        </div>
      </DrawerTrigger>
      <DrawerContent
        className="bg-black border-l border-neutral-800 w-screen! max-w-none! h-full"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
        <div className="flex flex-col h-full p-6">
          <motion.div
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <button
              onClick={(e) => {
                setIsCVModalOpen(true);
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: {
                    x: e.clientX / window.innerWidth,
                    y: e.clientY / window.innerHeight,
                  },
                  colors: ["#06b6d4", "#3b82f6", "#ffffff"],
                });
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all"
            >
              <IconDownload className="w-4 h-4" />
              Download CV
            </button>
            <DrawerClose>
              <div className="p-2 hover:bg-neutral-900 rounded-full transition-colors">
                <IconX className="w-6 h-6 text-white" />
              </div>
            </DrawerClose>
          </motion.div>
          <nav className="flex flex-col gap-3">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              // Construct absolute href if it's a hash link
              const href = item.link.startsWith("#")
                ? `/${item.link}`
                : item.link;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={href}
                    onClick={(e) => handleNavClick(e, item.link)}
                    className="flex items-center justify-between p-4 rounded-xl border border-neutral-800 hover:bg-neutral-900 transition-colors group"
                  >
                    <span className="text-lg font-medium text-neutral-300 group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                    <Icon className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>

        <CVPreviewModal
          isOpen={isCVModalOpen}
          onClose={() => setIsCVModalOpen(false)}
          cvUrl="/CV/cjblack_resume.pdf"
        />
      </DrawerContent>
    </Drawer>
  );
}
