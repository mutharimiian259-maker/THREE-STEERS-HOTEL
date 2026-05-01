import Hero from "@/components/Hero";
import RoomCard from "@/components/RoomCard";
import Facilities from "@/components/Facilities";
import Reviews from "@/components/Reviews";
import Location from "@/components/Location";
import Conference from "@/components/Conference";
import Dining from "@/components/Dining";
import Experience from "@/components/Experience";
import Link from "next/link";
import { rooms } from "@/data/rooms";
import { HOTEL } from "@/lib/config/hotel";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnelEvents";

export default function Home() {
  const safeRooms = Array.isArray(rooms) ? rooms : [];

  return (
    <div>

      <section
        id="home"
        onMouseEnter={() => setFunnelStep("VISIT")}
      >
        <h1 className="text-3xl font-bold text-center mt-6">
          {HOTEL.identity.name} – Luxury Hotel in Kenya
        </h1>

        <Hero />
      </section>

      <section id="rooms" className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-yellow-500">
            Rooms & Accommodation in Meru
          </h2>

          <Link
            href="/rooms"
            className="text-sm text-yellow-500 underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {safeRooms.slice(0, 3).map((room: any) => (
            <div
              key={room.id}
              onClick={() => {
                trackEvent("room_view", { room: room.name });
                setFunnelStep("ROOM_VIEW");
              }}
            >
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      </section>

      <section id="facilities">
        <Facilities />
      </section>

      <section id="conference">
        <Conference />
      </section>

      <section id="dining">
        <Dining />
      </section>

      <section id="experiences">
        <Experience />
      </section>

      <section id="about" className="p-6">
        <h2 className="text-xl font-bold text-yellow-500">
          Luxury Hotel in Meru Kenya
        </h2>

        <p className="text-gray-300 mt-3 leading-relaxed">
          {HOTEL.identity.name} is a premier hotel in {HOTEL.location.city},
          offering premium accommodation, dining, conferences, and hospitality services.
        </p>

        <p className="text-gray-400 mt-2">
          Located in {HOTEL.location.full}, we provide comfort, security, and world-class service.
        </p>
      </section>

      <section id="reviews">
        <Reviews />
      </section>

      <section id="location">
        <Location />
      </section>

      <section
        id="booking"
        className="text-center p-10 bg-zinc-900"
        onMouseEnter={() => setFunnelStep("INTENT")}
      >
        <h2 className="text-3xl font-bold text-yellow-500">
          Book Your Stay at {HOTEL.identity.name}
        </h2>

        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
          Book directly for best rates, instant confirmation, and personalized service.
        </p>

        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">

          <a
            href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=Hello%20I%20want%20to%20book%20a%20room%20at%20${HOTEL.identity.name}`}
            className="px-6 py-3 bg-green-600 text-white rounded-lg"
            onClick={() => {
              trackEvent("whatsapp_click");
              setFunnelStep("CONTACT");
            }}
          >
            💬 WhatsApp Booking
          </a>

          <a
            href={`tel:${HOTEL.contact.phone.primary}`}
            className="px-6 py-3 bg-yellow-500 text-black rounded-lg"
            onClick={() => trackEvent("call_click")}
          >
            📞 Call Now
          </a>

        </div>
      </section>

    </div>
  );
}
