"use client";

import { useEffect, useState } from "react";
import { HOTEL } from "@/lib/config/hotel";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnelEvents";

export default function ExitIntentModal() {
  const [show, setShow] = useState(false);

  const whatsappNumber = HOTEL.contact.phone.whatsapp
    .replace("+", "")
    .replace(/\s/g, "");

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem("exit_intent_shown")) return;

    if (window.innerWidth < 768) return;

    let triggered = false;

    const handler = (e: MouseEvent) => {
      if (e.clientY < 10 && !triggered) {
        triggered = true;

        sessionStorage.setItem("exit_intent_shown", "true");

        setFunnelStep("INTENT");

        trackEvent("booking_intent", {
          source: "exit_intent",
        });

        setShow(true);
      }
    };

    const timer = setTimeout(() => {
      window.addEventListener("mousemove", handler);
    }, 5000);

    return () => {
      clearTimeout(timer);
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

        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            "Hello, I saw your website and would like to book a room at Three Steers Hotel Meru."
          )}`}
          className="mt-4 inline-block bg-green-500 text-white px-5 py-2 rounded"
          onClick={() => {
            trackEvent("whatsapp_click", {
              source: "exit_intent",
            });
            setFunnelStep("CONTACT");
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book via WhatsApp
        </a>

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
