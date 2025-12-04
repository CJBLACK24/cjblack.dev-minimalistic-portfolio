"use client";

import { useState, useEffect } from "react";
import { useSession, changePassword } from "@/lib/auth-client";
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
import {
  IconLock,
  IconCheck,
  IconX,
  IconArrowLeft,
  IconEye,
  IconEyeOff,
  IconLoader2,
} from "@tabler/icons-react";
import Link from "next/link";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({
    title: "",
    description: "",
  });

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-up?tab=signin");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <IconLoader2 className="animate-spin w-8 h-8 text-cyan-500" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleSubmit = async (data: ChangePasswordFormData) => {
    setIsLoading(true);
    try {
      const result = await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        revokeOtherSessions: true,
      });

      if (result.error) {
        console.error("Change password API error:", result.error);
        setDialogMessage({
          title: "Change Failed",
          description:
            result.error.message ||
            "Failed to change password. Please try again.",
        });
        setErrorDialog(true);
      } else {
        setDialogMessage({
          title: "Password Changed Successfully! 🎉",
          description:
            "Your password has been updated. You will remain signed in on this device.",
        });
        setSuccessDialog(true);
        form.reset();
      }
    } catch (error) {
      console.error("Change password unexpected error:", error);
      setDialogMessage({
        title: "Change Failed",
        description: "An unexpected error occurred. Please try again later.",
      });
      setErrorDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden p-4">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="cyan" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm p-8">
          <div className="mb-6">
            <Link
              href="/profile"
              className="text-xs text-gray-500 hover:text-cyan-400 transition-colors inline-flex items-center gap-2 group"
            >
              <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Profile
            </Link>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#333] mb-4 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <IconLock className="w-6 h-6 text-cyan-500" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Change Password
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Update your account password
            </p>
          </div>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="space-y-1.5">
              <label
                htmlFor="currentPassword"
                className="text-xs font-medium text-gray-300 ml-1"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  {...form.register("currentPassword")}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showCurrentPassword ? (
                    <IconEyeOff size={18} />
                  ) : (
                    <IconEye size={18} />
                  )}
                </button>
              </div>
              {form.formState.errors.currentPassword && (
                <p className="text-red-400 text-xs ml-1">
                  {form.formState.errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="newPassword"
                className="text-xs font-medium text-gray-300 ml-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  {...form.register("newPassword")}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all pr-10"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showNewPassword ? (
                    <IconEyeOff size={18} />
                  ) : (
                    <IconEye size={18} />
                  )}
                </button>
              </div>
              {form.formState.errors.newPassword && (
                <p className="text-red-400 text-xs ml-1">
                  {form.formState.errors.newPassword.message}
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
                  <IconLoader2 className="animate-spin w-4 h-4" />
                  <span>Changing Password...</span>
                </div>
              ) : (
                "Change Password"
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
                router.push("/profile");
              }}
              className="bg-cyan-600 text-white hover:bg-cyan-500"
            >
              Back to Profile
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
