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
  const lastFireTimeRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isValid(pageName)) return;

    const now = Date.now();

    const normalizedName = pageName.trim();
    const url = window.location.pathname + window.location.search;

    const key = `${normalizedName}::${url}`;

    // stronger dedup (prevents SPA edge duplicates)
    if (
      lastKeyRef.current === key &&
      now - lastFireTimeRef.current < 1500
    ) {
      return;
    }

    lastKeyRef.current = key;
    lastFireTimeRef.current = now;

    track("page_view", {
      page_name: normalizedName,
      path: window.location.pathname,
      url,
      source: "navigation",
    });

    if (process.env.NODE_ENV === "development") {
      console.log("[PAGE VIEW]", normalizedName, url);
    }
  }, [pageName]);

  return <>{children}</>;
}
