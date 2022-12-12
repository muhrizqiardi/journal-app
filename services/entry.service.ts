import { Entry } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prisma from "../helpers/prisma";

// Create a new entry
export async function createEntry(params: {
  userId?: number;
  userEmail?: string;
  content: string;
  mood: number;
}): Promise<Entry> {
  let entry: Entry;
  const { content, mood, userId, userEmail } = params;

  if (userEmail === undefined && userId === undefined)
    throw new Error("`userEmail` or `userId` is undefined");

  try {
    entry = await prisma.entry.create({
      data: {
        content,
        mood,
        user: {
          connect: {
            id: userId,
            email: userEmail,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed creating new entry");
  }

  return entry;
}

export async function getOneEntry(params: { id: number }): Promise<Entry> {
  let entry: Entry;
  const { id } = params;

  try {
    entry = await prisma.entry.findUniqueOrThrow({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") throw new Error("Entry not found");
    }

    throw new Error("Unknown error");
  }

  return entry;
}

export async function getManyEntry(params: {
  content?: string;
  mood?: number;
  createdBefore?: string;
  createdAt?: string;
  createdAfter?: string;
  page?: number;
  limit?: number;
  userId?: number;
  userEmail?: string;
  orderBy?: "asc" | "desc";
}): Promise<Entry[]> {
  let entries: Entry[];
  const {
    content,
    mood,
    createdBefore,
    createdAt,
    createdAfter,
    page = 1,
    limit = 10,
    userId,
    userEmail,
    orderBy = "desc",
  } = params;
  try {
    if (userEmail === undefined && userId === undefined)
      throw new Error("`userEmail` and `userId` is undefined");

    entries = await prisma.entry.findMany({
      skip: limit * (page - 1),
      take: limit,
      orderBy: {
        createdAt: orderBy,
      },
      where: {
        content,
        mood,
        createdAt: {
          in: createdAt,
          lt: createdBefore,
          gt: createdAfter,
        },
        user: {
          email: userEmail,
          id: userId,
        },
      },
    });
  } catch (error) {
    console.error(error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") throw new Error("Entry(s) not found");
    }

    throw new Error("Unknown error");
  }

  return entries;
}

export async function updateEntry(
  params: {
    id: number;
  },
  payload: {
    content?: string;
    mood?: number;
  }
): Promise<Entry> {
  let entry: Entry;
  const { id } = params;
  const { content, mood } = payload;

  try {
    entry = await prisma.entry.update({
      where: {
        id,
      },
      data: {
        content,
        mood,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed updating an entry");
  }

  return entry;
}

export async function deleteEntry(params: { id: number }): Promise<void> {
  const { id } = params;

  try {
    await prisma.entry.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed deleting an entry");
  }
}
