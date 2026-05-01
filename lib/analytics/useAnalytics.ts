"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "./trackEvent";

export function useAnalytics(pageName: string) {
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!pageName) return;

    // Prevent duplicate firing (Strict Mode + re-renders)
    if (hasTrackedRef.current) return;
    hasTrackedRef.current = true;

    try {
      trackEvent("page_view", {
        page: pageName,
      });
    } catch (error) {
      console.error("[ANALYTICS HOOK ERROR]", error);
    }
  }, [pageName]);
}
