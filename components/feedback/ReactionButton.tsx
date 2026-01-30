"use client";

import { useFeedback, type UserSummary } from "@/hooks/use-feedback";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/primitives/hover-card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/primitives/avatar";
import { ShimmerButton } from "@/components/ui/buttons/shimmer-button";

export function ReactionButton() {
  const { data: session } = useSession();
  const { reactionData, toggleReaction, isTogglingReaction } = useFeedback();

  const userHasReacted = reactionData.users.some(
    (u: UserSummary) => u.id === session?.user?.id,
  );

  return (
    <div className="flex items-center gap-3">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <button
            onClick={() => toggleReaction()}
            disabled={isTogglingReaction || !session}
            className={cn(
              "group flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-300",
              userHasReacted
                ? "border-red-500/50 bg-red-500/10 text-red-500"
                : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white",
            )}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                userHasReacted && "fill-current",
              )}
            />
            <span className="font-medium">{reactionData.count}</span>
          </button>
        </HoverCardTrigger>

        {reactionData.users.length > 0 && (
          <HoverCardContent className="z-[9999] w-64 border-white/10 bg-black/90 p-4 backdrop-blur-xl">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white/90">
                People who loved this
              </h4>
              <div className="flex flex-wrap gap-2">
                {reactionData.users.slice(0, 10).map((user: UserSummary) => (
                  <div key={user.id} className="group flex items-center gap-2">
                    <Avatar className="h-8 w-8 border border-white/10">
                      <AvatarImage
                        src={user.image ?? undefined}
                        alt={user.name}
                      />
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-white/60 transition-colors group-hover:text-white/90">
                      {user.name}
                    </span>
                  </div>
                ))}
                {reactionData.users.length > 10 && (
                  <div className="pt-1 text-xs text-white/40">
                    + {reactionData.users.length - 10} others
                  </div>
                )}
              </div>
            </div>
          </HoverCardContent>
        )}
      </HoverCard>
      {!session && (
        <ShimmerButton
          onClick={() =>
            (window.location.href = "/sign-up?tab=signin&callbackUrl=/wall")
          }
          className="h-8 px-4 text-[10px] tracking-widest uppercase"
        >
          Sign in to react
        </ShimmerButton>
      )}
    </div>
  );
}
