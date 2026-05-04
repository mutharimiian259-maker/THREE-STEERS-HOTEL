"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/core/analytics";

function isValid(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export default function AnalyticsProvider({
  pageName,
  children,
}: {
  pageName: string;
  children: React.ReactNode;
}) {
  const lastKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isValid(pageName)) return;

    const normalizedName = pageName.trim();
    const url = window.location.pathname + window.location.search + window.location.hash;

    // unique key per page instance
    const key = `${normalizedName}::${url}`;

    // prevent duplicate firing for same exact page state
    if (lastKeyRef.current === key) return;

    lastKeyRef.current = key;

    track("page_view", {
      page_name: normalizedName,
      path: window.location.pathname,
      url,
      context: "navigation",
      intent: "navigation",
    });

    if (process.env.NODE_ENV === "development") {
      console.log("[PAGE VIEW]", normalizedName, url);
    }
  }, [pageName]);

  return <>{children}</>;
}
