"use client";

import { useEffect } from "react";
import Link from "next/link";
import { track } from "@/lib/core/analytics";

export default function NotFound() {
  useEffect(() => {
    track("page_view", {
      page_name: "404",
      context: "error",
      url: window.location.href,
      referrer: document.referrer || null,
    });
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center text-center px-6">

      <div>

        <h1 className="text-4xl font-bold text-yellow-500">
          404 - Page Not Found
        </h1>

        <p className="text-gray-400 mt-3">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="btn btn-green inline-block mt-6"
          onClick={() =>
            track("navigation", {
              from: "404",
              to: "home",
              intent: "recovery",
            })
          }
        >
          Go Back Home
        </Link>

      </div>

    </main>
  );
}
