/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import {
  IconLock,
  IconCheck,
  IconX,
  IconArrowLeft,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import Link from "next/link";
import { resetPassword } from "@/lib/auth-client";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({
    title: "",
    description: "",
  });

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  // No need for manual token validation - better-auth handles this
  useEffect(() => {
    // Just check if token exists
    if (!token) {
      setDialogMessage({
        title: "Invalid Link",
        description: "This password reset link is invalid or incomplete.",
      });
      setErrorDialog(true);
      setIsValidToken(false);
    } else {
      setIsValidToken(true);
    }
    setIsValidating(false);
  }, [token]);

  const handleSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    if (!token) return;

    try {
      console.log("Resetting password with token:", token);
      const result = await resetPassword({
        newPassword: data.password,
        token,
      });

      if (result.error) {
        console.error("Reset password API error:", result.error);
        setDialogMessage({
          title: "Reset Failed",
          description:
            result.error.message ||
            "Failed to reset password. Please try again.",
        });
        setErrorDialog(true);
      } else {
        setDialogMessage({
          title: "Password Reset Successful! 🎉",
          description:
            "Your password has been successfully reset. You can now sign in with your new password.",
        });
        setSuccessDialog(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Reset password unexpected error:", error);
      setDialogMessage({
        title: "Reset Failed",
        description: "An unexpected error occurred. Please try again later.",
      });
      setErrorDialog(true);
      setIsLoading(false);
    }
  };

  if (isValidating) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cyan-500 border-r-transparent mb-4"></div>
          <p className="text-gray-400 text-sm">Validating reset link...</p>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="red"
        />
        <div className="w-full max-w-md p-4 relative z-10">
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/20 border border-red-900/50 mb-6">
              <IconX className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Invalid Reset Link
            </h1>
            <p className="text-gray-400 mb-8 text-sm">
              This password reset link is invalid or has expired. Please request
              a new one.
            </p>
            <Link
              href="/forgot-password"
              className="inline-flex items-center justify-center w-full py-3 px-4 bg-white hover:bg-gray-100 text-black font-semibold rounded-lg transition-all duration-200"
            >
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              <IconLock className="w-6 h-6 text-cyan-500" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Reset Password
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Enter your new password below
            </p>
            {email && (
              <p className="text-xs text-cyan-500/70 mt-2 font-mono">{email}</p>
            )}
          </div>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-medium text-gray-300 ml-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...form.register("password")}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all pr-10"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <IconEyeOff size={18} />
                  ) : (
                    <IconEye size={18} />
                  )}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-red-400 text-xs ml-1">
                  {form.formState.errors.password.message}
                </p>
              )}
              <p className="text-gray-600 text-[10px] ml-1">
                Must be at least 8 characters with letters and numbers
              </p>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-xs font-medium text-gray-300 ml-1"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...form.register("confirmPassword")}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all pr-10"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showConfirmPassword ? (
                    <IconEyeOff size={18} />
                  ) : (
                    <IconEye size={18} />
                  )}
                </button>
              </div>
              {form.formState.errors.confirmPassword && (
                <p className="text-red-400 text-xs ml-1">
                  {form.formState.errors.confirmPassword.message}
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
                  <span>Resetting Password...</span>
                </div>
              ) : (
                "Reset Password"
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
              className="bg-white text-black hover:bg-gray-200"
            >
              Go to Sign In
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
              onClick={() => {
                setErrorDialog(false);
                if (!isValidToken) {
                  router.push("/forgot-password");
                }
              }}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isValidToken ? "Try Again" : "Request New Link"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
