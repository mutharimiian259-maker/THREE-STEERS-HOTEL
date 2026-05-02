"use client";

import { HOTEL } from "@/lib/config";
import { IMAGES } from "@/lib/images";
import Image from "next/image";

export default function Facilities() {
  return (
    <section className="p-6 bg-zinc-900">

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-yellow-500 text-center">
        Premium Facilities at {HOTEL.identity.name}
      </h2>

      <p className="text-gray-400 text-center mt-2 max-w-xl mx-auto">
        Enjoy premium comfort and convenience with modern facilities
        designed for both business and leisure guests in {HOTEL.location.city}.
      </p>

      {/* IMAGE TRUST STRIP */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">

        <div className="relative h-56 rounded-lg overflow-hidden">
          <Image
            src={IMAGES.hotel.lobby}
            alt="Hotel lobby interior"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end p-3">
            <p className="text-white text-sm font-medium">
              Elegant Lobby Experience
            </p>
          </div>
        </div>

        <div className="relative h-56 rounded-lg overflow-hidden">
          <Image
            src={IMAGES.hotel.garden}
            alt="Hotel garden relaxation area"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end p-3">
            <p className="text-white text-sm font-medium">
              Relaxing Garden Spaces
            </p>
          </div>
        </div>

        <div className="relative h-56 rounded-lg overflow-hidden">
          <Image
            src={IMAGES.hotel.reception}
            alt="Hotel reception area"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end p-3">
            <p className="text-white text-sm font-medium">
              24/7 Professional Reception
            </p>
          </div>
        </div>

      </div>

      {/* FACILITIES LIST (KEPT BUT IMPROVED) */}
      <ul className="grid md:grid-cols-4 gap-4 mt-10 list-none">

        {[
          "Free High-Speed WiFi",
          "Secure Parking",
          "Conference & Meeting Rooms",
          "On-site Restaurant & Bar",
          "24/7 Front Desk",
          "Room Service",
          "Airport Transfers",
          "Laundry Services",
        ].map((item) => (
          <li
            key={item}
            className="bg-black border border-zinc-800 p-4 rounded-lg text-center hover:border-yellow-500 transition"
          >
            <p className="text-white text-sm">{item}</p>
          </li>
        ))}

      </ul>

    </section>
  );
}
