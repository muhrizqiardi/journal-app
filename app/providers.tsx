"use client";

import { SessionProvider } from "next-auth/react";

export default function Providers(props: { children: React.ReactNode }) {
  return <SessionProvider>{props.children}</SessionProvider>;
}
