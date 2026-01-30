"use client";

import { useFeedback } from "@/hooks/use-feedback";
import { useState } from "react";
import { Button } from "@/components/ui/primitives/button";
import { useSession } from "@/lib/auth-client";
import { MessageSquarePlus } from "lucide-react";

export function FeedbackForm() {
  const [content, setContent] = useState("");
  const { data: session } = useSession();
  const { createFeedback, isCreatingFeedback } = useFeedback();

  if (!session) {
    return (
      <div className="p-6 border border-dashed border-white/10 rounded-xl text-center">
        <Button
          onClick={() =>
            (window.location.href = "/sign-up?tab=signin&callbackUrl=/wall")
          }
          className="bg-white/10 hover:bg-white/20 text-white mb-2"
        >
          Sign in to share your thoughts
        </Button>
        <p className="text-white/60">Want to leave a testimonial?</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    createFeedback(content, {
      onSuccess: () => setContent(""),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white/5 border border-white/10 rounded-2xl"
    >
      <div className="flex items-center gap-2 text-white/80 font-medium">
        <MessageSquarePlus className="w-4 h-4" />
        <span>Share your feedback</span>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What people says about my portfolio..."
        className="w-full h-32 p-4 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500/50 transition-colors resize-none"
      />
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isCreatingFeedback || !content.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isCreatingFeedback ? "Posting..." : "Post Feedback"}
        </Button>
      </div>
    </form>
  );
}
