"use client";

import { useEffect, useMemo } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import rooms from "@/data/rooms";
import { HOTEL } from "@/lib/config";
import { trackLead } from "@/lib/analytics/trackLead";

export default function RoomPage({ params }: any) {
  const room = rooms.find((r) => r.slug === params.slug);

  if (!room) return notFound();

  const whatsappNumber = HOTEL.contact.phone.whatsapp;

  const message = useMemo(() => {
    return encodeURIComponent(
      `Hello, I want to book the ${room.name} at ${HOTEL.identity.name}. Please confirm availability, pricing, and check-in details.`
    );
  }, [room.name]);

  useEffect(() => {
    trackLead("room_view");
  }, []);

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
          className="object-cover rounded-xl"
        />
      </div>

      <h1 className="text-3xl font-bold text-yellow-500 mt-4">
        {room.name}
      </h1>

      <p className="text-gray-500 mt-2">
        Experience comfort and hospitality at {HOTEL.identity.name}.
      </p>

      <p className="text-white mt-3 text-lg font-semibold">
        {price} / night
      </p>

      <a
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        className="btn btn-green block text-center mt-6"
        onClick={() => trackLead("whatsapp_click")}
      >
        Book Now
      </a>
    </main>
  );
}
