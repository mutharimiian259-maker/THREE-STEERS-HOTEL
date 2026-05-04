"use client";

import { trackEvent } from "@/lib/analytics/trackEvent";
import { trackLead } from "@/lib/analytics/trackLead";
import { HOTEL } from "@/lib/config";

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
    trackEvent("whatsapp_click", {
      source: "float_button",
    });

    trackLead("whatsapp_click");

    // ensure event is not lost on fast navigation
    setTimeout(() => {
      window.open(whatsappLink, "_blank", "noopener,noreferrer");
    }, 120);
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
