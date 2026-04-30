"use client";

import { trackWhatsAppClick, trackCallClick } from "@/lib/analytics/conversionEvents";

const WHATSAPP_NUMBER = "254728588005";

export default function BookingTracker() {
  return (
    <div className="hidden">

      {/* WhatsApp tracking wrapper */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        onClick={() => trackWhatsAppClick()}
      >
        WhatsApp
      </a>

      {/* Call tracking wrapper */}
      <a href="tel:+254728588005" onClick={() => trackCallClick()}>
        Call
      </a>

    </div>
  );
}
