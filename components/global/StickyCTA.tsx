"use client";

import { useRef } from "react";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnel";
import { HOTEL } from "@/lib/config";

export default function StickyCTA() {
  const clickedRef = useRef(false);

  const whatsappNumber = HOTEL.contact.phone.whatsapp
    .replace("+", "")
    .replace(/\s/g, "");

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

    setFunnelStep("INTENT");
  };

  const handleCallClick = () => {
    if (clickedRef.current) return;
    clickedRef.current = true;

    trackEvent("call_click", {
      source: "sticky_cta",
    });

    setFunnelStep("INTENT");
  };

  const phoneLink = `tel:${HOTEL.contact.phone.primary.replace(/\s/g, "")}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white flex justify-between items-center p-3 z-50">

      {/* MESSAGE */}
      <p className="text-sm hidden md:block">
        Book direct for best rates at {HOTEL.identity.name}
      </p>

      {/* ACTIONS */}
      <div className="flex gap-3">

        <a
          href={whatsappLink}
          onClick={handleWhatsAppClick}
          className="bg-green-500 px-4 py-2 rounded text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>

        <a
          href={phoneLink}
          onClick={handleCallClick}
          className="bg-yellow-500 text-black px-4 py-2 rounded text-sm"
        >
          Call
        </a>

      </div>

    </div>
  );
}
