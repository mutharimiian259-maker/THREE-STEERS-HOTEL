"use client";

import { HOTEL } from "@/lib/config/hotel";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnelEvents";

export default function Dining() {
  return (
    <section
      className="p-6"
      onMouseEnter={() => setFunnelStep("VISIT")}
    >

      <h2 className="text-xl font-bold text-yellow-500">
        Restaurants & Dining at {HOTEL.identity.name}, {HOTEL.location.city}
      </h2>

      <p className="text-gray-400 mt-2">
        Enjoy a refined culinary experience at {HOTEL.identity.name} featuring expertly crafted
        dishes, premium service, and relaxing dining environments in {HOTEL.location.full}.
      </p>

      <div className="grid md:grid-cols-3 gap-4 mt-4">

        <div
          className="card"
          onMouseEnter={() =>
            trackEvent("room_view", { source: "dining_aberdares" })
          }
        >
          <h3 className="font-bold text-yellow-500">Aberdares Restaurant</h3>
          <p className="text-sm text-gray-400">
            A diverse menu offering local and international cuisine for all tastes.
          </p>
        </div>

        <div
          className="card"
          onMouseEnter={() =>
            trackEvent("room_view", { source: "dining_nyambene" })
          }
        >
          <h3 className="font-bold text-yellow-500">Nyambene Restaurant</h3>
          <p className="text-sm text-gray-400">
            Contemporary dining space serving fresh, modern, and authentic dishes.
          </p>
        </div>

        <div
          className="card"
          onMouseEnter={() =>
            trackEvent("room_view", { source: "dining_masters_lounge" })
          }
        >
          <h3 className="font-bold text-yellow-500">Master’s Lounge</h3>
          <p className="text-sm text-gray-400">
            Relaxed lounge atmosphere perfect for drinks, meetings, and socializing.
          </p>
        </div>

      </div>

      <div className="mt-6 text-center">

        <a
          href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encodeURIComponent(
            "Hello, I would like to inquire about dining reservations at " +
              HOTEL.identity.name +
              " in " +
              HOTEL.location.city
          )}`}
          className="px-6 py-3 bg-green-600 text-white rounded-lg inline-block"
          onClick={() => {
            trackEvent("booking_intent", {
              source: "dining_cta",
            });
            setFunnelStep("CONTACT");
          }}
        >
          Reserve a Table
        </a>

      </div>

    </section>
  );
}
