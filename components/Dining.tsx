export default function Dining() {
  return (
    <section className="p-6">

      {/* SEO OPTIMIZED TITLE */}
      <h2 className="text-xl font-bold text-yellow-500">
        Restaurants & Dining at Three Steers Hotel, Meru
      </h2>

      {/* DESCRIPTION */}
      <p className="text-gray-400 mt-2">
        Enjoy a refined culinary experience at Three Steers Hotel featuring expertly crafted
        dishes, premium service, and relaxing dining environments.
      </p>

      {/* RESTAURANTS */}
      <div className="grid md:grid-cols-3 gap-4 mt-4">

        <div className="card">
          <h3 className="font-bold text-yellow-500">Aberdares Restaurant</h3>
          <p className="text-sm text-gray-400">
            A diverse menu offering local and international cuisine for all tastes.
          </p>
        </div>

        <div className="card">
          <h3 className="font-bold text-yellow-500">Nyambene Restaurant</h3>
          <p className="text-sm text-gray-400">
            Contemporary dining space serving fresh, modern, and authentic dishes.
          </p>
        </div>

        <div className="card">
          <h3 className="font-bold text-yellow-500">Master’s Lounge</h3>
          <p className="text-sm text-gray-400">
            Relaxed lounge atmosphere perfect for drinks, meetings, and socializing.
          </p>
        </div>

      </div>

      {/* CONVERSION CTA */}
      <div className="mt-6 text-center">

        <a
          href={`https://wa.me/254728588005?text=${encodeURIComponent(
            "Hello, I would like to inquire about dining reservations at Three Steers Hotel Meru"
          )}`}
          className="px-6 py-3 bg-green-600 text-white rounded-lg inline-block"
        >
          Reserve a Table
        </a>

      </div>

    </section>
  );
}
