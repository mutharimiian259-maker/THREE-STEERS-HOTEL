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
  const lastTrackedRef = useRef<string | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isValid(pageName)) return;

    const normalized = pageName.trim();
    const now = Date.now();

    // prevent duplicate tracking of same page
    if (lastTrackedRef.current === normalized) return;

    // prevent rapid double fires
    if (now - lastTimeRef.current < 500) return;

    lastTrackedRef.current = normalized;
    lastTimeRef.current = now;

    track("page_view", {
      page_name: normalized,
      context: "navigation",
      intent: "visit",
    });

    if (process.env.NODE_ENV === "development") {
      console.log("[PAGE VIEW]", normalized);
    }
  }, [pageName]);

  return <>{children}</>;
}
