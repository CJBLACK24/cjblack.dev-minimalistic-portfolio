"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconCode,
  IconMail,
  IconX,
  IconMenu2,
  IconDownload,
  IconBrandX,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconUser,
  IconCpu,
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

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const pathname = usePathname();

  const fullNavItems = [
    { name: "About", link: "/about", icon: IconUser },
    { name: "Projects", link: "/#projects", icon: IconCode },
    { name: "Technologies", link: "/#technologies", icon: IconCpu },
    { name: "Contact", link: "/#contact", icon: IconMail },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: string,
  ) => {
    const isHashLink = link.includes("#");

    if (pathname === "/" && isHashLink) {
      e.preventDefault();
      setOpen(false);
      setTimeout(() => {
        const targetId = link.split("#")[1];
        if (targetId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 400); // Wait for drawer to close
    } else {
      setOpen(false);
    }
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(true)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white flex items-center justify-center"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M4 6H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={false}
              animate={open ? { d: "M6 18L18 6" } : { d: "M4 6H20" }}
              transition={{ duration: 0.3 }}
            />
            <motion.path
              d="M4 12H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={false}
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.path
              d="M4 18H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={false}
              animate={open ? { d: "M6 6L18 18" } : { d: "M4 18H20" }}
              transition={{ duration: 0.3 }}
            />
          </svg>
        </motion.button>
      </DrawerTrigger>
      <DrawerContent
        className="border-l border-white/10 w-full! md:w-[500px]! h-full"
        style={{ backgroundColor: "#020013" }}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
        <div className="flex flex-col h-full p-6 relative overflow-y-auto">
          {/* Header with CV Button and Close Icon */}
          <div className="flex justify-between items-center mb-10">
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => {
                setIsCVModalOpen(true);
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: {
                    x: e.clientX / window.innerWidth,
                    y: e.clientY / window.innerHeight,
                  },
                  colors: ["#2FA4FF", "#020013", "#ffffff"],
                });
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-blue-500/20"
              style={{ backgroundColor: "#2FA4FF", color: "#020013" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconDownload className="w-4 h-4" />
              Download CV
            </motion.button>

            <DrawerClose asChild>
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.1 }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
              >
                <IconX className="w-8 h-8" />
              </motion.button>
            </DrawerClose>
          </div>

          {/* Navigation Links */}
          <motion.nav
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4 mb-auto will-change-transform"
          >
            {fullNavItems.map((item) => {
              const Icon = item.icon;
              const href = item.link.startsWith("#")
                ? `/${item.link}`
                : item.link;

              return (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  className="will-change-transform"
                >
                  <Link
                    href={href}
                    onClick={(e) => handleNavClick(e, item.link)}
                    className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group active:scale-95"
                  >
                    <span className="text-lg font-medium text-white/80 group-hover:text-white">
                      {item.name}
                    </span>
                    <Icon className="w-5 h-5 text-white/50 group-hover:text-[#2FA4FF] transition-colors" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Social Icons Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 pt-8 border-t border-white/10"
          >
            <p className="text-white/40 text-sm font-medium mb-4 uppercase tracking-wider">
              Connect with me
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              {[
                {
                  icon: IconBrandX,
                  href: "https://x.com/JohnCjblack",
                  color: "hover:text-[#2FA4FF]",
                },
                {
                  icon: IconBrandGithub,
                  href: "https://github.com/CJBLACK24",
                  color: "hover:text-white",
                },
                {
                  icon: IconBrandLinkedin,
                  href: "https://www.linkedin.com/in/cj-black-a5b110335",
                  color: "hover:text-[#0A66C2]",
                },
                {
                  icon: IconBrandFacebook,
                  href: "https://www.facebook.com/ChrisNoLimit1124",
                  color: "hover:text-[#1877F2]",
                },
                {
                  icon: IconBrandInstagram,
                  href: "https://www.instagram.com/cjblack_24/",
                  color: "hover:text-[#E4405F]",
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-white/5 rounded-lg text-white/60 ${social.color} transition-colors border border-white/5`}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255,255,255,0.1)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
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
