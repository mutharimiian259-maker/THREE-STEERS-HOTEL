"use client";

import { useEffect } from "react";
import { track } from "@/lib/core/analytics";

/**
 * 🔥 Lightweight semantic hook
 * ONLY triggers unified analytics pipeline
 */
export function useAnalytics(pageName: string) {
  useEffect(() => {
    if (!pageName) return;

    track("page_view", {
      page_name: pageName,
    });
  }, [pageName]);
}
