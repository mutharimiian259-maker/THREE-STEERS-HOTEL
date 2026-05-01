"use client";

import { trackEvent } from "@/lib/analytics/trackEvent";
import { HOTEL } from "@/lib/config";

const WHATSAPP_NUMBER = HOTEL.contact.phone.whatsapp;

export default function BookingTracker() {
  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click", {
      source: "booking_tracker",
    });
  };

  const handleCallClick = () => {
    trackEvent("call_click", {
      source: "booking_tracker",
    });
  };

  return (
    <div className="hidden">

      {/* WhatsApp tracking wrapper */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        onClick={handleWhatsAppClick}
      >
        WhatsApp
      </a>

      {/* Call tracking wrapper */}
      <a
        href={`tel:${HOTEL.contact.phone.primary}`}
        onClick={handleCallClick}
      >
        Call
      </a>

    </div>
  );
}
