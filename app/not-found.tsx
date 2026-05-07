"use client";

import { useEffect } from "react";
import Link from "next/link";

import { track } from "@/lib/core/analytics";

export default function NotFound() {
  useEffect(() => {
    track(
      "page_view",
      {
        page: "404",
        context: "error",
      },
      "page"
    );
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">

      <div>

        <h1 className="text-4xl font-bold text-yellow-500">
          404 - Page Not Found
        </h1>

        <p className="mt-3 text-gray-400">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="btn btn-green mt-6 inline-block"
          onClick={() => {
            track(
              "page_view",
              {
                from: "404",
                to: "home",
                intent: "recovery",
              },
              "navigation"
            );
          }}
        >
          Go Back Home
        </Link>

      </div>

    </main>
  );
}
