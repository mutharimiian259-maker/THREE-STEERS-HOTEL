import Hero from "@/components/Hero";
import RoomCard from "@/components/RoomCard";
import Facilities from "@/components/Facilities";
import Reviews from "@/components/Reviews";
import Location from "@/components/Location";
import rooms from "@/data/rooms";

export default function Home() {
  return (
    <main>

      {/* 1. HERO */}
      <Hero />

      {/* 2. ROOMS PREVIEW */}
      <section className="p-6">
        <h2 className="text-2xl gold font-bold">Our Rooms</h2>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {rooms.slice(0, 3).map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      {/* 3. FACILITIES */}
      <Facilities />

      {/* 4. ABOUT */}
      <section className="p-6">
        <h2 className="gold text-xl font-bold">About Three Steers Hotel</h2>

        <p className="text-gray-300 mt-2">
          Located in Meru near Mt Kenya, offering luxury accommodation,
          11 room categories, fine dining, conferences, gym, gardens,
          and premium hospitality.
        </p>
      </section>

      {/* 5. REVIEWS */}
      <Reviews />

      {/* 6. LOCATION */}
      <Location />

      {/* 7. FINAL CTA */}
      <section className="text-center p-10">
        <h2 className="gold text-2xl font-bold">Book Direct & Save</h2>

        <div className="mt-4">
          <a href="https://wa.me/254728588005" className="btn btn-green m-2">
            WhatsApp Booking
          </a>

          <a href="tel:+254728588005" className="btn btn-gold m-2">
            Call Now
          </a>
        </div>
      </section>

    </main>
  );
}
