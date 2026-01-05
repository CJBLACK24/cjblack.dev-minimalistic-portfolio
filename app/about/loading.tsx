"use client";

import { Skeleton, SkeletonText } from "@/components/ui/primitives/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-[#020013] overflow-x-hidden flex items-center justify-center relative">
      {/* Skeleton for Vertical Navbar */}
      <div className="fixed left-0 top-0 h-screen w-10 sm:w-12 md:w-14 lg:w-16 hidden sm:flex flex-col items-center z-50 bg-[#090b1d] border-r border-white/5">
        <Skeleton className="mt-6 mb-8 w-8 h-8 rounded-none" />
        <div className="flex flex-col gap-8 mt-10">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="w-1 h-20 rounded-full" />
          ))}
        </div>
      </div>

      {/* Skeleton for Top Right Actions */}
      <div className="fixed top-6 right-8 z-50 hidden sm:flex items-center gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="w-10 h-10 rounded-lg" />
        ))}
        <Skeleton className="w-32 h-10 rounded-lg" />
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-6xl w-full flex flex-col gap-12 relative z-10 px-4 sm:pl-16 md:pl-20 lg:pl-24 sm:pr-6 md:pr-10 lg:pr-16 pt-10 pb-12">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-2/3 md:w-1/2" />
          <Skeleton className="h-10 w-1/2 md:w-1/3 text-[#2FA4FF]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left Side: Image Skeleton */}
          <div className="relative w-full aspect-square max-h-[420px] rounded-2xl overflow-hidden border border-white/10">
            <Skeleton className="w-full h-full" />
          </div>

          {/* Right Side: Text Content Skeleton */}
          <div className="flex flex-col gap-6">
            <SkeletonText lines={4} />
            <div className="h-4" /> {/* spacer */}
            <SkeletonText lines={5} />
            <div className="h-4" /> {/* spacer */}
            <SkeletonText lines={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
