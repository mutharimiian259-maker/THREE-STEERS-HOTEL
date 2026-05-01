"use client";

import { HOTEL } from "@/lib/config/hotel";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnelEvents";

export default function ContactInfo() {
  const phone = HOTEL.contact.phone.primary.replace(/\s/g, "");

  return (
    <section className="p-6 bg-black text-center">

      <h2 className="text-xl font-bold text-yellow-500">
        Contact {HOTEL.identity.name}
      </h2>

      {/* EMAIL (SOFT INTENT) */}
      <a
        href={`mailto:${HOTEL.contact.email}`}
        className="block mt-2 text-gray-400 hover:text-white"
        onClick={() => {
          trackEvent("booking_intent", { source: "email_contact" });
        }}
      >
        {HOTEL.contact.email}
      </a>

      <p className="text-gray-400 mt-1">
        {HOTEL.contact.phone.primary}
      </p>

      <div className="mt-4">

        {/* CALL (HIGH INTENT) */}
        <a
          href={`tel:${phone}`}
          className="px-6 py-2 bg-yellow-500 text-black rounded-lg m-2 inline-block"
          onClick={() => {
            trackEvent("call_click", { source: "contact_section" });
            setFunnelStep("INTENT");
          }}
        >
          Call Now
        </a>

        {/* WHATSAPP (CONVERSION ACTION) */}
        <a
          href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encodeURIComponent(
            "Hello, I would like to make a booking at " +
              HOTEL.identity.name
          )}`}
          className="px-6 py-2 bg-green-600 text-white rounded-lg m-2 inline-block"
          onClick={() => {
            trackEvent("whatsapp_click", { source: "contact_section" });
            setFunnelStep("CONTACT");
          }}
        >
          WhatsApp
        </a>

      </div>

    </section>
  );
}
