"use client";

import { trackEvent } from "@/lib/analytics/trackEvent";

const WHATSAPP_NUMBER = "254728588005";

export default function StickyCTA() {

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click", {
      source: "sticky_cta",
    });
  };

  const handleCallClick = () => {
    trackEvent("call_click", {
      source: "sticky_cta",
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white flex justify-between items-center p-3 z-50">

      <p className="text-sm hidden md:block">
        Book direct for best rates at Three Steers Hotel
      </p>

      <div className="flex gap-3">

        {/* WHATSAPP CTA */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          onClick={handleWhatsAppClick}
          className="bg-green-500 px-4 py-2 rounded text-sm"
        >
          WhatsApp
        </a>

        {/* CALL CTA */}
        <a
          href="tel:+254728588005"
          onClick={handleCallClick}
          className="bg-yellow-500 text-black px-4 py-2 rounded text-sm"
        >
          Call
        </a>

      </div>

    </div>
  );
}
