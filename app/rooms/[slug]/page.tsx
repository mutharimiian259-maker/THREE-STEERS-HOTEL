"use client";

import { useEffect, useMemo } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import rooms from "@/data/rooms";
import { generateSEO } from "@/lib/seo";
import { HOTEL } from "@/lib/config";
import { trackLead } from "@/lib/analytics/trackLead";

type Props = {
  params: { slug: string };
};

function getRoom(slug: string) {
  return Array.isArray(rooms)
    ? rooms.find((r) => r.slug === slug)
    : null;
}

/* ---------------- PAGE ---------------- */
export default function RoomPage({ params }: Props) {
  const room = getRoom(params.slug);

  if (!room) return notFound();

  const whatsappNumber = HOTEL.contact.phone.whatsapp;

  const message = useMemo(() => {
    return encodeURIComponent(
      `Hello, I want to book the ${room.name} at ${HOTEL.identity.name}. Please confirm availability, pricing, and check-in details.`
    );
  }, [room.name]);

  /* ---------------- ANALYTICS (SAFE HARDENING FIX) ---------------- */
  useEffect(() => {
    trackLead("room_view");
  }, [params.slug]);

  const imageSrc =
    room.image || "/images/hotel/rooms/default-room.jpg";

  const price =
    typeof room.price === "number"
      ? `${room.currency ?? "KES"} ${room.price.toLocaleString()}`
      : "Price on request";

  return (
    <main className="max-w-4xl mx-auto p-6">

      <div className="relative w-full h-72">
        <Image
          src={imageSrc}
          alt={room.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover rounded-xl"
        />
      </div>

      <h1 className="text-3xl font-bold text-yellow-500 mt-4">
        {room.name}
      </h1>

      <p className="text-gray-500 mt-2">
        Experience comfort, privacy, and premium hospitality at {HOTEL.identity.name}.
        Designed for business travelers and leisure guests.
      </p>

      <p className="text-white mt-3 text-lg font-semibold">
        {price} / night
      </p>

      <div className="mt-6 bg-gray-900 text-gray-300 p-4 rounded-lg text-sm">
        <p>✔ Luxury bedding & comfort-focused design</p>
        <p>✔ High-speed WiFi for business travelers</p>
        <p>✔ 24/7 room service & reception support</p>
        <p>✔ Secure parking & premium guest experience</p>
      </div>

      <p className="text-sm text-gray-400 mt-4">
        Most guests book this room for its balance of comfort and value.
      </p>

      <div className="mt-6">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          className="btn btn-green block text-center"
          onClick={() => trackLead("booking_intent")}
        >
          💬 Check Availability & Book Now
        </a>
      </div>

      <div className="mt-4">
        <a
          href={`tel:${HOTEL.contact.phone.primary}`}
          className="btn btn-gold block text-center"
          onClick={() => trackLead("call_click")}
        >
          📞 Call Reception for Instant Booking
        </a>
      </div>

    </main>
  );
}
