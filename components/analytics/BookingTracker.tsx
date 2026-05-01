"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/trackEvent";

export default function BookingTracker() {
  useEffect(() => {
    trackEvent("booking_intent", {
      type: "page_view",
      page: typeof window !== "undefined" ? window.location.pathname : "",
    });
  }, []);

  return null;
}
