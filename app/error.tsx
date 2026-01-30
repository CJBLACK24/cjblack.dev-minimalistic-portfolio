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
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-white">
      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-cyan-500/20 blur-2xl" />
        <h2 className="relative mb-4 bg-linear-to-b from-white to-neutral-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
          Something went wrong!
        </h2>
      </div>
      <p className="mb-8 max-w-md text-center text-lg text-neutral-400">
        We apologize for the inconvenience. An unexpected error occurred in the
        application.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          onClick={() => reset()}
          className="bg-white px-8 py-6 text-lg font-semibold text-black transition-all hover:scale-105 hover:bg-neutral-200 active:scale-95"
        >
          Try again
        </Button>
        <Button
          onClick={() => (window.location.href = "/")}
          variant="outline"
          className="border-neutral-700 px-8 py-6 text-lg text-white transition-all hover:bg-neutral-800"
        >
          Go Home
        </Button>
      </div>
      <div className="mt-12 text-sm text-neutral-600">
        Error ID: {error.digest || "N/A"}
      </div>
    </div>
  );
}
