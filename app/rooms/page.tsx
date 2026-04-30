import Link from "next/link";
import { rooms } from "@/data/rooms";

export default function RoomsPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold text-yellow-500">
        Rooms at Three Steers Hotel Meru
      </h1>

      <p className="text-gray-400 mt-2">
        Choose from our luxury accommodation options in Meru Kenya.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-6">

        {rooms.map((room) => (
          <Link
            key={room.id}
            href={`/rooms/${room.slug}`}
            className="card block"
          >

            <img
              src={room.image}
              className="rounded-lg"
              alt={room.name}
            />

            <h2 className="text-xl gold mt-2 font-bold">
              {room.name}
            </h2>

            <p className="text-gray-400 text-sm">
              {room.desc}
            </p>

            <p className="mt-2 text-white">
              {room.currency} {room.price.toLocaleString()}
            </p>

          </Link>
        ))}

      </div>

    </main>
  );
}
