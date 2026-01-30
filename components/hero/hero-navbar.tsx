"use client";

import Link from "next/link";
import { MobileMenu } from "@/components/layout/mobile-menu";

const navItems = [
  { name: "About", link: "/about" },
  { name: "Wall", link: "/wall" },
  { name: "Projects", link: "/#projects" },
  { name: "Technologies", link: "/#technologies" },
  { name: "Contact", link: "/#contact" },
];

export const HeroNavbar = () => {
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

        {/* Mobile Menu only (Avatar removed from here as per request) */}
        <div className="flex items-center">
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
