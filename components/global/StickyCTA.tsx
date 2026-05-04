"use client";

import { useRef } from "react";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { trackLead } from "@/lib/analytics/trackLead";
import { HOTEL } from "@/lib/config";

export default function StickyCTA() {
  const clickedRef = useRef(false);

  const whatsappNumber = HOTEL.contact.phone.whatsapp.replace(
    /[^\d]/g,
    ""
  );

  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to book a room at ${HOTEL.identity.name} in ${HOTEL.location.city}.`
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleWhatsAppClick = () => {
    if (clickedRef.current) return;
    clickedRef.current = true;

    trackEvent("whatsapp_click", {
      source: "sticky_cta",
    });

    trackLead("whatsapp_click");

    setTimeout(() => {
      window.open(whatsappLink, "_blank", "noopener,noreferrer");
    }, 120);
  };

  const handleCallClick = () => {
    if (clickedRef.current) return;
    clickedRef.current = true;

    trackEvent("call_click", {
      source: "sticky_cta",
    });

    trackLead("call_click");

    setTimeout(() => {
      window.location.href = `tel:${HOTEL.contact.phone.primary.replace(
        /[^\d]/g,
        ""
      )}`;
    }, 80);
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
