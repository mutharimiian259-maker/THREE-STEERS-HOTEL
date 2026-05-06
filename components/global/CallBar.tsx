"use client";

import { HOTEL } from "@/lib/config";
import { track } from "@/lib/core/analytics";

export default function CallBar() {
  const phone = HOTEL.contact.phone.primary.replace(/[^\d]/g, "");

  const handleCallClick = () => {
    track("call_click", {
      source: "call_bar",
    });

    // small delay for event flush stability
    setTimeout(() => {
      window.location.href = `tel:${phone}`;
    }, 80);
  };

  return (
    <div className="hidden md:flex fixed top-0 left-0 right-0 bg-yellow-500 text-black justify-center p-2 text-sm z-50">
      Call us directly for instant booking:{" "}
      <button
        onClick={handleCallClick}
        className="font-semibold underline"
      >
        {HOTEL.contact.phone.primary}
      </button>
    </div>
  );
}
