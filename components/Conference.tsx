"use client";

import { HOTEL } from "@/lib/config";
import { IMAGES } from "@/lib/images";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics/trackEvent";

export default function Conference() {
  const whatsappNumber = HOTEL.contact.phone.whatsapp.replace(/\s/g, "");

  const enquiryMessage = encodeURIComponent(
    `Hello, I would like to book a conference space at ${HOTEL.identity.name} in ${HOTEL.location.city}. Please share availability, pricing, and package details.`
  );

  return (
    <section className="p-6 bg-zinc-900">

      {/* TITLE */}
      <h2 className="text-xl font-bold text-yellow-500">
        Conference & Event Spaces in {HOTEL.location.city}, {HOTEL.location.country}
      </h2>

      <p className="text-gray-400 mt-2">
        {HOTEL.identity.name} provides fully equipped conference and event facilities
        designed for corporate meetings, seminars, workshops, and private events in{" "}
        {HOTEL.location.full}.
      </p>

      {/* FEATURES */}
      <ul className="mt-4 text-sm text-gray-300 space-y-2">
        <li>✔ Flexible spaces (10 – 300 guests)</li>
        <li>✔ High-speed WiFi & AV equipment</li>
        <li>✔ Dedicated event coordination team</li>
        <li>✔ Full catering and beverage services</li>
      </ul>

      {/* VISUAL GRID */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">

        {/* SUMMIT HALL */}
        <div
          className="relative h-60 rounded-lg overflow-hidden cursor-pointer"
          onClick={() =>
            trackEvent("room_view", {
              source: "conference",
              space: "Summit Hall",
            })
          }
        >
          <Image
            src={IMAGES.conference?.summitHall || "/images/placeholder.jpg"}
            alt={`Summit Hall at ${HOTEL.identity.name}`}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-3">
            <h3 className="font-bold text-yellow-400">
              Summit Hall
            </h3>
            <p className="text-xs text-white">
              Ideal for large corporate conferences & official events
            </p>
          </div>
        </div>

        {/* BOARDROOM */}
        <div
          className="relative h-60 rounded-lg overflow-hidden cursor-pointer"
          onClick={() =>
            trackEvent("room_view", {
              source: "conference",
              space: "Conference Room 2",
            })
          }
        >
          <Image
            src={IMAGES.conference?.boardroom || "/images/placeholder.jpg"}
            alt={`Conference Room at ${HOTEL.identity.name}`}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-3">
            <h3 className="font-bold text-yellow-400">
              Conference Room 2
            </h3>
            <p className="text-xs text-white">
              Perfect for meetings, workshops & executive sessions
            </p>
          </div>
        </div>

      </div>

      {/* CTA */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${enquiryMessage}`}
        className="mt-6 inline-block px-6 py-3 bg-green-600 text-white rounded-lg"
        onClick={() => {
          trackEvent("booking_intent", {
            source: "conference_cta",
          });
        }}
      >
        Make Enquiry
      </a>

    </section>
  );
}
