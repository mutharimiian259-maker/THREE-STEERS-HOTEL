"use client";

import { useEffect } from "react";
import Link from "next/link";
import { track } from "@/lib/core/analytics";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    try {
      console.error("APP ERROR:", {
        message: error?.message,
        digest: error?.digest,
        stack: error?.stack,
        name: error?.name,
      });

      track(
        "app_error",
        {
          message: error?.message,
          digest: error?.digest,
          stack: error?.stack,
        },
        "page"
      );
    } catch {
      // intentionally silent
    }
  }, [error]);

  const handleReset = () => {
    try {
      reset();
    } catch {
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div className="max-w-md">

        <h2 className="text-3xl font-bold text-red-500">
          Something went wrong
        </h2>

        <p className="mt-3 text-gray-400">
          An unexpected issue occurred. You can retry or return home.
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
