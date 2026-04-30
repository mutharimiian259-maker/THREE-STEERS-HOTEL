"use client";

import { useEffect } from "react";
import { trackEvent } from "./trackEvent";

export function useAnalytics(pageName: string) {
  useEffect(() => {
    trackEvent("page_view", { page: pageName });
  }, [pageName]);
}
