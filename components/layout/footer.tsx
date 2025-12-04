import React from "react";
import {
  IconBrandGithub,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandX,
} from "@tabler/icons-react";
import { LinkPreview } from "@/components/ui/media/link-preview";

export function Footer() {
  return (
    <div className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Brand Text */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-base text-neutral-400">
            📍 Based in Iloilo City, Philippines
          </span>
        </div>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-4">
          <LinkPreview
            url="https://github.com/CJBLACK24"
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all group"
          >
            <IconBrandGithub
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </LinkPreview>
          <LinkPreview
            url="https://www.facebook.com/ChrisNoLimit1124"
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-[#1877F2] hover:border-[#1877F2]/50 transition-all group"
          >
            <IconBrandFacebook
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </LinkPreview>
          <LinkPreview
            url="https://www.instagram.com/cjblack_24/"
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-[#E4405F] hover:border-[#E4405F]/50 transition-all group"
          >
            <IconBrandInstagram
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </LinkPreview>
          <LinkPreview
            url="https://www.linkedin.com/in/cj-black-a5b110335"
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 transition-all group"
          >
            <IconBrandLinkedin
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </LinkPreview>
          <LinkPreview
            url="https://x.com/JohnCjblack"
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all group"
          >
            <IconBrandX
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </LinkPreview>
        </div>

        {/* Right: Copyright */}
        <div className="text-neutral-400 text-base">
          &copy; {new Date().getFullYear()} CJBLACK. All rights reserved.
        </div>
      </div>
    </div>
  );
}
