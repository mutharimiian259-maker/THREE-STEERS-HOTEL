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

export default function Home() {
  return (
    <main>

      {/* 1. HERO */}
      <section id="home">
        <Hero />
      </section>

      {/* 2. ROOMS PREVIEW */}
      <section id="rooms" className="p-6">
        <div className="flex justify-between items-center">

          <h2 className="text-2xl gold font-bold">
            Rooms & Accommodation in Meru
          </h2>

          <Link href="/rooms" className="text-sm text-gold underline">
            View All →
          </Link>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {rooms.slice(0, 3).map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      {/* 3. FACILITIES */}
      <section id="facilities">
        <Facilities />
      </section>

      {/* 4. CONFERENCE */}
      <section id="conference">
        <Conference />
      </section>

      {/* 5. DINING */}
      <section id="dining">
        <Dining />
      </section>

      {/* 6. EXPERIENCES */}
      <section id="experiences">
        <Experience />
      </section>

      {/* 7. ABOUT */}
      <section id="about" className="p-6">
        <h2 className="gold text-xl font-bold">
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

      {/* 8. REVIEWS */}
      <section id="reviews">
        <Reviews />
      </section>

      {/* 9. LOCATION */}
      <section id="location">
        <Location />
      </section>

      {/* 10. FINAL CTA */}
      <section id="booking" className="text-center p-10 bg-zinc-900">

        <h2 className="gold text-3xl font-bold">
          Book Your Stay at the Best Hotel in Meru
        </h2>

        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
          Skip third-party platforms and book directly with us for the best rates,
          instant confirmation, and personalized service.
        </p>

        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">

          <a
            href="https://wa.me/254728588005?text=Hello%20I%20want%20to%20book%20a%20room%20at%20Three%20Steers%20Hotel%20Meru"
            className="btn btn-green"
          >
            💬 WhatsApp Booking
          </a>

          <a
            href="tel:+254728588005"
            className="btn btn-gold"
          >
            📞 Call Now
          </a>

        </div>

      </section>

    </main>
  );
}
