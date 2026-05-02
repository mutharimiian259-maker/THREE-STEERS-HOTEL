"use client";

import { HOTEL } from "@/lib/config";
import { IMAGES } from "@/lib/images";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics/trackEvent";

const experiences = [
  {
    id: "mt-kenya-hiking",
    name: "Mt Kenya Hiking",
    image: IMAGES.experiences.sunrise,
  },
  {
    id: "ngare-ndare-forest",
    name: "Ngare Ndare Forest",
    image: IMAGES.experiences.natureWalk,
  },
  {
    id: "lewa-conservancy",
    name: "Lewa Conservancy Safari",
    image: IMAGES.experiences.safari,
  },
];

export default function Experience() {
  return (
    <section className="p-6">

      {/* TITLE */}
      <h2 className="text-xl font-bold text-yellow-500">
        Top Things to Do in {HOTEL.location.city}, {HOTEL.location.region}
      </h2>

      <p className="text-gray-400 mt-2">
        Discover exciting outdoor adventures and tourist attractions near {HOTEL.identity.name},
        including Mt Kenya hiking, wildlife safaris, and cultural experiences in {HOTEL.location.region}.
      </p>

      {/* VISUAL EXPERIENCE GRID */}
      <ul className="grid md:grid-cols-3 gap-4 mt-6">

        {experiences.map((item) => (
          <li
            key={item.id}
            className="relative rounded-lg overflow-hidden h-56 cursor-pointer"
            onClick={() =>
              trackEvent("experience_view", {
                experience: item.name,
              })
            }
          >

            {/* IMAGE */}
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/40 flex items-end p-3">
              <p className="text-white font-medium text-sm">
                {item.name}
              </p>
            </div>

          </li>
        ))}

      </ul>

      {/* CTA */}
      <div className="mt-6 text-center">

        <a
          href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encodeURIComponent(
            "Hello, I would like to book a stay at " +
              HOTEL.identity.name +
              " and explore experiences around " +
              HOTEL.location.city
          )}`}
          className="btn btn-green inline-block"
          onClick={() => {
            trackEvent("booking_intent", {
              source: "experience_cta",
            });
          }}
        >
          Book Stay + Experiences
        </a>

      </div>

    </section>
  );
}
