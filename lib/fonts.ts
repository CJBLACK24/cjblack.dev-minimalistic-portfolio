import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const sfSportsNight = localFont({
  src: "../public/fonts/sf-sports-night.regular.ttf",
  variable: "--font-sports",
  display: "swap",
});
