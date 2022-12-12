import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import env from "../helpers/env";
import { getOneUser } from "./user.service";

const secret = env.SECRET;

// function to create a JWT
export async function createToken(params: {
  email: string;
  password: string;
}): Promise<string> {
  let user: User;
  const { email, password } = params;

  try {
    user = await getOneUser({ email });
    if (user.password !== password) throw new Error("Invalid credentials");
  } catch (error) {
    throw error;
  }

  const payload = {
    userId: user.id,
  };

  return jwt.sign(payload, secret);
}

// function to verify a JWT
export function verifyToken(token: string) {
  return jwt.verify(token, secret);
}
