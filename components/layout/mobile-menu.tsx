"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconX,
  IconDownload,
  IconBrandX,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconArrowLeft,
  IconEye,
} from "@tabler/icons-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/primitives/drawer";
import { CVPreviewModal } from "@/components/modals/cv-preview-modal";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Projects", link: "/#projects" },
    { name: "Technologies", link: "/#technologies" },
    { name: "Contact", link: "/#contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: string,
  ) => {
    const isHashLink = link.includes("#");

    if (pathname === "/" && isHashLink) {
      e.preventDefault();
      setOpen(false);
      const targetId = link.split("#")[1];
      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      setOpen(false);
    }
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
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
            <path
              d="M4 6H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 12H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 18H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </DrawerTrigger>
      <DrawerContent
        className="border-l border-white/10 w-full! md:w-[450px]! h-full shadow-2xl"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(24px)",
        }}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
        <div className="flex flex-col h-full p-6 relative overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-10 pt-2">
            <div className="flex items-center gap-3">
              <IconArrowLeft className="w-5 h-5 text-white/70" />
              <span
                className="text-2xl font-bold text-white font-sports tracking-tighter"
                style={{ fontSize: "24px" }}
              >
                CJBLACK
              </span>
            </div>

            <DrawerClose asChild>
              <button
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                aria-label="Close menu"
              >
                <IconX className="w-8 h-8" />
              </button>
            </DrawerClose>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-8 mb-auto mt-4 px-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.link ||
                (item.link !== "/" && pathname.startsWith(item.link));
              const href =
                item.link.startsWith("#") && pathname !== "/"
                  ? `/${item.link}`
                  : item.link;

              return (
                <Link
                  key={item.name}
                  href={href}
                  onClick={(e) => handleNavClick(e, item.link)}
                  className={`text-xl transition-colors duration-200 ${
                    isActive
                      ? "text-white font-bold"
                      : "text-neutral-500 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer Area */}
          <div className="mt-12">
            <div className="h-px bg-white/5 mb-8 w-full" />

            {/* Social Icons row */}
            <div className="flex items-center gap-3 mb-8">
              {[
                { icon: IconBrandX, href: "https://x.com/JohnCjblack" },
                { icon: IconBrandGithub, href: "https://github.com/CJBLACK24" },
                {
                  icon: IconBrandLinkedin,
                  href: "https://www.linkedin.com/in/cj-black-a5b110335",
                },
                {
                  icon: IconBrandFacebook,
                  href: "https://www.facebook.com/ChrisNoLimit1124",
                },
                {
                  icon: IconBrandInstagram,
                  href: "https://www.instagram.com/cjblack_24/",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-neutral-900/50 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all border border-white/5"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-2">
              <button
                onClick={() => setIsCVModalOpen(true)}
                className="flex items-center justify-center gap-2 py-4 rounded-xl font-bold bg-white/5 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 transition-all"
              >
                <IconEye className="w-5 h-5" />
                View CV
              </button>
              <a
                href="/CV/cjblack_resume.pdf"
                download="CJBLACK_Resume.pdf"
                className="flex items-center justify-center gap-2 py-4 rounded-xl font-bold bg-white text-black hover:bg-neutral-200 transition-all shadow-lg"
              >
                <IconDownload className="w-5 h-5" />
                Download CV
              </a>
            </div>
          </div>
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
