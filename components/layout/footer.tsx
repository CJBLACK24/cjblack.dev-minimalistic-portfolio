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
    <footer className="w-full py-10 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Brand Text */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-base text-neutral-400">
            📍 Based in Iloilo City, Philippines
          </span>
        </div>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-4">
          <SocialLinkPreview
            url="https://github.com/CJBLACK24"
            icon={<IconBrandGithub size={20} />}
            label="Visit GitHub Profile"
          />
          <SocialLinkPreview
            url="https://www.facebook.com/ChrisNoLimit1124"
            icon={<IconBrandFacebook size={20} />}
            hoverColor="text-[#1877F2]"
            borderColor="hover:border-[#1877F2]/50"
            label="Visit Facebook Profile"
          />
          <SocialLinkPreview
            url="https://www.instagram.com/cjblack_24/"
            icon={<IconBrandInstagram size={20} />}
            hoverColor="text-[#E4405F]"
            borderColor="hover:border-[#E4405F]/50"
            label="Visit Instagram Profile"
          />
          <SocialLinkPreview
            url="https://www.linkedin.com/in/cj-black-a5b110335"
            icon={<IconBrandLinkedin size={20} />}
            hoverColor="text-[#0A66C2]"
            borderColor="hover:border-[#0A66C2]/50"
            label="Visit LinkedIn Profile"
          />
          <SocialLinkPreview
            url="https://x.com/JohnCjblack"
            icon={<IconBrandX size={20} />}
            label="Visit X Profile"
          />
        </div>

        {/* Right: Copyright */}
        <div className="text-neutral-400 text-base">
          &copy; {new Date().getFullYear()} CJBLACK. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

const SocialLinkPreview = ({
  url,
  icon,
  hoverColor = "text-white",
  borderColor = "hover:border-neutral-700",
  label,
}: {
  url: string;
  icon: React.ReactNode;
  hoverColor?: string;
  borderColor?: string;
  label: string;
}) => (
  <LinkPreview
    url={url}
    className={`flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 ${hoverColor} ${borderColor} transition-all group`}
  >
    <div className="group-hover:scale-110 transition-transform">{icon}</div>
  </LinkPreview>
);
