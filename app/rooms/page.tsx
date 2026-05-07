"use client";

import { useEffect } from "react";

import { notFound } from "next/navigation";

import Image from "next/image";

import {
  getRoomBySlug,
  formatRoomPrice,
} from "@/data/rooms";

import { HOTEL } from "@/lib/config";

import { track } from "@/lib/core/analytics";

import {
  buildWhatsAppLink,
  formatWhatsAppMessage,
} from "@/lib/domain/whatsapp";

import {
  getPhoneByLabel,
} from "@/lib/domain/contact";

import { getImage } from "@/lib/domain/images";

type Props = {
  params: {
    slug: string;
  };
};

export default function RoomPage({
  params,
}: Props) {

  const room = getRoomBySlug(
    params.slug
  );

  if (!room) {
    return notFound();
  }

  /* ---------------------------------------
     TRACK ROOM VIEW
  --------------------------------------- */

  useEffect(() => {
    track(
      "room_view",
      {
        room: room.slug,
      },
      "page"
    );
  }, [room.slug]);

  /* ---------------------------------------
     DOMAIN
  --------------------------------------- */

  const imageSrc = getImage(
    room.imageKey
  );

  const primaryPhone =
    getPhoneByLabel("primary");

  const whatsappMessage =
    formatWhatsAppMessage(
      `Hello, I want to book the ${room.name} at ${HOTEL.identity.name}. Please confirm availability, pricing, and check-in details.`,
      {
        source: "room_page",
        room: room.name,
      }
    );

  const whatsappLink =
    buildWhatsAppLink(
      whatsappMessage
    );

  return (
    <main className="mx-auto max-w-4xl p-6">

      <div className="relative h-72 w-full">

        <Image
          src={imageSrc}
          alt={room.name}
          fill
          className="rounded-xl object-cover"
        />

      </div>

      <h1 className="mt-4 text-3xl font-bold text-yellow-500">
        {room.name}
      </h1>

      <p className="mt-2 text-gray-400">
        {room.desc}
      </p>

      <p className="mt-3 text-lg font-semibold text-white">
        {formatRoomPrice(room.price)} / night
      </p>

      {/* WHATSAPP CTA */}

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-green mt-6 block text-center"
        onClick={() => {
          track(
            "whatsapp_click",
            {
              room: room.slug,
            },
            "room_card"
          );
        }}
      >
        Book Now
      </a>

      {/* CALL CTA */}

      {primaryPhone && (
        <a
          href={`tel:${primaryPhone}`}
          className="btn btn-gold mt-4 block text-center"
          onClick={() => {
            track(
              "call_click",
              {
                room: room.slug,
              },
              "room_card"
            );
          }}
        >
          Call Reception
        </a>
      )}

    </main>
  );
}
