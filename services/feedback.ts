"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

/**
 * Creates a new feedback record.
 * Verifies user session via Better Auth.
 */
export async function createFeedback(content: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("Unauthorized: You must be logged in to leave feedback.");
  }

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

  revalidatePath("/"); // Adjust path if needed
  return feedback;
}

/**
 * Toggles a heart reaction for the user.
 * If reaction exists, it removes it. Otherwise, it creates one.
 */
export async function toggleReaction() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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

  revalidatePath("/");
  return { success: true, reacted: !existingReaction };
}

const ADMIN_EMAIL = "duquechristianjohncalderon@gmail.com";

/**
 * Deletes a feedback record.
 * Only the author or an admin can delete.
 */
export async function deleteFeedback(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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

  revalidatePath("/");
  return { success: true };
}

/**
 * Updates a feedback record.
 * Only the author or an admin can edit.
 */
export async function updateFeedback(id: string, content: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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

  revalidatePath("/");
  return updated;
}

/**
 * Fetches all feedbacks with their authors.
 */
export async function getFeedbacks() {
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
 */
export async function getReactionData() {
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

  return {
    count: reactions.length,
    users: reactions.map((r) => r.user),
  };
}
