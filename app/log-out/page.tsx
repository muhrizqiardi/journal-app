"use client";

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function LogOutPage() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  useEffect(() => {
    handleSignOut();
  }, []);

  return (
    <div className="h-96 flex items-center justify-center text-center">
      <p>Logging out...</p>
    </div>
  );
}
