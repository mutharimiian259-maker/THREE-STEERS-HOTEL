import Hero from "@/components/Hero";
import RoomCard from "@/components/RoomCard";
import Facilities from "@/components/Facilities";
import Reviews from "@/components/Reviews";
import Location from "@/components/Location";
import Conference from "@/components/Conference";
import Dining from "@/components/Dining";
import Experience from "@/components/Experience";
import rooms from "@/data/rooms";

export default function Home() {
  return (
    <main>

      {/* 1. HERO (FIRST IMPRESSION) */}
      <Hero />

      {/* 2. ROOMS PREVIEW */}
      <section className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl gold font-bold">Our Rooms</h2>

          <a href="/rooms" className="text-sm text-gold underline">
            View All →
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {rooms.slice(0, 3).map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      {/* 3. FACILITIES */}
      <Facilities />

      {/* 4. CONFERENCE (HIGH REVENUE SECTION) */}
      <Conference />

      {/* 5. DINING EXPERIENCE */}
      <Dining />

      {/* 6. EXPERIENCES (SEO + ATTRACTION) */}
      <Experience />

      {/* 7. ABOUT (TRUST SECTION) */}
      <section className="p-6">
        <h2 className="gold text-xl font-bold">
          About Three Steers Hotel Meru
        </h2>

        <p className="text-gray-300 mt-2 leading-relaxed">
          Discover comfort and luxury at Three Steers Hotel, located in the heart of Meru
          near Mt Kenya. With 11 unique room categories, modern conference facilities,
          fine dining restaurants, gym, gardens, and leisure spaces, we offer a complete
          hospitality experience for business and leisure travelers.
        </p>
      </section>

      {/* 8. REVIEWS (SOCIAL PROOF) */}
      <Reviews />

      {/* 9. LOCATION */}
      <Location />

      {/* 10. FINAL CTA (CONVERSION ENGINE) */}
      <section className="text-center p-10 bg-zinc-900">

        <h2 className="gold text-3xl font-bold">
          Book Your Stay Directly & Save More
        </h2>

        <p className="text-gray-400 mt-2">
          Get the best rates, instant confirmation, and personalized service.
        </p>

        <div className="mt-6">

          <a
            href="https://wa.me/254728588005?text=Hello%20I%20want%20to%20book%20a%20room%20at%20Three%20Steers%20Hotel"
            className="btn btn-green m-2"
          >
            💬 WhatsApp Booking
          </a>

          <a
            href="tel:+254728588005"
            className="btn btn-gold m-2"
          >
            📞 Call Now
          </a>

        </div>

      </section>

    </main>
  );
}
