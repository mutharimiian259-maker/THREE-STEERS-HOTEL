"use client";

import { HOTEL } from "@/lib/config";
import { track } from "@/lib/core/analytics";

export default function ContactInfo() {
  const phone = HOTEL.contact.phone.primary.replace(/\s/g, "");

  return (
    <section className="p-6 bg-black text-center">

      {/* TITLE */}
      <h2 className="text-xl font-bold text-yellow-500">
        Contact {HOTEL.identity.name}
      </h2>

      {/* EMAIL */}
      <a
        href={`mailto:${HOTEL.contact.email}`}
        className="block mt-2 text-gray-400 hover:text-white"
        onClick={() => {
          track(
            "navigation",
            {
              action: "email_click",
              source: "contact_section",
              destination: "email",
            },
            "contact_section"
          );
        }}
      >
        {HOTEL.contact.email}
      </a>

      {/* PHONE DISPLAY */}
      <p className="text-gray-400 mt-1">
        {HOTEL.contact.phone.primary}
      </p>

      {/* CTA BLOCK */}
      <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">

        {/* CALL CTA */}
        <a
          href={`tel:${phone}`}
          className="px-6 py-3 bg-yellow-500 text-black rounded-lg"
          onClick={() => {
            track(
              "call_click",
              {
                action: "contact_call",
                source: "contact_section",
              },
              "contact_section"
            );
          }}
        >
          Call Now
        </a>

        {/* WHATSAPP CTA */}
        <a
          href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encodeURIComponent(
            "Hello, I would like to book a stay at " +
              HOTEL.identity.name +
              ". Please assist with availability, room options, and pricing."
          )}`}
          className="px-6 py-3 bg-green-600 text-white rounded-lg"
          onClick={() => {
            track(
              "whatsapp_click",
              {
                action: "contact_whatsapp",
                source: "contact_section",
              },
              "contact_section"
            );
          }}
        >
          WhatsApp Booking
        </a>

      </div>

    </section>
  );
}
