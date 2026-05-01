import { notFound } from "next/navigation";
import Image from "next/image";
import rooms from "@/data/rooms";
import { generateSEO } from "@/lib/seo";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const room = Array.isArray(rooms)
    ? rooms.find((r) => r.slug === params.slug)
    : null;

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

export default function RoomPage({ params }: Props) {
  const room = Array.isArray(rooms)
    ? rooms.find((r) => r.slug === params.slug)
    : null;

  if (!room) return notFound();

  const message = encodeURIComponent(
    `Hello, I want to book the ${room.name} at Three Steers Hotel Meru. Please confirm availability, pricing, and check-in details.`
  );

  const imageSrc = room.image || "/images/placeholder.jpg";

  return (
    <main className="max-w-4xl mx-auto p-6">

      {/* IMAGE */}
      <div className="relative w-full h-72">
        <Image
          src={imageSrc}
          alt={room.name || "Room"}
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
        Experience comfort, privacy, and premium hospitality at Three Steers Hotel Meru.
        Designed for business travelers and leisure guests.
      </p>

      {/* PRICE */}
      <p className="text-white mt-3 text-lg font-semibold">
        {room.currency} {Number(room.price || 0).toLocaleString()} / night
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
          href={`https://wa.me/254728588005?text=${message}`}
          className="btn btn-green block text-center"
        >
          💬 Check Availability & Book Now
        </a>
      </div>

      {/* CTA 2 */}
      <div className="mt-4">
        <a
          href="tel:+254728588005"
          className="btn btn-gold block text-center"
        >
          📞 Call Reception for Instant Booking
        </a>
      </div>

    </main>
  );
}
