"use client";

import Link from "next/link";
import { HOTEL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnel";
import { IMAGES } from "@/lib/images";
import Image from "next/image";

export default function Hero() {
  const heroImage =
    IMAGES.hotel.exteriorHero || "/images/hotel/exterior-hero.jpg";

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <Image
        src={heroImage}
        alt="Three Steers Hotel exterior view"
        fill
        priority
        sizes="100vw"
        className="object-cover z-0"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* CONTENT */}
      <div className="max-w-3xl relative z-20">

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

        {/* TRUST + URGENCY */}
        <p className="text-gray-300 mt-2 text-sm">
          Trusted by business travelers & tourists visiting Mt Kenya region
        </p>

        <p className="text-red-400 mt-1 text-sm">
          Limited rooms available — secure your stay today
        </p>

        {/* CTA */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">

          {/* PRIMARY CTA */}
          <a
            href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encodeURIComponent(
              "Hello, I would like to book a room at Three Steers Hotel Meru. Please assist with availability, dates, and pricing."
            )}`}
            className="btn btn-green"
            onClick={() => {
              trackEvent("whatsapp_click", { source: "hero" });
              setFunnelStep("CONTACT");
            }}
          >
            💬 Book via WhatsApp
          </a>

          {/* SECONDARY CTA */}
          <a
            href={`tel:${HOTEL.contact.phone.primary}`}
            className="btn btn-gold"
            onClick={() => {
              trackEvent("call_click", { source: "hero" });
              setFunnelStep("CONTACT");
            }}
          >
            📞 Call Reception
          </a>

          {/* EXPLORATION CTA */}
          <Link
            href="/rooms"
            className="btn"
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
