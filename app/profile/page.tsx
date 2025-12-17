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
  IconLock,
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
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <IconLoader2 className="animate-spin w-8 h-8 text-cyan-500" />
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
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden p-4">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="cyan" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm p-8">
          <div className="mb-6">
            <Link
              href="/"
              className="text-xs text-gray-500 hover:text-cyan-400 transition-colors inline-flex items-center gap-2 group"
            >
              <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Profile Settings
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Update your personal information
            </p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-2 border-cyan-500/20">
                  <AvatarImage src={image || session.user.image || ""} />
                  <AvatarFallback className="text-2xl bg-neutral-800 text-cyan-500">
                    {name?.charAt(0).toUpperCase() ||
                      session.user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <IconCamera className="text-white w-6 h-6" />
                </div>
                {/* In a real app, you'd add file upload here. For now, we just let them edit the URL string or keep it simple */}
              </div>
              <p className="text-xs text-gray-500">
                {session.user.email}
                {session.user.emailVerified && (
                  <span className="text-green-500 ml-1">(Verified)</span>
                )}
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-300 ml-1">
                Full Name
              </label>
              <div className="relative">
                <IconUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-300 ml-1">
                Profile Picture
              </label>
              <div className="w-full border border-[#333] rounded-lg bg-[#0a0a0a] overflow-hidden">
                <FileUpload
                  onChange={(files) => {
                    if (files.length > 0) {
                      const file = files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <p className="text-[10px] text-gray-500 ml-1">
                Supported formats: JPG, PNG, GIF. Max size: 5MB.
              </p>
            </div>

            <div className="pt-2 border-t border-[#2a2a2a]">
              <Link
                href="/change-password"
                className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors inline-flex items-center gap-2 group"
              >
                <IconLock className="w-4 h-4" />
                Change Password
              </Link>
            </div>

            {message && (
              <div
                className={`p-3 rounded-lg flex items-center gap-2 text-sm ${
                  message.type === "success"
                    ? "bg-green-500/10 text-green-500 border border-green-500/20"
                    : "bg-red-500/10 text-red-500 border border-red-500/20"
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
              className="w-full py-3 px-4 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <IconLoader2 className="animate-spin w-4 h-4" />
                  <span>Updating...</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>

          {/* Delete Account Section */}
          <div className="mt-8 pt-6 border-t border-[#2a2a2a]">
            <h3 className="text-red-500 font-semibold mb-2">Danger Zone</h3>
            <p className="text-gray-500 text-xs mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className="w-full py-3 px-4 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-500 font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <IconTrash className="w-4 h-4" />
                  Delete Account
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#121212] border border-[#2a2a2a] text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-transparent border border-[#333] text-white hover:bg-[#2a2a2a] hover:text-white">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-red-600 text-white hover:bg-red-700 border-none"
                  >
                    {isDeleting ? (
                      <div className="flex items-center gap-2">
                        <IconLoader2 className="animate-spin w-4 h-4" />
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
