import Link from "next/link";
import Image from "next/image";
import { rooms } from "@/data/rooms";

export default function RoomsPage() {
  return (
    <main className="p-6 max-w-6xl mx-auto">

      {/* SECTION: HEADER (SEO + CONTEXT) */}
      <header className="text-center">

        <h1 className="text-3xl font-bold text-yellow-500">
          Rooms at Three Steers Hotel Meru
        </h1>

        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Choose from our luxury accommodation options in Meru, Kenya.
          Book directly via WhatsApp for best available rates.
        </p>

      </header>

      {/* SECTION: GUIDANCE (CONVERSION SUPPORT) */}
      <div className="text-center mt-4 mb-8">
        <p className="text-sm text-yellow-600 font-medium">
          ⭐ Recommended: Deluxe & Executive suites for best experience
        </p>
      </div>

      {/* SECTION: ROOMS GRID */}
      <section className="grid md:grid-cols-2 gap-6 mt-6">

        {rooms.map((room) => (
          <Link
            key={room.id}
            href={`/rooms/${room.slug}`}
            className="card block overflow-hidden hover:scale-[1.01] transition"
          >

            {/* IMAGE (OPTIMIZED) */}
            <div className="relative w-full h-52">
              <Image
                src={room.image}
                alt={room.name}
                fill
                className="object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-3">

              <h2 className="text-xl text-yellow-500 font-bold mt-2">
                {room.name}
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                {room.desc}
              </p>

              <p className="mt-2 font-semibold text-white">
                {room.currency} {room.price.toLocaleString()}
              </p>

              {/* ACTION HINT (IMPORTANT PSYCHOLOGY TRIGGER) */}
              <p className="text-xs text-gray-400 mt-2">
                Click to view details & book instantly
              </p>

            </div>

          </Link>
        ))}

      </section>

      {/* SECTION: FINAL BOOKING PUSH */}
      <section className="text-center mt-12">

        <p className="text-gray-600">
          Need help choosing a room? Contact reception directly.
        </p>

        <a
          href="https://wa.me/254728588005"
          className="inline-block mt-4 bg-green-500 text-white px-6 py-3 rounded"
        >
          Talk to Reception
        </a>

      </section>

    </main>
  );
}
