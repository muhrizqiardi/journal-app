import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getOneUser } from "../../../services/user.service";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    pages: {
      signIn: "/login",
      newUser: "/register",
    },
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: {
            label: "email",
            type: "text",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          try {
            if (!credentials?.email || !credentials?.password)
              throw new Error("Invalid credentials");

            const user = await getOneUser({ email: credentials.email });

            const passwordIsCorrect = bcrypt.compareSync(
              credentials.password,
              user.password
            );

            if (!passwordIsCorrect) throw new Error("Invalid credentials");

            return {
              id: user.id,
              email: user.email,
            } as any;
          } catch (error) {
            console.error(error);
            return null;
          }
        },
      }),
    ],
  });
}
