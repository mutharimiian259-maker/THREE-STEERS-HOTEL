"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "./trackEvent";

export function useAnalytics(pageName: string) {
  const lastTrackedPage = useRef<string | null>(null);

  useEffect(() => {
    if (!pageName) return;

    // Prevent duplicate tracking for same page
    if (lastTrackedPage.current === pageName) return;

    lastTrackedPage.current = pageName;

    try {
      trackEvent("page_view", {
        page: pageName,
      });
    } catch (error) {
      console.error("[ANALYTICS ERROR]", error);
    }
  }, [pageName]);
}
