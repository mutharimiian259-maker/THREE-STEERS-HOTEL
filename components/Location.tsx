export default function Location() {
  return (
    <section className="p-6">

      {/* SEO OPTIMIZED TITLE */}
      <h2 className="text-xl font-bold text-yellow-500">
        Location – Three Steers Hotel, Meru Kenya
      </h2>

      {/* ADDRESS */}
      <p className="text-gray-400 mt-2">
        Located along Meru–Nanyuki Road, Meru Town, Kenya.
      </p>

      {/* GOOGLE MAP */}
      <iframe
        title="Three Steers Hotel Location Map"
        className="w-full h-64 mt-4 rounded-lg"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps?q=Three%20Steers%20Hotel%20Meru&output=embed"
      ></iframe>

      {/* CTA BUTTONS */}
      <div className="mt-4 flex flex-col md:flex-row gap-3">

        <a
          className="px-6 py-3 bg-yellow-500 text-black rounded-lg inline-block text-center"
          href="https://www.google.com/maps/dir/?api=1&destination=Three+Steers+Hotel+Meru"
          target="_blank"
          rel="noopener noreferrer"
        >
          📍 Get Directions
        </a>

        <a
          className="px-6 py-3 bg-green-600 text-white rounded-lg inline-block text-center"
          href={`https://wa.me/254728588005?text=${encodeURIComponent(
            "Hello, I would like directions and booking information for Three Steers Hotel Meru"
          )}`}
        >
          💬 Book via WhatsApp
        </a>

      </div>

    </section>
  );
}
