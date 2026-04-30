import Link from "next/link";

const WHATSAPP_NUMBER = "254728588005";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center text-center px-4">

      <div className="max-w-3xl">

        {/* SEO H1 */}
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 leading-tight">
          Best Hotel in Meru Kenya – Three Steers Hotel
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-300 mt-4 text-lg">
          Luxury accommodation near Mt Kenya with modern rooms, fine dining,
          conference facilities, and premium hospitality in Meru County.
        </p>

        <p className="text-gray-500 mt-2 text-sm">
          Book directly for best rates via WhatsApp or call instantly.
        </p>

        {/* CTA (OPTIMIZED ORDER FOR CONVERSION) */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">

          {/* PRIMARY CTA */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hello, I would like to book a room at Three Steers Hotel Meru."
            )}`}
            className="btn btn-green"
          >
            💬 Book on WhatsApp
          </a>

          {/* SECONDARY CTA */}
          <a
            href="tel:+254728588005"
            className="btn btn-gold"
          >
            📞 Call Now
          </a>

          {/* NAVIGATION CTA */}
          <Link href="#rooms" className="btn border border-gray-600 text-white">
            View Rooms
          </Link>

        </div>

        {/* TRUST SIGNAL */}
        <p className="text-gray-600 text-xs mt-6">
          Trusted hotel in Meru Kenya for business travelers, tourists, and conferences.
        </p>

      </div>

    </section>
  );
}
