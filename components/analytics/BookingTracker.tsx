"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/trackEvent";

export default function BookingTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    trackEvent("page_view", {
      page: window.location.pathname || "/",
    });
  }, []);

  return null;
}
