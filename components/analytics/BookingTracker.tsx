"use client";

import { trackEvent } from "@/lib/analytics/trackEvent";

export default function BookingTracker() {
  const handleIntent = (type: string) => {
    trackEvent("booking_intent", {
      type,
      page: window.location.pathname,
    });
  };

  return (
    <div className="hidden">

      {/* Invisible tracking hooks if needed */}
      <a onClick={() => handleIntent("whatsapp")} />
      <a onClick={() => handleIntent("call")} />

    </div>
  );
}
