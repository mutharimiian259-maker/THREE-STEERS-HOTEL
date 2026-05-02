"use client";

import { HOTEL } from "@/lib/config";
import { IMAGES } from "@/lib/images";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnel";

export default function Accommodation() {
  return (
    <section className="p-6 bg-zinc-900">

      {/* TITLE */}
      <h2 className="text-xl font-bold text-yellow-500">
        Hotel Accommodation in Meru, Kenya
      </h2>

      <p className="text-gray-400 mt-2">
        Three Steers Hotel offers 11 accommodation categories across Batian and Lenana wings,
        designed for business travelers, tourists, and families visiting Meru.
      </p>

      {/* VISUAL WING COMPARISON */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">

        {/* BATIAN WING */}
        <div
          className="relative h-64 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => {
            trackEvent("accommodation_view", { wing: "Batian Wing" });
            setFunnelStep("INTENT");
          }}
        >
          <Image
            src={IMAGES.rooms.batian.executiveSuite}
            alt="Batian Wing Premium Rooms"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
            <h3 className="font-bold text-yellow-400 text-lg">
              Batian Wing
            </h3>
            <p className="text-sm text-white">
              Premium rooms offering modern luxury, business-class comfort, and refined elegance.
            </p>
          </div>
        </div>

        {/* LENANA WING */}
        <div
          className="relative h-64 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => {
            trackEvent("accommodation_view", { wing: "Lenana Wing" });
            setFunnelStep("INTENT");
          }}
        >
          <Image
            src={IMAGES.rooms.lenana.familyRoom}
            alt="Lenana Wing Comfortable Rooms"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
            <h3 className="font-bold text-yellow-400 text-lg">
              Lenana Wing
            </h3>
            <p className="text-sm text-white">
              Cozy and peaceful rooms ideal for relaxation, leisure stays, and comfort-focused guests.
            </p>
          </div>
        </div>

      </div>

      {/* SUPPORTING TEXT */}
      <p className="text-gray-400 mt-6 text-sm">
        With 11 accommodation categories, guests can choose between luxury business stays
        and affordable comfort options tailored to their needs.
      </p>

      {/* CTA */}
      <a
        href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encodeURIComponent(
          "Hello, I would like to book a room at " + HOTEL.identity.name
        )}`}
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
