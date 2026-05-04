"use client";

import { useEffect, useState } from "react";
import { HOTEL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { trackLead } from "@/lib/analytics/trackLead";

export default function ExitIntentModal() {
  const [show, setShow] = useState(false);

  const whatsappNumber = HOTEL.contact.phone.whatsapp
    .replace(/[^\d]/g, "");

  const whatsappMessage = encodeURIComponent(
    `Hello, I saw your website and would like to book a room at ${HOTEL.identity.name} in ${HOTEL.location.city}.`
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click", {
      source: "exit_intent",
      context: "exit_modal",
    });

    trackLead("whatsapp_click");

    // ensure tracking is not lost
    setTimeout(() => {
      window.open(whatsappLink, "_blank", "noopener,noreferrer");
    }, 120);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadyShown = sessionStorage.getItem("exit_intent_shown");
    if (alreadyShown) return;

    if (window.innerWidth < 768) return;

    let triggered = false;
    let lastY = 0;

    const handler = (e: MouseEvent) => {
      // improved intent detection: upward fast exit only
      const isIntentExit =
        e.clientY <= 5 && e.clientY < lastY;

      lastY = e.clientY;

      if (isIntentExit && !triggered) {
        triggered = true;

        sessionStorage.setItem("exit_intent_shown", "true");

        trackEvent("whatsapp_click", {
          source: "exit_intent_trigger",
        });

        setShow(true);
      }
    };

    const enableListener = setTimeout(() => {
      window.addEventListener("mousemove", handler);
    }, 4000);

    return () => {
      clearTimeout(enableListener);
      window.removeEventListener("mousemove", handler);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded max-w-md text-center shadow-lg">

        <h2 className="text-xl font-bold">
          Wait! Before you go
        </h2>

        <p className="text-gray-600 mt-2">
          Book directly with {HOTEL.identity.name} for better rates and instant confirmation.
        </p>

        <button
          onClick={handleWhatsAppClick}
          className="mt-4 inline-block bg-green-500 text-white px-5 py-2 rounded"
        >
          Book via WhatsApp
        </button>

        <button
          onClick={() => setShow(false)}
          className="block mt-3 text-sm text-gray-500"
        >
          Close
        </button>

      </div>

    </div>
  );
}
