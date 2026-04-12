"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  cacheGet,
  cacheSet,
  cacheDel,
  CACHE_KEYS,
  CACHE_TTL,
} from "@/lib/redis";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import aj from "@/lib/security";
import { userRateLimitRule, strictSensitiveInfoRule } from "@/lib/security/rules";

// ─── Helpers ────────────────────────────────────────────────────────────────

async function getAuthSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

/**
 * Invalidate all feedback-related caches.
 * Called after any write operation (create, update, delete).
 */
async function invalidateFeedbackCaches() {
  await Promise.all([
    cacheDel(CACHE_KEYS.FEEDBACKS),
    cacheDel(CACHE_KEYS.FEEDBACK_COUNT),
  ]);
}

/**
 * Invalidate reaction caches.
 */
async function invalidateReactionCaches() {
  await cacheDel(CACHE_KEYS.REACTIONS);
}

// ─── Read Operations (Cached) ───────────────────────────────────────────────

/**
 * Fetches all feedbacks with their authors.
 * Results are cached in Redis for CACHE_TTL.FEEDBACKS seconds.
 */
export async function getFeedbacks() {
  // 1. Try cache first
  const cached = await cacheGet<Awaited<ReturnType<typeof _fetchFeedbacks>>>(
    CACHE_KEYS.FEEDBACKS,
  );
  if (cached) {
    console.log("[Feedback] Cache HIT for feedbacks");
    return cached;
  }

  // 2. Cache miss → query database
  console.log("[Feedback] Cache MISS for feedbacks, querying DB...");
  const feedbacks = await _fetchFeedbacks();

  // 3. Store in cache
  await cacheSet(CACHE_KEYS.FEEDBACKS, feedbacks, CACHE_TTL.FEEDBACKS);

  return feedbacks;
}

/** Internal: raw database query for feedbacks */
async function _fetchFeedbacks() {
  return await prisma.feedback.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });
}

/**
 * Fetches the count of reactions and the users who reacted.
 * Results are cached in Redis for CACHE_TTL.REACTIONS seconds.
 */
export async function getReactionData() {
  // 1. Try cache first
  const cached = await cacheGet<{
    count: number;
    users: { id: string; name: string; image: string | null }[];
  }>(CACHE_KEYS.REACTIONS);
  if (cached) {
    console.log("[Feedback] Cache HIT for reactions");
    return cached;
  }

  // 2. Cache miss → query database
  console.log("[Feedback] Cache MISS for reactions, querying DB...");
  const reactions = await prisma.reaction.findMany({
    where: {
      type: "HEART",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  const result = {
    count: reactions.length,
    users: reactions.map((r) => r.user),
  };

  // 3. Store in cache
  await cacheSet(CACHE_KEYS.REACTIONS, result, CACHE_TTL.REACTIONS);

  return result;
}

// ─── Write Operations (Invalidate Cache) ────────────────────────────────────

/**
 * Creates a new feedback record.
 * Verifies user session via Better Auth.
 * Invalidates the feedbacks cache after creation.
 */
export async function createFeedback(content: string) {
  const session = await getAuthSession();

  if (!session || !session.user) {
    throw new Error("Unauthorized: You must be logged in to leave feedback.");
  }

  // ─── Arcjet Protection ──────────────────────────────────────────────────
  const req = await headers();
  const decision = await aj
    .withRule(userRateLimitRule)
    .withRule(strictSensitiveInfoRule)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .protect(req as any, { 
      userId: session.user.id,
      sensitiveInfoValue: content 
    });

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      throw new Error("Too many requests — please try again in a minute.");
    }
    if (decision.reason.isSensitiveInfo()) {
      throw new Error("Your feedback contains sensitive information (like emails or phone numbers) and cannot be posted.");
    }
    throw new Error("Access denied by security policies.");
  }
  // ────────────────────────────────────────────────────────────────────────

  const feedback = await prisma.feedback.create({
    data: {
      content,
      userId: session.user.id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  // Invalidate cache so next read gets fresh data
  await invalidateFeedbackCaches();

  revalidatePath("/");
  return feedback;
}

/**
 * Toggles a heart reaction for the user.
 * If reaction exists, it removes it. Otherwise, it creates one.
 * Invalidates the reactions cache.
 */
export async function toggleReaction() {
  const session = await getAuthSession();

  if (!session || !session.user) {
    throw new Error("Unauthorized: You must be logged in to react.");
  }

  const userId = session.user.id;
  const type = "HEART";

  const existingReaction = await prisma.reaction.findUnique({
    where: {
      userId_type: {
        userId,
        type,
      },
    },
  });

  if (existingReaction) {
    await prisma.reaction.delete({
      where: {
        id: existingReaction.id,
      },
    });
  } else {
    await prisma.reaction.create({
      data: {
        userId,
        type,
      },
    });
  }

  // Invalidate cache so next read gets fresh data
  await invalidateReactionCaches();

  revalidatePath("/");
  return { success: true, reacted: !existingReaction };
}

const ADMIN_EMAIL = "duquechristianjohncalderon@gmail.com";

/**
 * Deletes a feedback record.
 * Only the author or an admin can delete.
 * Invalidates the feedbacks cache.
 */
export async function deleteFeedback(id: string) {
  const session = await getAuthSession();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const feedback = await prisma.feedback.findUnique({
    where: { id },
  });

  if (!feedback) {
    throw new Error("Feedback not found");
  }

  const isAdmin = session.user.email === ADMIN_EMAIL;
  const isOwner = feedback.userId === session.user.id;

  if (!isAdmin && !isOwner) {
    throw new Error("Forbidden");
  }

  await prisma.feedback.delete({
    where: { id },
  });

  // Invalidate cache so next read gets fresh data
  await invalidateFeedbackCaches();

  revalidatePath("/");
  return { success: true };
}

/**
 * Updates a feedback record.
 * Only the author or an admin can edit.
 * Invalidates the feedbacks cache.
 */
export async function updateFeedback(id: string, content: string) {
  const session = await getAuthSession();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const feedback = await prisma.feedback.findUnique({
    where: { id },
  });

  if (!feedback) {
    throw new Error("Feedback not found");
  }

  const isAdmin = session.user.email === ADMIN_EMAIL;
  const isOwner = feedback.userId === session.user.id;

  if (!isAdmin && !isOwner) {
    throw new Error("Forbidden");
  }

  const updated = await prisma.feedback.update({
    where: { id },
    data: { content },
  });

  // Invalidate cache so next read gets fresh data
  await invalidateFeedbackCaches();

  revalidatePath("/");
  return updated;
}
