import Hero from "@/components/Hero";
import RoomCard from "@/components/RoomCard";
import Facilities from "@/components/Facilities";
import Reviews from "@/components/Reviews";
import Location from "@/components/Location";
import Conference from "@/components/Conference";
import Dining from "@/components/Dining";
import Experience from "@/components/Experience";
import rooms from "@/data/rooms";
import Link from "next/link";

/**
 * TEMP CONFIG (will move to lib/config in next step)
 */
const WHATSAPP_NUMBER = "254728588005";
const PHONE_NUMBER = "+254728588005";

export default function Home() {
  const safeRooms = Array.isArray(rooms) ? rooms : [];

  return (
    <div>

      {/* HERO */}
      <section id="home">
        <h1 className="text-3xl font-bold text-center mt-6">
          Three Steers Hotel Meru – Luxury Hotel in Kenya
        </h1>

        <Hero />
      </section>

      {/* ROOMS */}
      <section id="rooms" className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-yellow-500">
            Rooms & Accommodation in Meru
          </h2>

          <Link href="/rooms" className="text-sm text-yellow-500 underline">
            View All →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {safeRooms.slice(0, 3).map((room: any) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      {/* FACILITIES */}
      <section id="facilities">
        <Facilities />
      </section>

      {/* CONFERENCE */}
      <section id="conference">
        <Conference />
      </section>

      {/* DINING */}
      <section id="dining">
        <Dining />
      </section>

      {/* EXPERIENCES */}
      <section id="experiences">
        <Experience />
      </section>

      {/* ABOUT */}
      <section id="about" className="p-6">
        <h2 className="text-xl font-bold text-yellow-500">
          Luxury Hotel in Meru Kenya
        </h2>

        <p className="text-gray-300 mt-3 leading-relaxed">
          Three Steers Hotel is a premier hotel in Meru town located near Mt Kenya,
          offering 11 unique room categories, modern conference facilities,
          fine dining restaurants, and premium hospitality services.
        </p>

        <p className="text-gray-400 mt-2">
          Whether you're visiting for business, leisure, or events,
          our hotel provides comfort, security, and exceptional service.
        </p>
      </section>

      {/* REVIEWS */}
      <section id="reviews">
        <Reviews />
      </section>

      {/* LOCATION */}
      <section id="location">
        <Location />
      </section>

      {/* CTA */}
      <section id="booking" className="text-center p-10 bg-zinc-900">
        <h2 className="text-3xl font-bold text-yellow-500">
          Book Your Stay at the Best Hotel in Meru
        </h2>

        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
          Book directly with us for the best rates, instant confirmation,
          and personalized service.
        </p>

        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20I%20want%20to%20book%20a%20room%20at%20Three%20Steers%20Hotel%20Meru`}
            className="px-6 py-3 bg-green-600 text-white rounded-lg"
          >
            💬 WhatsApp Booking
          </a>

          <a
            href={`tel:${PHONE_NUMBER}`}
            className="px-6 py-3 bg-yellow-500 text-black rounded-lg"
          >
            📞 Call Now
          </a>

        </div>
      </section>

    </div>
  );
}
