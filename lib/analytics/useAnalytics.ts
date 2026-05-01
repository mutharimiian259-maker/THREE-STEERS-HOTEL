"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "./trackEvent";

export function useAnalytics(pageName: string) {
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (!pageName) return;

    if (hasTrackedRef.current) return;
    hasTrackedRef.current = true;

    trackEvent("page_view", {
      page: pageName,
    });
  }, [pageName]);
}
