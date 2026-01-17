import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScroll } from "@/components/ui/effects/smooth-scroll";
import { WebVitalsReporter } from "@/components/layout/web-vitals";

export const metadata: Metadata = {
  metadataBase: new URL("https://cjblack.dev"),
  title: {
    default: "cjblack.dev",
    template: "%s | CJ Black",
  },
  description:
    "Portfolio of Christian John Duque (CJ Black), a Full Stack Developer based in Iloilo City, Philippines. Specializing in Next.js, React, and modern web technologies.",
  keywords: [
    "CJ Black",
    "Christian John Duque",
    "Full Stack Developer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "Iloilo Developer",
    "Philippines",
    "Portfolio",
  ],
  authors: [{ name: "Christian John Duque", url: "https://cjblack.dev" }],
  creator: "Christian John Duque",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cjblack.dev",
    title: "cjblack.dev",
    description:
      "Minimalistic modern portfolio of a passionate Full Stack Developer building digital experiences.",
    siteName: "CJ Black Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CJ Black Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CJ Black | Full Stack Developer",
    description:
      "Minimalistic modern portfolio of a passionate Full Stack Developer building digital experiences.",
    creator: "@cjblack_24",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head />
      <body className={inter.className}>
        <WebVitalsReporter />
        <SmoothScroll>{children}</SmoothScroll>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
