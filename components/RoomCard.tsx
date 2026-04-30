import Image from "next/image";

export default function RoomCard({ room }) {
  if (!room) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello, I want to book the ${room.name} at Three Steers Hotel Meru`
  );

  const formattedPrice =
    room?.currency && room?.price
      ? `${room.currency} ${room.price.toLocaleString()}`
      : "Price on request";

  return (
    <div className="card">

      {/* OPTIMIZED IMAGE (Next.js BEST PRACTICE) */}
      <div className="relative w-full h-48">
        <Image
          src={room.image || "/images/placeholder.jpg"}
          alt={room.name || "Hotel room"}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* TITLE */}
      <h3 className="mt-2 font-bold text-yellow-500">
        {room.name || "Room"}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-400">
        {room.desc || "Luxury accommodation"}
      </p>

      {/* PRICE */}
      <p className="mt-1 font-semibold">
        {formattedPrice}
      </p>

      {/* CTA */}
      <a
        href={`https://wa.me/254728588005?text=${whatsappMessage}`}
        className="btn btn-green block mt-3 text-center"
      >
        Book Now
      </a>

    </div>
  );
}
