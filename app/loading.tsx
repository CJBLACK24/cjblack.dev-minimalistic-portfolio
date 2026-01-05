"use client";

import { motion } from "motion/react";
import { Skeleton, SkeletonCard } from "@/components/ui/primitives/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <motion.div
        key="skeleton"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        {/* Nav Skeleton */}
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <Skeleton className="h-8 w-24" />
          <div className="hidden md:flex gap-8">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>

        {/* Hero Section Skeleton */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Image Skeleton */}
            <div className="flex justify-center md:justify-end">
              <Skeleton className="w-full max-w-[380px] h-[480px] rounded-2xl" />
            </div>

            {/* Content Skeleton */}
            <div className="flex flex-col items-center md:items-start space-y-6">
              <Skeleton className="h-8 w-48 rounded-full" />
              <div className="space-y-4 w-full max-w-lg">
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
        <div className="max-w-7xl mx-auto px-4 py-20 mt-20">
          <Skeleton className="h-10 w-48 mb-12 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
