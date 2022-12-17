"use client";

import { useEffect } from "react";
import MultilineToParagraphs from "../components/MultilineToParagraphs";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-96 flex flex-col gap-6 items-center justify-center">
      <p>Something went wrong!</p>
      <div className="mockup-code">
        <pre>
          <code>{error.message}</code>
        </pre>
      </div>
      <button onClick={() => reset()} className="btn">Reset error boundary</button>
    </div>
  );
}
