"use client";

import { HOTEL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnel";

export default function Location() {
  const locationQuery = encodeURIComponent(
    HOTEL.identity.name + " " + HOTEL.location.city
  );

  return (
    <section className="p-6">

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
        src={`https://www.google.com/maps?q=${locationQuery}&output=embed`}
      />

      <div className="mt-4 flex flex-col md:flex-row gap-3">

        {/* DIRECTIONS */}
        <a
          className="px-6 py-3 bg-yellow-500 text-black rounded-lg inline-block text-center"
          href={`https://www.google.com/maps/dir/?api=1&destination=${locationQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackEvent("navigation", {
              source: "directions",
            });

            setFunnelStep("INTENT");
          }}
        >
          📍 Get Directions
        </a>

        {/* WHATSAPP */}
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
