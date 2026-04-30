export default function ContactInfo() {
  return (
    <section className="p-6 bg-black text-center">

      <h2 className="gold text-xl font-bold">
        Contact Three Steers Hotel
      </h2>

      <p className="mt-2 text-gray-400">
        reservation@threesteershotel.com
      </p>

      <p className="text-gray-400">
        +254 728 588 005 / +254 735 497 772
      </p>

      <div className="mt-4">
        <a href="tel:+254728588005" className="btn btn-gold m-2">
          Call Now
        </a>

        <a
          href="https://wa.me/254728588005?text=Hello%20I%20want%20to%20book"
          className="btn btn-green m-2"
        >
          WhatsApp
        </a>
      </div>

    </section>
  );
}
