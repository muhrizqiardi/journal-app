import { NextApiRequest, NextApiResponse } from "next";

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  response.status(401).json({ message: "Auth required" });
}