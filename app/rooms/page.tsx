import Link from "next/link";
import Image from "next/image";
import rooms from "@/data/rooms";
import { HOTEL } from "@/lib/config";
import { trackLead } from "@/lib/analytics/trackLead";
import { useCallback } from "react";

export default function RoomsPage() {
  const safeRooms = Array.isArray(rooms) ? rooms : [];

  const handleRoomClick = useCallback(() => {
    trackLead("room_view");
  }, []);

  const handleBookingIntent = useCallback(() => {
    trackLead("booking_intent");
  }, []);

  return (
    <main className="p-6 max-w-6xl mx-auto">

      <header className="text-center">

        <h1 className="text-3xl font-bold text-yellow-500">
          Rooms at Three Steers Hotel Meru
        </h1>

        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Choose from our luxury accommodation options in Meru, Kenya.
          Book directly via WhatsApp for best available rates.
        </p>

      </header>

      <div className="text-center mt-4 mb-8">
        <p className="text-sm text-yellow-600 font-medium">
          ⭐ Recommended: Deluxe & Executive suites for best experience
        </p>
      </div>

      <section className="grid md:grid-cols-2 gap-6 mt-6">

        {safeRooms.map((room: any) => {
          const imageSrc =
            room.image || "/images/hotel/rooms/default-room.jpg";

          const price =
            typeof room.price === "number"
              ? `${room.currency ?? "KES"} ${room.price.toLocaleString()}`
              : "Price on request";

          return (
            <Link
              key={room.id}
              href={`/rooms/${room.slug}`}
              className="card block overflow-hidden hover:scale-[1.01] transition"
              onClick={handleRoomClick}
            >

              <div className="relative w-full h-52">
                <Image
                  src={imageSrc}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-3">

                <h2 className="text-xl text-yellow-500 font-bold mt-2">
                  {room.name}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  {room.desc}
                </p>

                <p className="mt-2 font-semibold text-white">
                  {price}
                </p>

                <p className="text-xs text-red-500 mt-1">
                  Limited availability — popular among business travelers
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  Click to view details & book instantly
                </p>

              </div>

            </Link>
          );
        })}

      </section>

      <section className="text-center mt-12">

        <p className="text-gray-600">
          Need help choosing a room? Contact reception directly.
        </p>

        <a
          href={`https://wa.me/${HOTEL.contact.phone.whatsapp}`}
          className="inline-block mt-4 bg-green-500 text-white px-6 py-3 rounded"
          onClick={handleBookingIntent}
        >
          Talk to Reception
        </a>

      </section>

    </main>
  );
}
