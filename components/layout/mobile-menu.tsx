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
} from "@tabler/icons-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/primitives/drawer";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
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
          className="flex cursor-pointer items-center justify-center rounded-full p-2 text-white transition-colors hover:bg-white/10"
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
        className="h-full w-full! border-l border-white/10 shadow-2xl md:w-[450px]!"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(20px)",
        }}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
        <div className="relative flex h-full flex-col overflow-y-auto p-6">
          {/* Header */}
          <div className="mb-10 flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <IconArrowLeft className="h-5 w-5 text-white/70" />
              <span
                className="font-sports text-2xl font-bold tracking-wider text-white"
                style={{ fontSize: "24px" }}
              >
                CJBLACK
              </span>
            </div>

            <DrawerClose asChild>
              <button
                className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close menu"
              >
                <IconX className="h-8 w-8" />
              </button>
            </DrawerClose>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 mb-auto flex flex-col gap-8 px-2">
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
                  onClick={(e) => handleNavClick(e, item.name)}
                  className={`text-xl transition-colors duration-200 ${
                    isActive
                      ? "font-sports font-bold tracking-wide text-white"
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
            <div className="mb-8 h-px w-full bg-white/5" />

            {/* Social Icons row */}
            <div className="mb-8 flex items-center gap-3">
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
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-neutral-900/50 text-neutral-400 transition-all hover:bg-neutral-800 hover:text-white"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
