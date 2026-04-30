"use client";

import { trackEvent } from "@/lib/analytics/trackEvent";

const WHATSAPP_NUMBER = "254728588005";

export default function WhatsAppFloat() {
  const handleClick = () => {
    trackEvent("whatsapp_click", {
      source: "float_button",
    });
  };

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      onClick={handleClick}
      className="fixed bottom-20 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg z-50"
      aria-label="Chat on WhatsApp"
    >
      💬
    </a>
  );
}
