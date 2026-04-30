const experiences = [
  {
    id: "mt-kenya-hiking",
    name: "Mt Kenya Hiking",
  },
  {
    id: "ngare-ndare-forest",
    name: "Ngare Ndare Forest",
  },
  {
    id: "lewa-conservancy",
    name: "Lewa Conservancy",
  },
  {
    id: "meru-national-reserve",
    name: "Meru National Reserve",
  },
  {
    id: "cultural-tours",
    name: "Cultural Tours",
  },
  {
    id: "meru-museum",
    name: "Meru Museum",
  },
];

export default function Experience() {
  return (
    <section className="p-6">

      {/* SEO OPTIMIZED TITLE */}
      <h2 className="text-xl font-bold text-yellow-500">
        Things to Do in Meru Kenya & Mt Kenya Region
      </h2>

      {/* DESCRIPTION (SEO BOOST) */}
      <p className="text-gray-400 mt-2">
        Explore top tourist attractions and outdoor experiences near Three Steers Hotel,
        including Mt Kenya adventures and wildlife reserves.
      </p>

      {/* LIST */}
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

      {/* CONVERSION CTA */}
      <div className="mt-6 text-center">

        <a
          href={`https://wa.me/254728588005?text=${encodeURIComponent(
            "Hello, I would like to book a stay and explore activities in Meru (Mt Kenya experiences)"
          )}`}
          className="px-6 py-3 bg-green-600 text-white rounded-lg inline-block"
        >
          Book Stay & Activities
        </a>

      </div>

    </section>
  );
}
