"use client";

import { HOTEL } from "@/lib/config";
import { IMAGES } from "@/lib/images";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnel";

export default function Accommodation() {
  const whatsappNumber = HOTEL.contact.phone.whatsapp.replace(/\s/g, "");

  const message = encodeURIComponent(
    `Hello, I would like to book accommodation at ${HOTEL.identity.name} in ${HOTEL.location.city}. Please assist with availability and room options.`
  );

  return (
    <section className="p-6 bg-zinc-900">

      {/* TITLE */}
      <h2 className="text-xl font-bold text-yellow-500">
        Hotel Accommodation in Meru, Kenya
      </h2>

      <p className="text-gray-400 mt-2">
        {HOTEL.identity.name} offers multiple accommodation categories across Batian and Lenana wings,
        designed for business travelers, tourists, and families visiting {HOTEL.location.city}.
      </p>

      {/* WINGS */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">

        {/* BATIAN WING */}
        <div
          className="relative h-64 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => {
            trackEvent("room_view", {
              source: "accommodation",
              wing: "batian",
            });
          }}
        >
          <Image
            src={IMAGES.rooms?.batian?.executiveSuite || "/images/placeholder.jpg"}
            alt={`Batian Wing at ${HOTEL.identity.name}`}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
            <h3 className="font-bold text-yellow-400 text-lg">
              Batian Wing
            </h3>
            <p className="text-sm text-white">
              Premium rooms offering modern luxury and business-class comfort.
            </p>
          </div>
        </div>

        {/* LENANA WING */}
        <div
          className="relative h-64 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => {
            trackEvent("room_view", {
              source: "accommodation",
              wing: "lenana",
            });
          }}
        >
          <Image
            src={IMAGES.rooms?.lenana?.familyRoom || "/images/placeholder.jpg"}
            alt={`Lenana Wing at ${HOTEL.identity.name}`}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
            <h3 className="font-bold text-yellow-400 text-lg">
              Lenana Wing
            </h3>
            <p className="text-sm text-white">
              Cozy and peaceful rooms ideal for leisure and comfort-focused stays.
            </p>
          </div>
        </div>

      </div>

      {/* SUPPORT TEXT */}
      <p className="text-gray-400 mt-6 text-sm">
        With multiple room categories, guests can choose between luxury business stays
        and affordable comfort options tailored to their needs.
      </p>

      {/* CTA */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        className="mt-5 inline-block px-6 py-3 bg-green-600 text-white rounded-lg"
        onClick={() => {
          trackEvent("booking_intent", {
            source: "accommodation_cta",
          });

          setFunnelStep("INTENT");
        }}
      >
        Book Your Room
      </a>

    </section>
  );
}
