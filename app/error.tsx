"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/primitives/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <div className="relative">
        <div className="absolute -inset-4 bg-cyan-500/20 blur-2xl rounded-full" />
        <h2 className="relative text-4xl md:text-5xl font-bold mb-4 bg-linear-to-b from-white to-neutral-500 bg-clip-text text-transparent">
          Something went wrong!
        </h2>
      </div>
      <p className="text-neutral-400 mb-8 max-w-md text-center text-lg">
        We apologize for the inconvenience. An unexpected error occurred in the
        application.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => reset()}
          className="bg-white text-black hover:bg-neutral-200 px-8 py-6 text-lg font-semibold transition-all hover:scale-105 active:scale-95"
        >
          Try again
        </Button>
        <Button
          onClick={() => (window.location.href = "/")}
          variant="outline"
          className="border-neutral-700 text-white hover:bg-neutral-800 px-8 py-6 text-lg transition-all"
        >
          Go Home
        </Button>
      </div>
      <div className="mt-12 text-neutral-600 text-sm">
        Error ID: {error.digest || "N/A"}
      </div>
    </div>
  );
}
