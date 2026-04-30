export default function Location() {
  return (
    <section className="p-6">

      {/* TITLE */}
      <h2 className="gold text-xl font-bold">
        Find Three Steers Hotel, Meru
      </h2>

      {/* ADDRESS (SEO BOOST) */}
      <p className="text-gray-400 mt-2">
        Located along Meru–Nanyuki Road, Meru Town, Kenya.
      </p>

      {/* GOOGLE MAP EMBED (REAL) */}
      <iframe
        className="w-full h-64 mt-4 rounded-lg"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps?q=Three%20Steers%20Hotel%20Meru&output=embed"
      ></iframe>

      {/* CTA BUTTON */}
      <div className="mt-4">

        <a
          className="btn btn-gold inline-block"
          href="https://www.google.com/maps/dir/?api=1&destination=Three+Steers+Hotel+Meru"
          target="_blank"
        >
          📍 Get Directions
        </a>

      </div>

    </section>
  );
}
