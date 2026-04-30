import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center text-center px-4">

      <div className="max-w-3xl">

        {/* SEO H1 (CRITICAL FOR GOOGLE RANKING) */}
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 leading-tight">
          Best Hotel in Meru Kenya – Three Steers Hotel
        </h1>

        {/* SUPPORTING SEO DESCRIPTION */}
        <p className="text-gray-300 mt-4 text-lg">
          Luxury accommodation near Mt Kenya with modern rooms, fine dining,
          conference facilities, and unforgettable hospitality in Meru County.
        </p>

        {/* CONVERSION SUBTEXT */}
        <p className="text-gray-500 mt-2 text-sm">
          Book directly for the best rates via WhatsApp or call us instantly.
        </p>

        {/* CTA BUTTONS (REVENUE ENGINE) */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">

          <a
            href="https://wa.me/254728588005?text=Hello%20I%20want%20to%20book%20a%20room%20at%20Three%20Steers%20Hotel%20Meru"
            className="btn btn-green"
          >
            💬 Book on WhatsApp
          </a>

          <a
            href="tel:+254728588005"
            className="btn btn-gold"
          >
            📞 Call Now
          </a>

          <Link href="#rooms" className="btn border border-gray-600 text-white">
            View Rooms
          </Link>

        </div>

        {/* TRUST LINE (SEO + CONVERSION BOOST) */}
        <p className="text-gray-600 text-xs mt-6">
          Trusted hotel in Meru Kenya for business travelers, tourists, and conferences.
        </p>

      </div>

    </section>
  );
}
