import Image from "next/image";

const WHATSAPP_NUMBER = "254728588005";

export default function RoomCard({ room }) {
  if (!room) return null;

  const message = encodeURIComponent(
    `Hello, I want to book the ${room.name} at Three Steers Hotel Meru. Please confirm availability and price.`
  );

  const price =
    room.price && room.currency
      ? `${room.currency} ${room.price.toLocaleString()}`
      : "Price on request";

  return (
    <div className="card relative overflow-hidden">

      {/* TAG (PSYCHOLOGICAL TRIGGER) */}
      {room.tag && (
        <span className="absolute top-3 right-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
          {room.tag}
        </span>
      )}

      {/* IMAGE */}
      <div className="relative w-full h-48">
        <Image
          src={room.image || "/images/placeholder.jpg"}
          alt={room.name}
          fill
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-3">

        {/* NAME */}
        <h3 className="mt-2 font-bold text-yellow-500">
          {room.name}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-400">
          {room.desc}
        </p>

        {/* PRICE */}
        <p className="mt-1 font-semibold">
          {price}
        </p>

        {/* CTA (REVENUE BUTTON) */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
          className="btn btn-green block mt-3 text-center"
        >
          Book via WhatsApp
        </a>

      </div>
    </div>
  );
}
