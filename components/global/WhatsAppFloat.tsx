"use client";

import { trackEvent } from "@/lib/analytics/trackEvent";
import { HOTEL } from "@/lib/config";
import { setFunnelStep } from "@/lib/analytics/funnel";

export default function WhatsAppFloat() {
  const whatsappNumber = HOTEL.contact.phone.whatsapp
    .replace("+", "")
    .replace(/\s/g, "");

  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to book a room at ${HOTEL.identity.name} in ${HOTEL.location.city}.`
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleClick = () => {
    trackEvent("whatsapp_click", {
      source: "float_button",
    });

    setFunnelStep("INTENT");
  };

  return (
    <a
      href={whatsappLink}
      onClick={handleClick}
      className="fixed bottom-20 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg z-50"
      aria-label="Chat on WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      💬
    </a>
  );
}
