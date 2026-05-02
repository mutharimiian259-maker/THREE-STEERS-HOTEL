"use client";

import { useEffect } from "react";
import { FunnelEvents } from "@/lib/analytics/conversionEvents";

export default function BookingTracker() {
  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest("a") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href") || "";

      if (href.includes("wa.me")) {
        FunnelEvents.whatsappClick(window.location.pathname);
      }

      if (href.startsWith("tel:")) {
        FunnelEvents.callClick(window.location.pathname);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
