"use client";

import { HOTEL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnel";

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
          trackEvent("email_click", {
            source: "contact_section",
          });

          setFunnelStep("VISIT");
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

        {/* CALL CTA → HIGH INTENT CONTACT */}
        <a
          href={`tel:${phone}`}
          className="px-6 py-3 bg-yellow-500 text-black rounded-lg"
          onClick={() => {
            trackEvent("call_click", {
              source: "contact_section",
            });

            setFunnelStep("CONTACT");
          }}
        >
          Call Now
        </a>

        {/* WHATSAPP CTA → STRONG CONVERSION ACTION */}
        <a
          href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encodeURIComponent(
            "Hello, I would like to book a stay at " +
              HOTEL.identity.name +
              ". Please assist with availability, room options, and pricing."
          )}`}
          className="px-6 py-3 bg-green-600 text-white rounded-lg"
          onClick={() => {
            trackEvent("whatsapp_click", {
              source: "contact_section",
            });

            setFunnelStep("CONTACT");
          }}
        >
          WhatsApp Booking
        </a>

      </div>

    </section>
  );
}
