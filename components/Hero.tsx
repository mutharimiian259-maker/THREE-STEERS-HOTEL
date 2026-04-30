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

        {/* DESCRIPTION WITH INTERNAL SEO LINK */}
        <p className="text-gray-300 mt-4 text-lg">
          Luxury accommodation near Mt Kenya with modern rooms, fine dining,
          conference facilities, and premium hospitality in Meru County.
          Learn more about our{" "}
          <Link href="/blog/best-hotel-in-meru-kenya" className="text-yellow-500 underline">
            hotel experience in Meru
          </Link>.
        </p>

        <p className="text-gray-500 mt-2 text-sm">
          Book directly for best rates via WhatsApp or call instantly.
        </p>

        {/* CTA */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hello, I would like to book a room at Three Steers Hotel Meru."
            )}`}
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

          <Link href="/rooms" className="btn border border-gray-600 text-white">
            View Rooms
          </Link>

        </div>

        {/* TRUST + SEO AUTHORITY LINK */}
        <p className="text-gray-600 text-xs mt-6">
          Read why we are rated among the{" "}
          <Link href="/blog/best-hotel-in-meru-kenya" className="text-gray-400 underline">
            best hotels in Meru Kenya
          </Link>{" "}
          for business travelers, tourists, and conferences.
        </p>

      </div>

    </section>
  );
}
