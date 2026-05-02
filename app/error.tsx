"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  useEffect(() => {
    try {
      console.error("APP ERROR:", error?.message, error?.digest);
    } catch {
      // silent fail
    }
  }, [error]);

  const handleReset = () => {
    try {
      reset();
    } catch {
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6">

      <div className="max-w-md">

        <h2 className="text-3xl font-bold text-red-500">
          Something went wrong
        </h2>

        <p className="text-gray-400 mt-3">
          An unexpected issue occurred. You can retry or return to the homepage.
        </p>

        <div className="mt-6 flex flex-col gap-3">

          <button
            onClick={handleReset}
            className="btn btn-green"
          >
            Try Again
          </button>

          <Link href="/" className="btn btn-gold">
            Go Home
          </Link>

        </div>

      </div>

    </div>
  );
}
