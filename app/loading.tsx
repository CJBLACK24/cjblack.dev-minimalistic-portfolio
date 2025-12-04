import { Skeleton, SkeletonCard } from "@/components/ui/primitives/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section Skeleton */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Avatar */}
          <Skeleton className="h-32 w-32 rounded-full" />

          {/* Title */}
          <div className="space-y-4 text-center">
            <Skeleton className="h-12 w-96 mx-auto" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>

      {/* Projects Section Skeleton */}
      <div className="container mx-auto px-4 py-20">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>

      {/* Features Section Skeleton */}
      <div className="container mx-auto px-4 py-20">
        <Skeleton className="h-10 w-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </div>
  );
}
