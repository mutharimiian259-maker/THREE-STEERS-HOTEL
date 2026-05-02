"use client";

import Link from "next/link";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnel";
import { HOTEL } from "@/lib/config";
import { IMAGES } from "@/lib/images";

function sanitizePhone(phone: string) {
  return phone.replace(/[^\d]/g, "");
}

export default function About() {
  const whatsappNumber = sanitizePhone(HOTEL.contact.phone.whatsapp);

  return (
    <section className="p-6">

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-yellow-500">
        About {HOTEL.identity.name} – {HOTEL.location.city}, Kenya
      </h2>

      {/* HERO TRUST IMAGE */}
      <div className="relative h-64 mt-4 rounded-lg overflow-hidden">
        <Image
          src={IMAGES.hotel.lobby}
          alt="Three Steers Hotel Lobby"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* DESCRIPTION */}
      <p className="text-gray-300 mt-4 leading-relaxed">
        {HOTEL.identity.name} is a leading hotel in {HOTEL.location.city}, Kenya,
        offering premium accommodation, modern conference facilities,
        and exceptional hospitality near the Mt Kenya region.
      </p>

      {/* ACCOMMODATION */}
      <h3 className="text-lg font-semibold text-yellow-400 mt-4">
        Accommodation Experience
      </h3>

      <p className="text-gray-400 mt-2 leading-relaxed">
        We feature 11 unique room categories designed for business travelers,
        tourists, families, and groups seeking comfort, security, and convenience
        in {HOTEL.location.city}.
      </p>

      {/* FACILITIES VISUAL PROOF */}
      <div className="relative h-56 mt-4 rounded-lg overflow-hidden">
        <Image
          src={IMAGES.hotel.garden}
          alt="Hotel Gardens"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* FACILITIES TEXT */}
      <h3 className="text-lg font-semibold text-yellow-400 mt-4">
        Facilities & Services
      </h3>

      <p className="text-gray-400 mt-2">
        Guests enjoy restaurants, conference halls, fitness facilities, landscaped gardens,
        ample parking, and premium hospitality services for both short and long stays.
      </p>

      {/* NAVIGATION */}
      <div className="mt-6 flex gap-4 flex-wrap">

        <Link
          href="/rooms"
          className="text-yellow-500 underline"
          onClick={() =>
            trackEvent("room_view", { source: "about_rooms" })
          }
        >
          View Rooms
        </Link>

        <Link
          href="/#dining"
          className="text-yellow-500 underline"
          onClick={() =>
            trackEvent("page_view", { source: "about_dining_section" })
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
