const experiences = [
  "Mt Kenya Hiking",
  "Ngare Ndare Forest",
  "Lewa Conservancy",
  "Meru National Reserve",
  "Cultural Tours",
  "Meru Museum",
];

export default function Experience() {
  return (
    <section className="p-6">

      {/* TITLE (SEO SAFE) */}
      <h2 className="text-xl font-bold text-yellow-500">
        Fun Experiences in Meru
      </h2>

      {/* SEMANTIC STRUCTURE */}
      <ul className="grid md:grid-cols-3 gap-4 mt-4">

        {experiences.map((item, index) => (
          <li key={index} className="card">
            {item}
          </li>
        ))}

      </ul>

    </section>
  );
}
