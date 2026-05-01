"use client";

import Link from "next/link";
import { HOTEL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnelEvents";

export default function Hero() {
  return (
    <section className="min-h-[85vh] flex items-center justify-center text-center px-4 relative">

      <div className="absolute inset-0 bg-black/70" />

      <div className="max-w-3xl relative z-10">

        <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 leading-tight">
          Luxury Hotel in {HOTEL.location.city}, Kenya – Book Direct & Save More
        </h1>

        <p className="text-gray-300 mt-4 text-lg">
          Premium accommodation near Mount Kenya with elegant rooms, fine dining,
          conferences, and professional hospitality at {HOTEL.identity.name}.
        </p>

        <p className="text-yellow-400 mt-3 text-sm font-medium">
          ⭐ Rated among top business & travel hotels in {HOTEL.location.city}
        </p>

        <p className="text-gray-400 mt-2 text-sm">
          Limited rooms available — book early to secure best rates
        </p>

        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">

          <a
            href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encodeURIComponent(
              "Hello, I would like to book a room at Three Steers Hotel Meru. Please assist with availability, dates, and pricing."
            )}`}
            className="btn btn-green"
            onClick={() => {
              trackEvent("whatsapp_click", { source: "hero" });

              // FIX: funnel should reflect intent, not contact (clean conversion model)
              setFunnelStep("INTENT");
            }}
          >
            💬 Book via WhatsApp
          </a>

          <a
            href={`tel:${HOTEL.contact.phone.primary}`}
            className="btn btn-gold"
            onClick={() => {
              trackEvent("call_click", { source: "hero" });
            }}
          >
            📞 Call Reception
          </a>

          <Link
            href="/rooms"
            className="btn btn-outline"
            onClick={() => setFunnelStep("ROOM_VIEW")}
          >
            View Rooms & Rates
          </Link>

        </div>

        <p className="text-gray-500 text-xs mt-6">
          Explore why travelers choose {HOTEL.identity.name} for business stays,
          conferences, and luxury accommodation in {HOTEL.location.region}.
        </p>

      </div>

    </section>
  );
}
