"use client";

import Image from "next/image";
import { HOTEL } from "@/lib/config";
import { track } from "@/lib/core/analytics";
import { IMAGES } from "@/lib/images";
import { useCallback, useRef } from "react";
import { buildWhatsAppLink, formatWhatsAppMessage } from "@/lib/whatsapp";

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

  const hasTrackedImpression = useRef(false);

  /* =============================================================
     MESSAGE (DOMAIN OWNED)
     ============================================================= */

  const message = formatWhatsAppMessage(
    `Hello, I would like to book the ${room.name} at ${HOTEL.identity.name}. Please confirm availability and pricing.`,
    {
      source: "room_card",
      room: room.name,
    }
  );

  const whatsappUrl = buildWhatsAppLink(message);

  const price =
    typeof room.price === "number" && room.currency
      ? `${room.currency} ${room.price.toLocaleString()}`
      : "Price on request";

  const urgencyText = room.price
    ? "High demand — book early to secure this room"
    : "Limited availability";

  /* =============================================================
     EVENTS (PURE TRIGGERS ONLY)
     ============================================================= */

  const handleRoomImpression = useCallback(() => {
    if (hasTrackedImpression.current) return;

    hasTrackedImpression.current = true;

    track("room_view", {
      room_id: room.id,
      room_name: room.name,
    });
  }, [room.id, room.name]);

  const handleWhatsAppClick = useCallback(() => {
    track("whatsapp_click", {
      room_id: room.id,
      room_name: room.name,
    });

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }, [room.id, room.name, whatsappUrl]);

  /* =============================================================
     UI
     ============================================================= */

  return (
    <div
      className="card relative overflow-hidden bg-white"
      onMouseEnter={handleRoomImpression}
    >
      {room.tag && (
        <span className="absolute top-3 right-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded z-10">
          {room.tag}
        </span>
      )}

      <div className="relative w-full h-48">
        <Image
          src={getRoomImage(room.slug)}
          alt={`${room.name} at ${HOTEL.identity.name}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{room.name}</h3>

        <p className="text-sm text-gray-500 mt-1">{room.desc}</p>

        <p className="mt-2 font-bold text-yellow-600 text-lg">
          {price} / night
        </p>

        <p className="text-xs text-red-500 mt-1">{urgencyText}</p>

        <button
          onClick={handleWhatsAppClick}
          className="btn btn-green block mt-4 w-full font-semibold"
        >
          Book This Room via WhatsApp
        </button>
      </div>
    </div>
  );
}

/* =============================================================
   IMAGE MAPPING (UNCHANGED PURE FUNCTION)
   ============================================================= */

function getRoomImage(slug?: string) {
  switch (slug) {
    case "deluxe-room":
      return IMAGES.rooms.batianWing.deluxeTwin;
    case "executive-suite":
      return IMAGES.rooms.batianWing.executiveSuite;
    case "honeymoon":
      return IMAGES.rooms.batianWing.honeymoon;
    case "standard-single":
      return IMAGES.rooms.lenanaWing.standardSingle;
    case "standard-double":
      return IMAGES.rooms.lenanaWing.standardDouble;
    case "family-room":
      return IMAGES.rooms.lenanaWing.familyRoom;
    default:
      return IMAGES.hotel.exteriorHero;
  }
}
