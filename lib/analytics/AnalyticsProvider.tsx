"use client";

import { useEffect } from "react";
import { track } from "@/lib/core/analytics";

export default function AnalyticsProvider({
  pageName,
  children,
}: {
  pageName: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!pageName) return;

    track("page_view", {
      page_name: pageName,
    });
  }, [pageName]);

  return <>{children}</>;
}
