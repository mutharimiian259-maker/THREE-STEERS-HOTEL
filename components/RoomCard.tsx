"use client";

import Image from "next/image";
import { HOTEL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnel";
import { IMAGES } from "@/lib/images";

type Room = {
  id: string | number;
  name: string;
  price?: number;
  currency?: string;
  desc?: string;
  image?: string;
  tag?: string;
  slug?: string;
};

export default function RoomCard({ room }: { room: Room }) {
  if (!room) return null;

  const whatsappNumber = HOTEL.contact.phone.whatsapp;

  const message = encodeURIComponent(
    `Hello, I would like to book the ${room.name} at ${HOTEL.identity.name}. Please confirm availability, prices, and dates.`
  );

  const price =
    typeof room.price === "number" && room.currency
      ? `${room.currency} ${room.price.toLocaleString()}`
      : "Price on request";

  // IMAGE MAPPING (CONTROLLED SYSTEM)
  const getRoomImage = (room: Room) => {
    const slug = room.slug?.toLowerCase();

    switch (slug) {
      case "honeymoon":
        return IMAGES.rooms.batian.honeymoon;

      case "deluxe-twin":
        return IMAGES.rooms.batian.deluxeTwin;

      case "executive-suite":
        return IMAGES.rooms.batian.executiveSuite;

      case "standard-single":
        return IMAGES.rooms.lenana.standardSingle;

      case "standard-double":
        return IMAGES.rooms.lenana.standardDouble;

      case "family-room":
        return IMAGES.rooms.lenana.familyRoom;

      default:
        return IMAGES.hotel.exteriorHero;
    }
  };

  return (
    <div
      className="card relative overflow-hidden bg-white"
      onClick={() => {
        trackEvent("room_view", { room: room.name });
        setFunnelStep("ROOM_VIEW");
      }}
    >
      {/* TAG */}
      {room.tag && (
        <span className="absolute top-3 right-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded z-10">
          {room.tag}
        </span>
      )}

      {/* IMAGE */}
      <div className="relative w-full h-48">
        <Image
          src={getRoomImage(room)}
          alt={room.name}
          fill
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">

        <h3 className="text-lg font-bold text-gray-900">
          {room.name}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {room.desc}
        </p>

        <p className="mt-2 font-semibold text-yellow-600">
          {price} / night
        </p>

        <p className="text-xs text-gray-400 mt-1">
          Includes comfort, privacy & premium hotel service
        </p>

        {/* URGENCY (CONVERSION BOOST) */}
        <p className="text-xs text-red-500 mt-1">
          Limited availability — book early to secure this room
        </p>

        {/* CTA */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          className="btn btn-green block mt-4 text-center"
          onClick={() => {
            trackEvent("whatsapp_click", { room: room.name });
            setFunnelStep("INTENT");
          }}
        >
          Book This Room via WhatsApp
        </a>

      </div>
    </div>
  );
}
