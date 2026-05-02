"use client";

import { HOTEL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnel";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      text: "Best hotel in Meru with excellent service and clean rooms.",
      author: "Google Guest",
      type: "Traveler",
    },
    {
      id: 2,
      text: "Very comfortable stay. Perfect for business and leisure.",
      author: "Verified Guest",
      type: "Business Traveler",
    },
    {
      id: 3,
      text: "Great conference facilities near Mt Kenya region.",
      author: "Corporate Client",
      type: "Corporate Booking",
    },
  ];

  return (
    <section className="p-6">

      {/* TITLE */}
      <h2 className="text-xl font-bold text-yellow-500">
        Guest Reviews – {HOTEL.identity.name}
      </h2>

      {/* SUBTEXT */}
      <p className="text-gray-400 mt-2">
        Real experiences from travelers, business guests, and corporate clients who have stayed at {HOTEL.identity.name}.
      </p>

      {/* REVIEWS GRID */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">

        {reviews.map((review) => (
          <div
            key={review.id}
            className="card relative bg-white p-4 border border-zinc-200"
          >

            {/* QUOTE MARK (VISUAL EMPHASIS) */}
            <span className="text-yellow-500 text-2xl font-bold">“</span>

            {/* REVIEW TEXT */}
            <p className="text-gray-700 mt-2 leading-relaxed">
              {review.text}
            </p>

            {/* AUTHOR */}
            <p className="text-sm text-gray-500 mt-3">
              — {review.author}
            </p>

            {/* TYPE BADGE */}
            <span className="inline-block mt-2 text-xs px-2 py-1 bg-zinc-100 text-zinc-600 rounded">
              {review.type}
            </span>

          </div>
        ))}

      </div>

      {/* CTA */}
      <div className="mt-8 text-center">

        <a
          href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encodeURIComponent(
            "Hello, I saw your guest reviews and would like to book a stay at " +
              HOTEL.identity.name +
              ". Please assist me with availability and pricing."
          )}`}
          className="px-6 py-3 bg-green-600 text-white rounded-lg inline-block font-semibold"
          onClick={() => {
            trackEvent("whatsapp_click", {
              source: "reviews",
            });

            setFunnelStep("INTENT");
          }}
        >
          Book Your Stay Now
        </a>

      </div>

    </section>
  );
}
