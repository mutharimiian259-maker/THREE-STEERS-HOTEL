export default function Accommodation() {
  return (
    <section className="p-6 bg-zinc-900">

      {/* SEO OPTIMIZED TITLE */}
      <h2 className="text-xl font-bold text-yellow-500">
        Hotel Accommodation in Meru, Kenya
      </h2>

      {/* DESCRIPTION */}
      <p className="text-gray-400 mt-2">
        Three Steers Hotel offers 11 accommodation categories across Batian and Lenana wings,
        designed for business travelers, tourists, and families visiting Meru.
      </p>

      {/* ROOM TYPES */}
      <div className="grid md:grid-cols-2 gap-4 mt-4">

        <div className="card">
          <h3 className="font-bold text-yellow-500">Batian Wing</h3>
          <p className="text-sm text-gray-400">
            Premium rooms offering modern luxury, enhanced comfort, and business-class amenities.
          </p>
        </div>

        <div className="card">
          <h3 className="font-bold text-yellow-500">Lenana Wing</h3>
          <p className="text-sm text-gray-400">
            Cozy and peaceful rooms ideal for relaxation, leisure stays, and budget comfort.
          </p>
        </div>

      </div>

      {/* STRONG CONVERSION CTA */}
      <a
        href={`https://wa.me/254728588005?text=${encodeURIComponent(
          "Hello, I would like to book a room at Three Steers Hotel Meru"
        )}`}
        className="mt-4 inline-block px-6 py-3 bg-green-600 text-white rounded-lg"
      >
        Book Your Room
      </a>

    </section>
  );
}
