import Link from "next/link";

const WHATSAPP_NUMBER = "254728588005";

export default function Hero() {
  return (
    <section className="min-h-[85vh] flex items-center justify-center text-center px-4 relative">

      {/* BACKGROUND OVERLAY (IMPORTANT FOR LUXURY FEEL) */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="max-w-3xl relative z-10">

        {/* SEO H1 (KEEP STRONG BUT CLEAN) */}
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 leading-tight">
          Luxury Hotel in Meru, Kenya – Book Direct & Save More
        </h1>

        {/* VALUE + POSITIONING */}
        <p className="text-gray-300 mt-4 text-lg">
          Premium accommodation near Mount Kenya with elegant rooms, fine dining,
          conferences, and professional hospitality at Three Steers Hotel.
        </p>

        {/* TRUST SIGNAL (CRITICAL ADDITION) */}
        <p className="text-yellow-400 mt-3 text-sm font-medium">
          ⭐ Rated among top business & travel hotels in Meru
        </p>

        {/* URGENCY LINE (VERY IMPORTANT FOR CONVERSION) */}
        <p className="text-gray-400 mt-2 text-sm">
          Limited rooms available — book early to secure best rates
        </p>

        {/* CTA BLOCK (CONVERSION ENGINE) */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">

          {/* WHATSAPP (OPTIMIZED MESSAGE) */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hello, I would like to book a room at Three Steers Hotel Meru. Please assist with availability, dates, and pricing."
            )}`}
            className="btn btn-green"
          >
            💬 Book via WhatsApp
          </a>

          <a
            href="tel:+254728588005"
            className="btn btn-gold"
          >
            📞 Call Reception
          </a>

          <Link href="/rooms" className="btn btn-outline">
            View Rooms & Rates
          </Link>

        </div>

        {/* SEO AUTHORITY FOOTER */}
        <p className="text-gray-500 text-xs mt-6">
          Explore why travelers choose Three Steers Hotel for business stays,
          conferences, and luxury accommodation in Meru County.
        </p>

      </div>

    </section>
  );
}
