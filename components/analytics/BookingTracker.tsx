"use client";

import { useEffect } from "react";
import { track } from "@/lib/core/analytics";

export default function BookingTracker() {
  useEffect(() => {
    track("page_view");
  }, []);

  return null;
}
