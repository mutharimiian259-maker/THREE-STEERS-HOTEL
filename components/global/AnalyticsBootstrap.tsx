"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/adapters/bootstrap";

/* =============================================================
   ANALYTICS BOOTSTRAP
   Client boundary for analytics initialization.
   Extracted from RootLayout so layout.tsx can remain a
   Server Component in Next.js App Router.
   ============================================================= */

export default function AnalyticsBootstrap(): null {
  useEffect(() => {
    initAnalytics();
  }, []);

  return null;
}
