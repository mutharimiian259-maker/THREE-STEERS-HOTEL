"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "./trackEvent";

export function useAnalytics(pageName: string) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!pageName) return;
    if (tracked.current) return;

    tracked.current = true;

    trackEvent("page_view", {
      page: pageName,
    });
  }, [pageName]);
}
