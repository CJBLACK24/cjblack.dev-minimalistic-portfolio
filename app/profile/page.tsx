/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useSession, updateUser, deleteUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/primitives/avatar";
import { FileUpload } from "@/components/ui/media/file-upload";
import {
  IconUser,
  IconCamera,
  IconLoader2,
  IconCheck,
  IconX,
  IconArrowLeft,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { Spotlight } from "@/components/ui/backgrounds/spotlight";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/primitives/alert-dialog";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [name, setName] = useState(session?.user?.name || "");
  const [image, setImage] = useState(session?.user?.image || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Update local state when session loads
  if (session && !name && !image) {
    setName(session.user.name || "");
    setImage(session.user.image || "");
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteUser();
      router.push("/");
      router.refresh();
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to delete account. Please try again.",
      });
      setIsDeleting(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-white">
        <IconLoader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (!session) {
    router.push("/sign-up?tab=signin");
    return null;
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const { error } = await updateUser({
        name,
        image,
      });

      if (error) {
        setMessage({
          type: "error",
          text: error.message || "Failed to update profile",
        });
      } else {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        router.refresh();
      }
    } catch {
      setMessage({ type: "error", text: "An unexpected error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0a] p-4">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="cyan" />

      <div className="relative z-10 w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#121212] p-8 shadow-2xl backdrop-blur-sm">
          <div className="mb-6">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-xs text-gray-500 transition-colors hover:text-cyan-400"
            >
              <IconArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Profile Settings
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Update your personal information
            </p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="group relative">
                <Avatar className="h-24 w-24 border-2 border-cyan-500/20">
                  <AvatarImage src={image || session.user.image || ""} />
                  <AvatarFallback className="bg-neutral-800 text-2xl text-cyan-500">
                    {name?.charAt(0).toUpperCase() ||
                      session.user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <IconCamera className="h-6 w-6 text-white" />
                </div>
                {/* In a real app, you'd add file upload here. For now, we just let them edit the URL string or keep it simple */}
              </div>
              <p className="text-xs text-gray-500">
                {session.user.email}
                {session.user.emailVerified && (
                  <span className="ml-1 text-green-500">(Verified)</span>
                )}
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="ml-1 text-xs font-medium text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <IconUser className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-[#333] bg-[#0a0a0a] py-3 pr-4 pl-10 text-white placeholder-gray-600 transition-all focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="ml-1 text-xs font-medium text-gray-300">
                Profile Picture
              </label>
              <div className="w-full overflow-hidden rounded-lg border border-[#333] bg-[#0a0a0a]">
                <FileUpload
                  onChange={(files) => {
                    if (files.length > 0) {
                      const file = files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <p className="ml-1 text-[10px] text-gray-500">
                Supported formats: JPG, PNG, GIF. Max size: 5MB.
              </p>
            </div>

            {message && (
              <div
                className={`flex items-center gap-2 rounded-lg p-3 text-sm ${
                  message.type === "success"
                    ? "border border-green-500/20 bg-green-500/10 text-green-500"
                    : "border border-red-500/20 bg-red-500/10 text-red-500"
                }`}
              >
                {message.type === "success" ? (
                  <IconCheck size={16} />
                ) : (
                  <IconX size={16} />
                )}
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-linear-to-r from-cyan-600 to-blue-600 px-4 py-3 font-semibold text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-200 hover:from-cyan-500 hover:to-blue-500 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <IconLoader2 className="h-4 w-4 animate-spin" />
                  <span>Updating...</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>

          {/* Delete Account Section */}
          <div className="mt-8 border-t border-[#2a2a2a] pt-6">
            <h3 className="mb-2 font-semibold text-red-500">Danger Zone</h3>
            <p className="mb-4 text-xs text-gray-500">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 font-semibold text-red-500 transition-all duration-200 hover:bg-red-500/20"
                >
                  <IconTrash className="h-4 w-4" />
                  Delete Account
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="border border-[#2a2a2a] bg-[#121212] text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border border-[#333] bg-transparent text-white hover:bg-[#2a2a2a] hover:text-white">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="border-none bg-red-600 text-white hover:bg-red-700"
                  >
                    {isDeleting ? (
                      <div className="flex items-center gap-2">
                        <IconLoader2 className="h-4 w-4 animate-spin" />
                        <span>Deleting...</span>
                      </div>
                    ) : (
                      "Delete Account"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
