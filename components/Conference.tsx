"use client";

import { HOTEL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics/trackEvent";

export default function Conference() {
  return (
    <section className="p-6 bg-zinc-900">

      <h2 className="text-xl font-bold text-yellow-500">
        Conference & Event Spaces in {HOTEL.location.city}, {HOTEL.location.country}
      </h2>

      <p className="text-gray-400 mt-2">
        {HOTEL.identity.name} provides fully equipped conference and event facilities
        designed for corporate meetings, seminars, workshops, and private events in {HOTEL.location.full}.
      </p>

      <ul className="mt-3 text-sm text-gray-300 space-y-2">
        <li>✔ Flexible spaces (10 – 300 guests)</li>
        <li>✔ High-speed WiFi & AV equipment</li>
        <li>✔ Dedicated event coordination team</li>
        <li>✔ Full catering and beverage services</li>
      </ul>

      <div className="grid md:grid-cols-2 gap-4 mt-4">

        <div className="card">
          <h3 className="font-bold text-yellow-500">Summit Hall</h3>
          <p className="text-sm text-gray-400">
            Ideal for large corporate events, conferences, and official gatherings.
          </p>
        </div>

        <div className="card">
          <h3 className="font-bold text-yellow-500">Conference Room 2</h3>
          <p className="text-sm text-gray-400">
            Perfect for board meetings, workshops, and small seminars.
          </p>
        </div>

      </div>

      <a
        href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encodeURIComponent(
          "Hello, I would like to book a conference space at " +
            HOTEL.identity.name +
            " in " +
            HOTEL.location.city
        )}`}
        className="mt-4 inline-block px-6 py-3 bg-green-600 text-white rounded-lg"
        onClick={() => {
          trackEvent("booking_intent", {
            source: "conference_cta",
          });

          // FIX: unified funnel model
          // DO NOT downgrade to CONTACT
        }}
      >
        Make Enquiry
      </a>

    </section>
  );
}
