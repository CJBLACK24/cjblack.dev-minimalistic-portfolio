import React from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import { BugReportButton } from "@/components/feedback/BugReportButton";

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
    <footer className="relative w-full overflow-hidden border-t border-neutral-200 bg-neutral-50 py-8 dark:border-white/5 dark:bg-black/40">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 h-px w-full max-w-4xl -translate-x-1/2 bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row md:gap-0 md:px-8">
        {/* Left: Branding & Copyright */}
        <div className="flex flex-col items-center gap-1 md:items-start">
          <p className="text-sm font-bold tracking-wider text-neutral-900 dark:text-white">
            CJBLACK
          </p>
          <p className="text-[10px] font-medium tracking-wide text-neutral-400 dark:text-neutral-500">
            © {new Date().getFullYear()} • Minimalist Developer Portfolio
          </p>
        </div>

        {/* Right: Social Links */}
        <div className="flex items-center gap-6">
          <BugReportButton />
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl p-2 text-neutral-500 transition-all duration-300 hover:text-cyan-500 dark:hover:text-cyan-400"
                aria-label={social.label}
              >
                <social.icon
                  size={20}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:scale-110"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
