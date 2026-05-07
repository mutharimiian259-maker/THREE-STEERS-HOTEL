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

/* ---------------------------------------
   PAGE
--------------------------------------- */

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
     ANALYTICS
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

  const imageSrc = getImage(
    room.imageKey
  );

  return (
    <main className="mx-auto max-w-4xl p-6">

      <div className="relative h-72 w-full">

        <Image
          src={imageSrc}
          alt={room.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
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

      {room.amenities &&
        room.amenities.length > 0 && (
          <div className="mt-6 rounded-lg bg-gray-900 p-4 text-sm text-gray-300">

            {room.amenities.map(
              (amenity) => (
                <p key={amenity}>
                  ✔ {amenity}
                </p>
              )
            )}

          </div>
        )}

      <p className="mt-4 text-sm text-gray-400">
        Most guests book this room
        for its balance of comfort
        and value.
      </p>

      {/* WHATSAPP CTA */}

      <div className="mt-6">

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-green block w-full text-center"
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
          💬 Check Availability & Book Now
        </a>

      </div>

      {/* CALL CTA */}

      {primaryPhone && (
        <div className="mt-4">

          <a
            href={`tel:${primaryPhone}`}
            className="btn btn-gold block text-center"
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
            📞 Call Reception
          </a>

        </div>
      )}

    </main>
  );
}
