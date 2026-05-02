"use client";

import { HOTEL } from "@/lib/config";
import { IMAGES } from "@/lib/images";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics/trackEvent";

export default function Dining() {
  return (
    <section className="p-6">

      {/* TITLE */}
      <h2 className="text-xl font-bold text-yellow-500">
        Restaurants & Dining at {HOTEL.identity.name}, {HOTEL.location.city}
      </h2>

      <p className="text-gray-400 mt-2">
        Enjoy a refined culinary experience at {HOTEL.identity.name} featuring expertly crafted
        dishes, premium service, and relaxing dining environments in {HOTEL.location.full}.
      </p>

      {/* VISUAL DINING GRID */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">

        {/* Aberdares Restaurant */}
        <div
          className="relative h-56 rounded-lg overflow-hidden cursor-pointer"
          onClick={() =>
            trackEvent("dining_view", { restaurant: "Aberdares Restaurant" })
          }
        >
          <Image
            src={IMAGES.food.fineDining}
            alt="Aberdares Restaurant"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-3">
            <h3 className="font-bold text-yellow-400">
              Aberdares Restaurant
            </h3>
            <p className="text-xs text-white">
              Local & international cuisine crafted by expert chefs
            </p>
          </div>
        </div>

        {/* Nyambene Restaurant */}
        <div
          className="relative h-56 rounded-lg overflow-hidden cursor-pointer"
          onClick={() =>
            trackEvent("dining_view", { restaurant: "Nyambene Restaurant" })
          }
        >
          <Image
            src={IMAGES.food.buffetBreakfast}
            alt="Nyambene Restaurant"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-3">
            <h3 className="font-bold text-yellow-400">
              Nyambene Restaurant
            </h3>
            <p className="text-xs text-white">
              Fresh, modern and authentic dining experience
            </p>
          </div>
        </div>

        {/* Master’s Lounge */}
        <div
          className="relative h-56 rounded-lg overflow-hidden cursor-pointer"
          onClick={() =>
            trackEvent("dining_view", { restaurant: "Master’s Lounge" })
          }
        >
          <Image
            src={IMAGES.food.drinks}
            alt="Master’s Lounge"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-3">
            <h3 className="font-bold text-yellow-400">
              Master’s Lounge
            </h3>
            <p className="text-xs text-white">
              Relaxed atmosphere for drinks, meetings & socializing
            </p>
          </div>
        </div>

      </div>

      {/* CTA */}
      <div className="mt-6 text-center">

        <a
          href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encodeURIComponent(
            "Hello, I would like to reserve a dining table at " +
              HOTEL.identity.name +
              " in " +
              HOTEL.location.city
          )}`}
          className="px-6 py-3 bg-green-600 text-white rounded-lg inline-block"
          onClick={() => {
            trackEvent("booking_intent", {
              source: "dining_cta",
            });
          }}
        >
          Reserve a Table
        </a>

      </div>

    </section>
  );
}
