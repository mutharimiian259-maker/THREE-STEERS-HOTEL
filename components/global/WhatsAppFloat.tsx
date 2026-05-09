"use client";

import { track } from "@/lib/core/analytics";
import { buildWhatsAppLink, formatWhatsAppMessage } from "@/lib/whatsapp";

export default function WhatsAppFloat() {
  const whatsappLink = buildWhatsAppLink(
    formatWhatsAppMessage(
      "Hello, I would like to book a room. Please share availability and pricing.",
      { source: "float_button" }
    )
  );

  /* =========================================================
     WHATSAPP CLICK (PURE EVENT EMISSION)
     ========================================================= */

  const handleClick = () => {
    track("whatsapp_click", {}, "float_button");

    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg z-50"
      aria-label="Chat on WhatsApp"
    >
      💬
    </button>
  );
}
