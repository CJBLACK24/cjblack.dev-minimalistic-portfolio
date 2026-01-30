"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to unified auth page with sign-in tab active
    router.replace("/sign-up?tab=signin");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <p className="text-white">Redirecting...</p>
    </div>
  );
}
