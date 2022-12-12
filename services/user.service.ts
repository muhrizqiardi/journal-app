import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prisma from "../helpers/prisma";

const select = {
  createdAt: true,
  updatedAt: true,
  email: true,
  id: true,
};

export async function createUser(data: {
  email: string;
  password: string;
}): Promise<User> {
  let user: User;
  const { email, password } = data;

  try {
    user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed creating new user");
  }

  return user;
}

export async function getOneUser(params: { id?: number; email?: string }) {
  const { id, email } = params;
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
        email,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") throw new Error("User not found");
    }

    throw new Error("Unknown error");
  }
}

export async function updateUser(
  params: {
    id: number;
  },
  payload: {
    email?: string;
    password?: string;
  }
): Promise<User> {
  let user: User;
  const { id } = params;
  const { email, password } = payload;

  try {
    user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        password,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed updating user");
  }

  return user;
}

export async function deleteUser(params: { id: number }): Promise<void> {
  const { id } = params;

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed deleting user");
  }
}
