const experiences = [
  { id: "mt-kenya-hiking", name: "Mt Kenya Hiking" },
  { id: "ngare-ndare-forest", name: "Ngare Ndare Forest" },
  { id: "lewa-conservancy", name: "Lewa Conservancy Safari" },
];

export default function Experience() {
  return (
    <section className="p-6">

      {/* SEO-OPTIMIZED TITLE */}
      <h2 className="text-xl font-bold text-yellow-500">
        Top Things to Do in Meru Kenya & Mt Kenya Region
      </h2>

      {/* SEO SUPPORTING CONTEXT */}
      <p className="text-gray-400 mt-2">
        Discover exciting outdoor adventures and tourist attractions near Three Steers Hotel,
        including Mt Kenya hiking, wildlife safaris, and cultural experiences in Meru County.
      </p>

      {/* EXPERIENCE GRID */}
      <ul className="grid md:grid-cols-3 gap-4 mt-4">

        {experiences.map((item) => (
          <li
            key={item.id}
            className="card text-center font-medium"
          >
            {item.name}
          </li>
        ))}

      </ul>

      {/* CONVERSION LAYER (CRITICAL FOR HOTEL REVENUE) */}
      <div className="mt-6 text-center">

        <a
          href={`https://wa.me/254728588005?text=${encodeURIComponent(
            "Hello, I would like to book a stay at Three Steers Hotel and explore Mt Kenya experiences and activities."
          )}`}
          className="btn btn-green inline-block"
        >
          Book Stay + Experiences
        </a>

      </div>

    </section>
  );
}
