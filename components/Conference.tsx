export default function Conference() {
  return (
    <section className="p-6 bg-zinc-900">

      {/* SEO OPTIMIZED TITLE */}
      <h2 className="text-xl font-bold text-yellow-500">
        Conference & Event Spaces in Meru, Kenya
      </h2>

      {/* DESCRIPTION */}
      <p className="text-gray-400 mt-2">
        Three Steers Hotel provides fully equipped conference and event facilities
        designed for corporate meetings, seminars, workshops, and private events.
      </p>

      {/* FEATURES */}
      <ul className="mt-3 text-sm text-gray-300 space-y-2">
        <li>✔ Flexible spaces (10 – 300 guests)</li>
        <li>✔ High-speed WiFi & AV equipment</li>
        <li>✔ Dedicated event coordination team</li>
        <li>✔ Full catering and beverage services</li>
      </ul>

      {/* ROOMS */}
      <div className="grid md:grid-cols-2 gap-4 mt-4">

        <div className="card">
          <h3 className="font-bold text-yellow-500">Summit Hall</h3>
          <p className="text-sm text-gray-400">
            Ideal for large corporate events, conferences, and official gatherings.
          </p>
        </div>

        <div className="card">
          <h3 className="font-bold text-yellow-500">Conference Room 2</h3>
          <p className="text-sm text-gray-400">
            Perfect for board meetings, workshops, and small seminars.
          </p>
        </div>

      </div>

      {/* CTA (SAFE + ENCODED) */}
      <a
        href={`https://wa.me/254728588005?text=${encodeURIComponent(
          "Hello, I would like to book a conference space at Three Steers Hotel Meru"
        )}`}
        className="mt-4 inline-block px-6 py-3 bg-green-600 text-white rounded-lg"
      >
        Make Enquiry
      </a>

    </section>
  );
}
