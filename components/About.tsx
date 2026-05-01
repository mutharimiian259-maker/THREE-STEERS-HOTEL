"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnelEvents";
import { HOTEL } from "@/lib/config/hotel";

export default function About() {
  const whatsappNumber = HOTEL.contact.phone.whatsapp
    .replace("+", "")
    .replace(/\s/g, "");

  return (
    <section className="p-6" onMouseEnter={() => setFunnelStep("VISIT")}>

      <h2 className="text-2xl font-bold text-yellow-500">
        About {HOTEL.identity.name} – {HOTEL.location.city}, Kenya
      </h2>

      <p className="text-gray-300 mt-3 leading-relaxed">
        {HOTEL.identity.name} is a leading hotel in {HOTEL.location.city}, Kenya,
        offering premium accommodation, modern conference facilities,
        and exceptional hospitality near the Mt Kenya region.
      </p>

      <h3 className="text-lg font-semibold text-yellow-400 mt-4">
        Accommodation Experience
      </h3>

      <p className="text-gray-400 mt-2 leading-relaxed">
        We feature 11 unique room categories designed for business travelers,
        tourists, families, and groups seeking comfort, security, and convenience
        in {HOTEL.location.city}.
      </p>

      <h3 className="text-lg font-semibold text-yellow-400 mt-4">
        Facilities & Services
      </h3>

      <p className="text-gray-400 mt-2">
        Guests enjoy restaurants, conference halls, fitness facilities, landscaped gardens,
        ample parking, and premium hospitality services for both short and long stays.
      </p>

      {/* INTERNAL NAVIGATION */}
      <div className="mt-6 flex gap-4 flex-wrap">

        <Link
          href="/rooms"
          className="text-yellow-500 underline"
          onClick={() =>
            trackEvent("page_view", { source: "about_rooms" })
          }
        >
          View Rooms
        </Link>

        <Link
          href="/#dining"
          className="text-yellow-500 underline"
          onClick={() =>
            trackEvent("page_view", { source: "about_dining" })
          }
        >
          Explore Dining
        </Link>

        <Link
          href="/#booking"
          className="text-yellow-500 underline"
          onClick={() => setFunnelStep("INTENT")}
        >
          Book Now
        </Link>

      </div>

      {/* WHATSAPP CTA */}
      <div className="mt-6">

        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            "Hello, I would like to know more about Three Steers Hotel and make a booking."
          )}`}
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg"
          onClick={() => {
            trackEvent("whatsapp_click", { source: "about_section" });
            setFunnelStep("CONTACT");
          }}
        >
          Talk to Reservations
        </a>

      </div>

    </section>
  );
}
