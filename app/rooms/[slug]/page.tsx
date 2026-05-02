import { notFound } from "next/navigation";
import Image from "next/image";
import rooms from "@/data/rooms";
import { generateSEO } from "@/lib/seo";
import { HOTEL } from "@/lib/config";

type Props = {
  params: { slug: string };
};

/* ---------------- SINGLE SOURCE LOOKUP ---------------- */
function getRoom(slug: string) {
  return Array.isArray(rooms)
    ? rooms.find((r) => r.slug === slug)
    : null;
}

/* ---------------- METADATA ---------------- */
export async function generateMetadata({ params }: Props) {
  const room = getRoom(params.slug);

  if (!room) {
    return generateSEO({
      title: "Room Not Found | Three Steers Hotel",
      description: "The requested room does not exist.",
      path: "/rooms",
    });
  }

  return generateSEO({
    title: `${room.name} | Three Steers Hotel Meru`,
    description: room.desc,
    path: `/rooms/${room.slug}`,
  });
}

/* ---------------- PAGE ---------------- */
export default function RoomPage({ params }: Props) {
  const room = getRoom(params.slug);

  if (!room) return notFound();

  const whatsappNumber = HOTEL.contact.phone.whatsapp;

  const message = encodeURIComponent(
    `Hello, I want to book the ${room.name} at ${HOTEL.identity.name}. Please confirm availability, pricing, and check-in details.`
  );

  const imageSrc = room.image || "/images/placeholder.jpg";

  const price =
    typeof room.price === "number"
      ? `${room.currency ?? "KES"} ${room.price.toLocaleString()}`
      : "Price on request";

  return (
    <main className="max-w-4xl mx-auto p-6">

      {/* IMAGE */}
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

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-yellow-500 mt-4">
        {room.name}
      </h1>

      {/* DESCRIPTION */}
      <p className="text-gray-500 mt-2">
        Experience comfort, privacy, and premium hospitality at {HOTEL.identity.name}.
        Designed for business travelers and leisure guests.
      </p>

      {/* PRICE */}
      <p className="text-white mt-3 text-lg font-semibold">
        {price} / night
      </p>

      {/* FEATURES */}
      <div className="mt-6 bg-gray-900 text-gray-300 p-4 rounded-lg text-sm">
        <p>✔ Luxury bedding & comfort-focused design</p>
        <p>✔ High-speed WiFi for business travelers</p>
        <p>✔ 24/7 room service & reception support</p>
        <p>✔ Secure parking & premium guest experience</p>
      </div>

      {/* SOCIAL PROOF */}
      <p className="text-sm text-gray-400 mt-4">
        Most guests book this room for its balance of comfort and value.
      </p>

      {/* CTA 1 */}
      <div className="mt-6">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          className="btn btn-green block text-center"
        >
          💬 Check Availability & Book Now
        </a>
      </div>

      {/* CTA 2 */}
      <div className="mt-4">
        <a
          href={`tel:${HOTEL.contact.phone.primary}`}
          className="btn btn-gold block text-center"
        >
          📞 Call Reception for Instant Booking
        </a>
      </div>

    </main>
  );
}
