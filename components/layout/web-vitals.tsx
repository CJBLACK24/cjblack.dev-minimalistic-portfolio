"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // Log web vitals in development
    if (process.env.NODE_ENV === "development") {
      console.log({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
      });
    }

    // Send to analytics in production (automatically handled by Vercel Analytics)
    // You can also send to custom analytics services here
    switch (metric.name) {
      case "FCP": // First Contentful Paint
        console.log(`⚡ FCP: ${metric.value}ms`);
        break;
      case "LCP": // Largest Contentful Paint
        console.log(`🎨 LCP: ${metric.value}ms`);
        break;
      case "CLS": // Cumulative Layout Shift
        console.log(`📏 CLS: ${metric.value}`);
        break;
      case "FID": // First Input Delay
        console.log(`⌨️  FID: ${metric.value}ms`);
        break;
      case "TTFB": // Time to First Byte
        console.log(`📡 TTFB: ${metric.value}ms`);
        break;
      case "INP": // Interaction to Next Paint
        console.log(`🖱️  INP: ${metric.value}ms`);
        break;
    }
  });

  return null; // This component doesn't render anything
}
