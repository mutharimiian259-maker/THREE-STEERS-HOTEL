"use client";

import { HOTEL } from "@/lib/config/hotel";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnelEvents";

export default function Location() {
  return (
    <section
      className="p-6"
      onMouseEnter={() => setFunnelStep("VISIT")}
    >

      <h2 className="text-xl font-bold text-yellow-500">
        Location – {HOTEL.identity.name}, {HOTEL.location.city}
      </h2>

      <p className="text-gray-400 mt-2">
        Located along Meru–Nanyuki Road, {HOTEL.location.full}.
      </p>

      <iframe
        title={`${HOTEL.identity.name} Location Map`}
        className="w-full h-64 mt-4 rounded-lg"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${encodeURIComponent(
          HOTEL.identity.name + " " + HOTEL.location.city
        )}&output=embed`}
        onClick={() => {
          trackEvent("page_view", {
            source: "location_map",
          });
          setFunnelStep("INTENT");
        }}
      />

      <div className="mt-4 flex flex-col md:flex-row gap-3">

        <a
          className="px-6 py-3 bg-yellow-500 text-black rounded-lg inline-block text-center"
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            HOTEL.identity.name + " " + HOTEL.location.city
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackEvent("booking_intent", {
              source: "directions",
            });
            setFunnelStep("INTENT");
          }}
        >
          📍 Get Directions
        </a>

        <a
          className="px-6 py-3 bg-green-600 text-white rounded-lg inline-block text-center"
          href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encodeURIComponent(
            "Hello, I would like directions and booking information for " +
              HOTEL.identity.name +
              " " +
              HOTEL.location.city
          )}`}
          onClick={() => {
            trackEvent("whatsapp_click", {
              source: "location",
            });
            setFunnelStep("CONTACT");
          }}
        >
          💬 Book via WhatsApp
        </a>

      </div>

    </section>
  );
}
