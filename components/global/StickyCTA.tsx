"use client";

import { HOTEL, getPrimaryPhone } from "@/lib/config";
import { track } from "@/lib/core/analytics";
import {
  buildWhatsAppLink,
  formatWhatsAppMessage,
} from "@/lib/whatsapp";

export default function StickyCTA() {
  /**
   * ✅ CENTRALIZED WhatsApp link
   */
  const whatsappLink = buildWhatsAppLink(
    formatWhatsAppMessage(
      "Hello, I would like to book a room. Please share availability and pricing.",
      { source: "sticky_cta" }
    )
  );

  /**
   * ✅ WhatsApp tracking (clean + consistent)
   */
  const handleWhatsAppClick = () => {
    track(
      "whatsapp_click",
      {
        action: "cta_click",
      },
      "sticky_cta"
    );

    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  };

  /**
   * ✅ Call tracking (clean)
   */
  const handleCallClick = () => {
    track(
      "call_click",
      {
        action: "cta_click",
      },
      "sticky_cta"
    );

    window.location.href = `tel:${getPrimaryPhone()}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white flex justify-between items-center p-3 z-50">

      {/* MESSAGE */}
      <p className="text-sm hidden md:block">
        Book direct for best rates at {HOTEL.identity.name}
      </p>

      {/* ACTIONS */}
      <div className="flex gap-3">

        <button
          onClick={handleWhatsAppClick}
          className="bg-green-500 px-4 py-2 rounded text-sm"
        >
          WhatsApp
        </button>

        <button
          onClick={handleCallClick}
          className="bg-yellow-500 text-black px-4 py-2 rounded text-sm"
        >
          Call
        </button>

      </div>

    </div>
  );
}
