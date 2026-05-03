"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/trackEvent";

export function useAnalytics(pageName: string) {
  useEffect(() => {
    if (!pageName) return;

    trackEvent("page_view", {
      page: pageName,
    });
  }, [pageName]);
}
