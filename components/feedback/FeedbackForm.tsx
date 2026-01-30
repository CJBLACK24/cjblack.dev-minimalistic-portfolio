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
      <div className="rounded-xl border border-dashed border-white/10 p-6 text-center">
        <Button
          onClick={() =>
            (window.location.href = "/sign-up?tab=signin&callbackUrl=/wall")
          }
          className="mb-2 bg-white/10 text-white hover:bg-white/20"
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
      className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <div className="flex items-center gap-2 font-medium text-white/80">
        <MessageSquarePlus className="h-4 w-4" />
        <span>Share your feedback</span>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What people says about my portfolio..."
        className="h-32 w-full resize-none rounded-xl border border-white/10 bg-black/40 p-4 text-white transition-colors outline-none focus:border-blue-500/50"
      />
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isCreatingFeedback || !content.trim()}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          {isCreatingFeedback ? "Posting..." : "Post Feedback"}
        </Button>
      </div>
    </form>
  );
}
