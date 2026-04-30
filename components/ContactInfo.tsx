export default function ContactInfo() {
  return (
    <section className="p-6 bg-black text-center">

      {/* SEO TITLE */}
      <h2 className="text-xl font-bold text-yellow-500">
        Contact Three Steers Hotel
      </h2>

      {/* EMAIL (CLICKABLE) */}
      <a
        href="mailto:reservation@threesteershotel.com"
        className="block mt-2 text-gray-400 hover:text-white"
      >
        reservation@threesteershotel.com
      </a>

      {/* PHONE NUMBERS */}
      <p className="text-gray-400 mt-1">
        +254 728 588 005 / +254 735 497 772
      </p>

      {/* CTA BUTTONS */}
      <div className="mt-4">

        <a
          href="tel:+254728588005"
          className="px-6 py-2 bg-yellow-500 text-black rounded-lg m-2 inline-block"
        >
          Call Now
        </a>

        <a
          href={`https://wa.me/254728588005?text=${encodeURIComponent(
            "Hello, I would like to make a booking at Three Steers Hotel Meru"
          )}`}
          className="px-6 py-2 bg-green-600 text-white rounded-lg m-2 inline-block"
        >
          WhatsApp
        </a>

      </div>

    </section>
  );
}
