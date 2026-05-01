"use client";

import { HOTEL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnelEvents";

export default function Reviews() {
  const reviews = [
    {
      text: "Best hotel in Meru with excellent service and clean rooms.",
      author: "Google Guest",
    },
    {
      text: "Very comfortable stay. Perfect for business and leisure.",
      author: "Verified Guest",
    },
    {
      text: "Great conference facilities near Mt Kenya region.",
      author: "Corporate Client",
    },
  ];

  return (
    <section
      className="p-6"
      onMouseEnter={() => setFunnelStep("INTENT")}
    >

      <h2 className="text-xl font-bold text-yellow-500">
        Guest Reviews – {HOTEL.identity.name}
      </h2>

      <div className="grid gap-3 mt-3">

        {reviews.map((review, index) => (
          <div
            key={index}
            className="card"
          >

            <p className="text-gray-300">
              “{review.text}”
            </p>

            <p className="text-sm text-gray-500 mt-2">
              — {review.author}
            </p>

          </div>
        ))}

      </div>

      <div className="mt-6 text-center">

        <a
          href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encodeURIComponent(
            "Hello, I saw your reviews and would like to book a stay at Three Steers Hotel Meru."
          )}`}
          className="px-6 py-3 bg-green-600 text-white rounded-lg inline-block"
          onClick={() => {
            trackEvent("whatsapp_click", {
              source: "reviews",
            });

            // FIX: align with corrected funnel logic
            setFunnelStep("INTENT");
          }}
        >
          Book Based on Reviews
        </a>

      </div>

    </section>
  );
}
