"use client";

import { useEffect } from "react";
import Hero from "@/components/Hero";
import RoomCard from "@/components/RoomCard";
import Facilities from "@/components/Facilities";
import Reviews from "@/components/Reviews";
import Location from "@/components/Location";
import Conference from "@/components/Conference";
import Dining from "@/components/Dining";
import Experience from "@/components/Experience";
import Link from "next/link";

import rooms from "@/data/rooms";
import { HOTEL, getPhoneByLabel } from "@/lib/config";
import { track } from "@/lib/core/analytics";

export default function Home() {
  const safeRooms = Array.isArray(rooms) ? rooms : [];

  /* ---------------------------------------
     PAGE VIEW (CORE ENTRY EVENT)
  --------------------------------------- */
  useEffect(() => {
    track("page_view", {
      page: "home",
      context: "entry",
    });
  }, []);

  /* ---------------------------------------
     CONTACT HELPERS (SINGLE SOURCE OF TRUTH)
  --------------------------------------- */
  const whatsapp = getPhoneByLabel("whatsapp");
  const primaryPhone = getPhoneByLabel("primary");

  return (
    <main>
      {/* HERO */}
      <section id="home">
        <Hero />
      </section>

      {/* ROOMS */}
      <section id="rooms" className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-yellow-500">
            Rooms & Accommodation in {HOTEL.location.city}
          </h2>

          {/* NAVIGATION EVENT ONLY (NO BUSINESS LOGIC MIX) */}
          <Link
            href="/rooms"
            className="text-sm text-yellow-500 underline"
            onClick={() =>
              track("booking_intent", {
                source: "rooms_navigation",
                page: "home",
              })
            }
          >
            View All →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {safeRooms.slice(0, 3).map((room: any, index: number) => (
            <RoomCard key={room?.id ?? index} room={room} />
          ))}
        </div>
      </section>

      {/* FACILITIES */}
      <section id="facilities">
        <Facilities />
      </section>

      {/* CONFERENCE */}
      <section id="conference">
        <Conference />
      </section>

      {/* DINING */}
      <section id="dining">
        <Dining />
      </section>

      {/* EXPERIENCES */}
      <section id="experiences">
        <Experience />
      </section>

      {/* ABOUT */}
      <section id="about" className="p-6">
        <h2 className="text-xl font-bold text-yellow-500">
          Luxury Hotel in {HOTEL.location.city}, {HOTEL.location.country}
        </h2>

        <p className="text-gray-300 mt-3 leading-relaxed">
          {HOTEL.identity.name} is a premier hotel in {HOTEL.location.city},
          offering accommodation, dining, conferences, and hospitality services.
        </p>
      </section>

      {/* REVIEWS */}
      <section id="reviews">
        <Reviews />
      </section>

      {/* LOCATION */}
      <section id="location">
        <Location />
      </section>

      {/* BOOKING CTA */}
      <section id="booking" className="text-center p-10 bg-zinc-900">
        <h2 className="text-3xl font-bold text-yellow-500">
          Book Your Stay at {HOTEL.identity.name}
        </h2>

        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
          Book directly for best rates, instant confirmation, and personalized service.
        </p>

        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">

          {/* WHATSAPP CTA (PURE CONVERSION EVENT) */}
          <a
            href={
              whatsapp
                ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(
                    "Hello, I want to book a room at " + HOTEL.identity.name
                  )}`
                : "#"
            }
            className="px-6 py-3 bg-green-600 text-white rounded-lg"
            onClick={() =>
              track("whatsapp_click", {
                source: "homepage_cta",
                page: "home",
              })
            }
          >
            💬 WhatsApp Booking
          </a>

          {/* CALL CTA (PURE CONVERSION EVENT) */}
          <a
            href={primaryPhone ? `tel:${primaryPhone}` : "#"}
            className="px-6 py-3 bg-yellow-500 text-black rounded-lg"
            onClick={() =>
              track("call_click", {
                source: "homepage_cta",
                page: "home",
              })
            }
          >
            📞 Call Now
          </a>

        </div>
      </section>
    </main>
  );
}
