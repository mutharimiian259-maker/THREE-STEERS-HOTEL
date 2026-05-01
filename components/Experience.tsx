"use client";

import { HOTEL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics/trackEvent";

const experiences = [
  { id: "mt-kenya-hiking", name: "Mt Kenya Hiking" },
  { id: "ngare-ndare-forest", name: "Ngare Ndare Forest" },
  { id: "lewa-conservancy", name: "Lewa Conservancy Safari" },
];

export default function Experience() {
  return (
    <section className="p-6">

      <h2 className="text-xl font-bold text-yellow-500">
        Top Things to Do in {HOTEL.location.city}, {HOTEL.location.region}
      </h2>

      <p className="text-gray-400 mt-2">
        Discover exciting outdoor adventures and tourist attractions near {HOTEL.identity.name},
        including Mt Kenya hiking, wildlife safaris, and cultural experiences in {HOTEL.location.region}.
      </p>

      <ul className="grid md:grid-cols-3 gap-4 mt-4">

        {experiences.map((item) => (
          <li
            key={item.id}
            className="card text-center font-medium hover:border-yellow-500 transition"
          >
            {item.name}
          </li>
        ))}

      </ul>

      <div className="mt-6 text-center">

        <a
          href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encodeURIComponent(
            "Hello, I would like to book a stay at " +
              HOTEL.identity.name +
              " and explore experiences around " +
              HOTEL.location.city
          )}`}
          className="btn btn-green inline-block"
          onClick={() => {
            trackEvent("booking_intent", {
              source: "experience_cta",
            });

            // FIX: align funnel model consistently
            // experience CTA = intent stage, not contact
          }}
        >
          Book Stay + Experiences
        </a>

      </div>

    </section>
  );
}
