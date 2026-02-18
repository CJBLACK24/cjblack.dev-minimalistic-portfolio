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
// cn unused, removed

const ADMIN_EMAIL = "duquechristianjohncalderon@gmail.com";

export function FeedbackWall() {
  const { feedbacks, isLoadingFeedbacks } = useFeedback();

  return (
    <section className="min-h-screen px-4 pt-10 pb-20">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          {/* Left Column: Title, Description, Reactions */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                What <span className="text-blue-500">People</span> Say
              </h2>
              <p className="max-w-xl text-lg text-white/40">
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-40 animate-pulse rounded-2xl border border-white/10 bg-white/5"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {feedbacks.map((feedback: Feedback) => (
                  <FeedbackItem key={feedback.id} feedback={feedback} />
                ))}
              </AnimatePresence>

              {feedbacks.length === 0 && (
                <div className="col-span-full rounded-3xl border border-dashed border-white/10 py-20 text-center">
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
  const { deleteFeedback, updateFeedback, isUpdatingFeedback } = useFeedback();
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
      className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/8"
    >
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10 shrink-0 border border-white/10">
          <AvatarImage
            src={feedback.user.image ?? undefined}
            alt={feedback.user.name}
          />
          <AvatarFallback>{feedback.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate font-semibold text-white/90">
              {feedback.user.name}
            </h3>
            <div className="flex items-center gap-3">
              <time className="text-xs whitespace-nowrap text-white/30">
                {formatDistanceToNow(new Date(feedback.createdAt), {
                  addSuffix: true,
                })}
              </time>
              {canModify && !isEditing && (
                <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="rounded-md p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                    title="Edit feedback"
                  >
                    <IconPencil size={16} />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="rounded-md p-1 text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-500"
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
                className="min-h-[100px] w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-white/80 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-1 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white/60 transition-colors hover:bg-white/10"
                >
                  <IconX size={16} />
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={isUpdatingFeedback}
                  className="flex items-center gap-1 rounded-lg bg-blue-500/20 px-3 py-1.5 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/30 disabled:opacity-50"
                >
                  <IconCheck size={16} />
                  {isUpdatingFeedback ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-2 leading-relaxed wrap-break-word text-white/60">
              {feedback.content}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
