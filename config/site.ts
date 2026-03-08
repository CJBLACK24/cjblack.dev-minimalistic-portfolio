/**
 * config/site.ts — Single source of truth for site-wide metadata.
 *
 * Import this anywhere instead of duplicating strings across layout.tsx,
 * constants/index.tsx, and component files.
 */

export const siteConfig = {
  name: "CJ Black",
  fullName: "Christian John Duque",
  handle: "cjblack_24",
  url: "https://cjblack.dev",
  description:
    "Minimalistic modern portfolio of a passionate Full Stack Developer building digital experiences.",
  longDescription:
    "Portfolio of Christian John Duque (CJ Black), a Full Stack Developer based in Iloilo City, Philippines. Specializing in Next.js, React, and modern web technologies.",
  location: {
    city: "Iloilo City",
    country: "Philippines",
    country_code: "PH",
  },
  links: {
    github: "https://github.com/cjblack24",
    twitter: "https://twitter.com/cjblack_24",
    linkedin: "https://linkedin.com/in/cjblack",
    email: "hello@cjblack.dev",
  },
  og: {
    image: "/og-image.png",
    width: 1200,
    height: 630,
  },
} as const;

export type SiteConfig = typeof siteConfig;
