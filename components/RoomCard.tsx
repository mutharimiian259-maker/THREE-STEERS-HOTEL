import Image from "next/image";

const WHATSAPP_NUMBER = "254728588005";

export default function RoomCard({ room }) {
  if (!room) return null;

  const message = encodeURIComponent(
    `Hello, I would like to book the ${room.name} at Three Steers Hotel Meru. Please confirm availability, prices, and dates.`
  );

  const price =
    room?.price && room?.currency
      ? `${room.currency} ${room.price.toLocaleString()}`
      : "Price on request";

  return (
    <div className="card relative overflow-hidden bg-white">

      {/* TAG (PSYCHOLOGICAL TRIGGER) */}
      {room.tag && (
        <span className="absolute top-3 right-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded z-10">
          {room.tag}
        </span>
      )}

      {/* IMAGE (OPTIMIZED) */}
      <div className="relative w-full h-48">
        <Image
          src={room.image || "/images/placeholder.jpg"}
          alt={room.name}
          fill
          priority={false}
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">

        {/* ROOM NAME */}
        <h3 className="text-lg font-bold text-gray-900">
          {room.name}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 mt-1">
          {room.desc}
        </p>

        {/* PRICE ANCHOR */}
        <p className="mt-2 font-semibold text-yellow-600">
          {price} / night
        </p>

        {/* VALUE SIGNAL (IMPORTANT ADDITION) */}
        <p className="text-xs text-gray-400 mt-1">
          Includes comfort, privacy & premium hotel service
        </p>

        {/* CTA (CONVERSION OPTIMIZED) */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
          className="btn btn-green block mt-4 text-center"
        >
          Book This Room via WhatsApp
        </a>

      </div>

    </div>
  );
}
