"use client";

import { HOTEL } from "@/lib/config";
import { track } from "@/lib/core/analytics";

export default function WhatsAppFloat() {
  const whatsappNumber = HOTEL.contact.phone.whatsapp.replace(
    /[^\d]/g,
    ""
  );

  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to book a room at ${HOTEL.identity.name} in ${HOTEL.location.city}.`
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleClick = () => {
    track("whatsapp_click", {
      source: "float_button",
    });

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
