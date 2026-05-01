"use client";

import { useAnalytics } from "@/lib/analytics/useAnalytics";

export default function AnalyticsProvider({
  pageName,
  children,
}: {
  pageName: string;
  children: React.ReactNode;
}) {
  if (!pageName) return <>{children}</>;

  useAnalytics(pageName);

  return <>{children}</>;
}
