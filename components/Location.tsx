"use client";

import { HOTEL } from "@/lib/config";
import { track } from "@/lib/core/analytics";

export default function Location() {
  const locationQuery = encodeURIComponent(
    `${HOTEL.identity.name} ${HOTEL.location.city}`
  );

  const whatsappMessage = encodeURIComponent(
    `Hello, I would like directions and booking information for ${HOTEL.identity.name} in ${HOTEL.location.city}.`
  );

  const whatsappLink = `https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${whatsappMessage}`;

  const handleDirectionsClick = () => {
    track(
      "navigation",
      {
        action: "get_directions",
        source: "location",
      },
      "location"
    );
  };

  const handleWhatsAppClick = () => {
    track(
      "whatsapp_click",
      {
        action: "location_booking",
      },
      "location"
    );
  };

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
          className="px-6 py-3 bg-yellow-500 text-black rounded-lg text-center"
          href={`https://www.google.com/maps/dir/?api=1&destination=${locationQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDirectionsClick}
        >
          📍 Get Directions
        </a>

        {/* WHATSAPP */}
        <a
          className="px-6 py-3 bg-green-600 text-white rounded-lg text-center"
          href={whatsappLink}
          onClick={handleWhatsAppClick}
        >
          💬 Book via WhatsApp
        </a>

      </div>

    </section>
  );
}
