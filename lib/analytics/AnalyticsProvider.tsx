"use client";

import { useEffect } from "react";
import { useAnalytics } from "@/lib/analytics/useAnalytics";

export default function AnalyticsProvider({
  pageName,
  children,
}: {
  pageName: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!pageName) return;
  }, [pageName]);

  useAnalytics(pageName);

  return <>{children}</>;
}
