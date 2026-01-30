"use client";

import { motion } from "motion/react";
import { Skeleton, SkeletonCard } from "@/components/ui/primitives/skeleton";

export default function Loading() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <motion.div
        key="skeleton"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        {/* Nav Skeleton */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6">
          <Skeleton className="h-8 w-24" />
          <div className="hidden gap-8 md:flex">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>

        {/* Hero Section Skeleton */}
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            {/* Image Skeleton */}
            <div className="flex justify-center md:justify-end">
              <Skeleton className="h-[480px] w-full max-w-[380px] rounded-2xl" />
            </div>

            {/* Content Skeleton */}
            <div className="flex flex-col items-center space-y-6 md:items-start">
              <Skeleton className="h-8 w-48 rounded-full" />
              <div className="w-full max-w-lg space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-3/4" />
              </div>
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-40 rounded-lg" />
                <Skeleton className="h-12 w-40 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section Skeleton */}
        <div className="mx-auto mt-20 max-w-7xl px-4 py-20">
          <Skeleton className="mx-auto mb-12 h-10 w-48" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
