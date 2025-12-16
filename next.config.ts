import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "camo.githubusercontent.com",
      },
    ],
    // Optimize images in production, disable in development for faster dev server
    unoptimized: process.env.NODE_ENV === "development",
    // Use modern formats for better compression
    formats: ["image/avif", "image/webp"],
    // Define device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize image quality for faster loading (adjust as needed)
    minimumCacheTTL: 60,
    // Enable SVG optimization
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable compression
  compress: true,
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["@tabler/icons-react", "motion", "three"],
  },
  poweredByHeader: false,
};

export default nextConfig;
