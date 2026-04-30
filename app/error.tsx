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
    console.error("APP ERROR:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6">

      <div className="max-w-md">

        <h2 className="text-3xl font-bold text-red-500">
          Something went wrong
        </h2>

        <p className="text-gray-400 mt-3">
          We encountered an unexpected error. Please try again or return home.
        </p>

        {/* ACTION BUTTONS */}
        <div className="mt-6 flex flex-col gap-3">

          <button
            onClick={() => reset()}
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
