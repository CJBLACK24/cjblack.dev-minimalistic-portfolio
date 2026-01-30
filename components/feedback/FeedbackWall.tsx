"use client";

import { useFeedback, type Feedback } from "@/hooks/use-feedback";
import { FeedbackForm } from "./FeedbackForm";
import { ReactionButton } from "./ReactionButton";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/primitives/avatar";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "motion/react";
import { useSession } from "@/lib/auth-client";
import { IconPencil, IconTrash, IconCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ADMIN_EMAIL = "duquechristianjohncalderon@gmail.com";

export function FeedbackWall() {
  const { feedbacks, isLoadingFeedbacks } = useFeedback();

  return (
    <section className="pt-10 pb-20 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column: Title, Description, Reactions */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                What <span className="text-blue-500">People</span> Say
              </h2>
              <p className="text-white/40 text-lg max-w-xl">
                Thoughts, feedback, and reactions from the community. Share your
                experience or just leave a heart.
              </p>
            </div>
            <ReactionButton />
          </div>

          {/* Right Column: Feedback Form */}
          <div className="w-full">
            <FeedbackForm />
          </div>
        </div>

        {/* Feedbacks Feed */}
        <div className="space-y-6">
          {isLoadingFeedbacks ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-40 bg-white/5 border border-white/10 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {feedbacks.map((feedback: Feedback) => (
                  <FeedbackItem key={feedback.id} feedback={feedback} />
                ))}
              </AnimatePresence>

              {feedbacks.length === 0 && (
                <div className="col-span-full text-center py-20 border border-dashed border-white/10 rounded-3xl">
                  <p className="text-white/40">
                    No testimonials yet. Be the first to share your thoughts!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FeedbackItem({ feedback }: { feedback: Feedback }) {
  const { data: session } = useSession();
  const {
    deleteFeedback,
    updateFeedback,
    isUpdatingFeedback,
    isDeletingFeedback,
  } = useFeedback();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(feedback.content);

  const isAdmin = session?.user?.email === ADMIN_EMAIL;
  const isOwner = session?.user?.id === feedback.user.id;
  const canModify = isAdmin || isOwner;

  const handleUpdate = () => {
    if (editContent.trim() === "") return;
    updateFeedback(
      { id: feedback.id, content: editContent },
      {
        onSuccess: () => setIsEditing(false),
      },
    );
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this feedback?")) {
      deleteFeedback(feedback.id);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/8 transition-colors group relative"
    >
      <div className="flex items-start gap-4">
        <Avatar className="w-10 h-10 border border-white/10 shrink-0">
          <AvatarImage
            src={feedback.user.image ?? undefined}
            alt={feedback.user.name}
          />
          <AvatarFallback>{feedback.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-white/90 truncate">
              {feedback.user.name}
            </h3>
            <div className="flex items-center gap-3">
              <time className="text-xs text-white/30 whitespace-nowrap">
                {formatDistanceToNow(new Date(feedback.createdAt), {
                  addSuffix: true,
                })}
              </time>
              {canModify && !isEditing && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 hover:bg-white/10 rounded-md text-white/40 hover:text-white transition-colors"
                    title="Edit feedback"
                  >
                    <IconPencil size={16} />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-1 hover:bg-red-500/10 rounded-md text-white/40 hover:text-red-500 transition-colors"
                    title="Delete feedback"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="mt-2 space-y-3">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none min-h-[100px]"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 text-sm transition-colors"
                >
                  <IconX size={16} />
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={isUpdatingFeedback}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-sm font-medium transition-colors disabled:opacity-50"
                >
                  <IconCheck size={16} />
                  {isUpdatingFeedback ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-white/60 leading-relaxed break-words">
              {feedback.content}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
