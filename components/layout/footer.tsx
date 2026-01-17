import React from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";

const socialLinks = [
  { href: "https://github.com/CJBLACK24", icon: IconBrandGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/cj-black-a5b110335", icon: IconBrandLinkedin, label: "LinkedIn" },
  { href: "https://x.com/JohnCjblack", icon: IconBrandX, label: "X" },
];

export function Footer() {
  return (
    <footer className="w-full py-10 md:py-12 border-t transition-colors duration-300 border-neutral-200 dark:border-neutral-800/60">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Location */}
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500">
          📍 Iloilo City
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-0.5">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg transition-all duration-300 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
              aria-label={social.label}
            >
              <social.icon size={18} strokeWidth={1.5} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500">
          © {new Date().getFullYear()} CJBLACK
        </p>
      </div>
    </footer>
  );
}
