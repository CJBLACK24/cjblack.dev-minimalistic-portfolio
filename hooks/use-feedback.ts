"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFeedback,
  deleteFeedback,
  getFeedbacks,
  getReactionData,
  toggleReaction,
  updateFeedback,
} from "@/lib/actions/feedback";
import { toast } from "sonner";

export interface UserSummary {
  id: string;
  name: string;
  image?: string | null;
}

export interface Feedback {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    email?: string | null;
    image: string | null;
  };
}

export interface ReactionData {
  count: number;
  users: UserSummary[];
}

export function useFeedback() {
  const queryClient = useQueryClient();

  // Query: Get all feedbacks
  const feedbacksQuery = useQuery({
    queryKey: ["feedbacks"],
    queryFn: () => getFeedbacks() as Promise<Feedback[]>,
  });

  // Query: Get reaction data
  const reactionsQuery = useQuery({
    queryKey: ["reactions"],
    queryFn: () => getReactionData() as Promise<ReactionData>,
  });

  // Mutation: Create feedback
  const createFeedbackMutation = useMutation({
    mutationFn: (content: string) => createFeedback(content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      toast.success("Feedback posted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to post feedback");
    },
  });

  // Mutation: Delete feedback
  const deleteFeedbackMutation = useMutation({
    mutationFn: (id: string) => deleteFeedback(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      toast.success("Feedback deleted.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete feedback");
    },
  });

  // Mutation: Update feedback
  const updateFeedbackMutation = useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      updateFeedback(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      toast.success("Feedback updated.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update feedback");
    },
  });

  // Mutation: Toggle reaction (Optimistic UI)
  const toggleReactionMutation = useMutation({
    mutationFn: () => toggleReaction(),
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["reactions"] });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<ReactionData>([
        "reactions",
      ]);

      return { previousData };
    },
    onSuccess: (data) => {
      // Refetch after success to ensure sync with server
      queryClient.invalidateQueries({ queryKey: ["reactions"] });
      if (data.reacted) {
        toast.success("Loved it! ❤️");
      }
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(["reactions"], context.previousData);
      }
      toast.error("Failed to update reaction");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reactions"] });
    },
  });

  return {
    feedbacks: feedbacksQuery.data || [],
    isLoadingFeedbacks: feedbacksQuery.isLoading,
    reactionData: reactionsQuery.data || { count: 0, users: [] },
    isLoadingReactions: reactionsQuery.isLoading,
    createFeedback: createFeedbackMutation.mutate,
    isCreatingFeedback: createFeedbackMutation.isPending,
    deleteFeedback: deleteFeedbackMutation.mutate,
    isDeletingFeedback: deleteFeedbackMutation.isPending,
    updateFeedback: updateFeedbackMutation.mutate,
    isUpdatingFeedback: updateFeedbackMutation.isPending,
    toggleReaction: toggleReactionMutation.mutate,
    isTogglingReaction: toggleReactionMutation.isPending,
  };
}
