import { notFound } from "next/navigation";
import { rooms } from "@/data/rooms";
import { generateSEO } from "@/lib/seo";

type Props = {
  params: { slug: string };
};

/* ---------------- SEO METADATA ---------------- */
export async function generateMetadata({ params }: Props) {
  const room = rooms.find((r) => r.slug === params.slug);

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
  const room = rooms.find((r) => r.slug === params.slug);

  if (!room) return notFound();

  return (
    <main className="max-w-4xl mx-auto p-6">

      {/* ROOM IMAGE */}
      <img
        src={room.image}
        alt={room.name}
        className="w-full h-72 object-cover rounded-xl"
      />

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-yellow-500 mt-4">
        {room.name}
      </h1>

      {/* DESCRIPTION */}
      <p className="text-gray-400 mt-2">
        {room.desc}
      </p>

      {/* PRICE */}
      <p className="text-white mt-3 text-lg font-semibold">
        {room.currency} {room.price.toLocaleString()}
      </p>

      {/* FEATURES (SEO EXPANSION AREA) */}
      <div className="mt-6 text-gray-300">
        <p>✔ Comfortable bedding</p>
        <p>✔ Free WiFi</p>
        <p>✔ Room service available</p>
        <p>✔ Secure parking</p>
      </div>

      {/* CTA */}
      <div className="mt-8">

        <a
          href={`https://wa.me/254728588005?text=Hello, I want to book the ${room.name} at Three Steers Hotel Meru`}
          className="btn btn-green"
        >
          💬 Book This Room
        </a>

      </div>

    </main>
  );
}
