"use client";

import { useAnalytics } from "@/lib/analytics/useAnalytics";

export default function AnalyticsProvider({
  pageName,
  children,
}: {
  pageName: string;
  children: React.ReactNode;
}) {
  useAnalytics(pageName);

  return <>{children}</>;
}
