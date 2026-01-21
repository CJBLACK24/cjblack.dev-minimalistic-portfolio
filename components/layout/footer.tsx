import React from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";

const socialLinks = [
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
  { href: "https://x.com/JohnCjblack", icon: IconBrandX, label: "X" },
];

export function Footer() {
  return (
    <footer className="w-full py-8 border-t border-neutral-200 dark:border-white/5 bg-neutral-50 dark:bg-black/40 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        {/* Left: Branding & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-sm font-bold text-neutral-900 dark:text-white tracking-tighter">
            CJBLACK
          </p>
          <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium tracking-wide">
            © {new Date().getFullYear()} • Minimalist Developer Portfolio
          </p>
        </div>

        {/* Right: Social Links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2 rounded-xl transition-all duration-300 text-neutral-500 hover:text-cyan-500 dark:hover:text-cyan-400"
              aria-label={social.label}
            >
              <social.icon
                size={20}
                strokeWidth={1.5}
                className="group-hover:scale-110 transition-transform"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
