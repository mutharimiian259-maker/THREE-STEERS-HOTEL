const experiences = [
  { id: "mt-kenya-hiking", name: "Mt Kenya Hiking" },
  { id: "ngare-ndare-forest", name: "Ngare Ndare Forest" },
  { id: "lewa-conservancy", name: "Lewa Conservancy Safari" },
];

export default function Experience() {
  return (
    <section className="p-6">

      {/* SEO-READY TITLE */}
      <h2 className="text-xl font-bold text-yellow-500">
        Explore Meru & Mt Kenya
      </h2>

      {/* SEMANTIC STRUCTURE */}
      <ul className="grid md:grid-cols-3 gap-4 mt-4">

        {experiences.map((item) => (
          <li key={item.id} className="card">
            {item.name}
          </li>
        ))}

      </ul>

    </section>
  );
}
