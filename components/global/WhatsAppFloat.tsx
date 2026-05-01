"use client";

import { trackEvent } from "@/lib/analytics/trackEvent";
import { HOTEL } from "@/lib/config/hotel";
import { setFunnelStep } from "@/lib/analytics/funnelEvents";

export default function WhatsAppFloat() {
  const handleClick = () => {
    trackEvent("whatsapp_click", {
      source: "float_button",
    });

    setFunnelStep("CONTACT");
  };

  return (
    <a
      href={`https://wa.me/${HOTEL.contact.phone.whatsapp}`}
      onClick={handleClick}
      className="fixed bottom-20 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg z-50"
      aria-label="Chat on WhatsApp"
    >
      💬
    </a>
  );
}
