"use client";

import { HOTEL } from "@/lib/config";

const facilities = [
  "Free High-Speed WiFi",
  "Secure Parking",
  "Conference & Meeting Rooms",
  "On-site Restaurant & Bar",
  "24/7 Front Desk",
  "Room Service",
  "Airport Transfers",
  "Laundry Services",
];

export default function Facilities() {
  return (
    <section className="p-6 bg-zinc-900">

      <h2 className="text-2xl font-bold text-yellow-500 text-center">
        Premium Facilities at {HOTEL.identity.name}
      </h2>

      <p className="text-gray-400 text-center mt-2 max-w-xl mx-auto">
        Enjoy premium comfort and convenience with modern facilities
        designed for both business and leisure guests in {HOTEL.location.city}.
      </p>

      <ul className="grid md:grid-cols-4 gap-4 mt-8 list-none">

        {facilities.map((item) => (
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
