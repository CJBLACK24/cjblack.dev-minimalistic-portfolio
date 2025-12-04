"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/primitives/alert-dialog";
import { Spotlight } from "@/components/ui/backgrounds/spotlight";
import { IconMail, IconCheck, IconX, IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({
    title: "",
    description: "",
  });

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      const { error } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: "/reset-password",
      });

      if (!error) {
        setDialogMessage({
          title: "Email Sent! 📧",
          description:
            "If an account exists with this email, you will receive a password reset link shortly. Please check your inbox and spam folder.",
        });
        setSuccessDialog(true);
        form.reset();
      } else {
        console.error("Forgot password API error:", error);
        setDialogMessage({
          title: "Request Failed",
          description: error.message || "Failed to send reset email.",
        });
        setErrorDialog(true);
      }
    } catch (error) {
      console.error("Forgot password unexpected error:", error);
      setDialogMessage({
        title: "Request Failed",
        description: "An unexpected error occurred. Please try again later.",
      });
      setErrorDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Spotlight Effect */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="cyan" />

      <div className="w-full max-w-md p-4 relative z-10">
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm p-8">
          <div className="mb-8">
            <Link
              href="/sign-up?tab=signin"
              className="text-xs text-gray-500 hover:text-cyan-400 transition-colors inline-flex items-center gap-2 group"
            >
              <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Sign In
            </Link>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#333] mb-4 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <IconMail className="w-6 h-6 text-cyan-500" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Forgot Password?
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>
          </div>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-gray-300 ml-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...form.register("email")}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                placeholder="name@example.com"
              />
              {form.formState.errors.email && (
                <p className="text-red-400 text-xs ml-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending Link...</span>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-8">
            Secured by{" "}
            <span className="text-cyan-900 font-medium">better-auth</span>
          </p>
        </div>
      </div>

      {/* Success Dialog */}
      <AlertDialog open={successDialog} onOpenChange={setSuccessDialog}>
        <AlertDialogContent className="bg-[#121212] border border-[#2a2a2a]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-xl flex items-center gap-2">
              <IconCheck className="text-green-500" /> {dialogMessage.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {dialogMessage.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setSuccessDialog(false);
                router.push("/sign-up?tab=signin");
              }}
              className="bg-cyan-600 text-white hover:bg-cyan-500"
            >
              Back to Sign In
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Error Dialog */}
      <AlertDialog open={errorDialog} onOpenChange={setErrorDialog}>
        <AlertDialogContent className="bg-[#121212] border border-[#2a2a2a]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-xl flex items-center gap-2">
              <IconX className="text-red-500" /> {dialogMessage.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {dialogMessage.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setErrorDialog(false)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Try Again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
