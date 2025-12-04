"use client";

import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/primitives/avatar";
import { IconLogout, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export const AuthAvatar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session) return null;

  const handleSignOut = async () => {
    await signOut();
    window.location.reload();
  };

  return (
    <div className="relative z-50">
      <div
        className="cursor-pointer transition-opacity hover:opacity-80"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Avatar className="h-6 w-6 md:h-8 md:w-8 border-2 border-white/20 shadow-sm">
          <AvatarImage
            src={session.user.image || ""}
            alt={session.user.name || "User"}
          />
          <AvatarFallback className="bg-cyan-500/20 text-cyan-500 text-[10px] md:text-xs font-bold">
            {session.user.name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 mb-2 w-48 rounded-xl border border-neutral-200 bg-white p-1 shadow-xl dark:border-white/10 dark:bg-black"
          >
            <div className="px-3 py-2 border-b border-neutral-100 dark:border-white/10 mb-1">
              <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                {session.user.name}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                {session.user.email}
              </p>
            </div>

            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <IconUser size={16} />
              Profile
            </Link>

            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
            >
              <IconLogout size={16} />
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
