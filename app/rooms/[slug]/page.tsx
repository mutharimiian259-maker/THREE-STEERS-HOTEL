import { notFound } from "next/navigation";
import Image from "next/image";
import { rooms } from "@/data/rooms";
import { generateSEO } from "@/lib/seo";

type Props = {
  params: { slug: string };
};

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

export default function RoomPage({ params }: Props) {
  const room = rooms.find((r) => r.slug === params.slug);

  if (!room) return notFound();

  const message = encodeURIComponent(
    `Hello, I want to book the ${room.name} at Three Steers Hotel Meru. Please confirm availability, pricing, and check-in details.`
  );

  return (
    <main className="max-w-4xl mx-auto p-6">

      {/* SECTION 1: IMAGE (EMOTIONAL HOOK) */}
      <div className="relative w-full h-72">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {/* SECTION 2: TITLE (SEO + EMOTION) */}
      <h1 className="text-3xl font-bold text-yellow-500 mt-4">
        {room.name}
      </h1>

      {/* SECTION 3: VALUE DESCRIPTION */}
      <p className="text-gray-500 mt-2">
        Experience comfort, privacy, and premium hospitality at Three Steers Hotel Meru.
        Designed for business travelers and leisure guests.
      </p>

      {/* SECTION 4: PRICE ANCHOR */}
      <p className="text-white mt-3 text-lg font-semibold">
        {room.currency} {room.price.toLocaleString()} / night
      </p>

      {/* SECTION 5: TRUST + VALUE STACK */}
      <div className="mt-6 bg-gray-900 text-gray-300 p-4 rounded-lg text-sm">

        <p>✔ Luxury bedding & comfort-focused design</p>
        <p>✔ High-speed WiFi for business travelers</p>
        <p>✔ 24/7 room service & reception support</p>
        <p>✔ Secure parking & premium guest experience</p>

      </div>

      {/* SECTION 6: SOCIAL PROOF / CONFIDENCE BOOST */}
      <p className="text-sm text-gray-400 mt-4">
        Most guests book this room for its balance of comfort and value.
      </p>

      {/* SECTION 7: PRIMARY CTA (HIGH INTENT) */}
      <div className="mt-6">

        <a
          href={`https://wa.me/254728588005?text=${message}`}
          className="btn btn-green block text-center"
        >
          💬 Check Availability & Book Now
        </a>

      </div>

      {/* SECTION 8: SECONDARY CTA (HESITATION CATCHER) */}
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
