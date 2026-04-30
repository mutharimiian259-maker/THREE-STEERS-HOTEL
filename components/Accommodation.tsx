export default function Accommodation() {
  return (
    <section className="p-6 bg-zinc-900">

      <h2 className="gold text-xl font-bold">
        Accommodation Categories
      </h2>

      <p className="text-gray-400 mt-2">
        With 11 room options across Batian and Lenana wings,
        we guarantee the perfect stay for every guest.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mt-4">

        <div className="card">
          <h3 className="gold font-bold">Batian Wing</h3>
          <p className="text-sm text-gray-400">
            Premium comfort and modern luxury.
          </p>
        </div>

        <div className="card">
          <h3 className="gold font-bold">Lenana Wing</h3>
          <p className="text-sm text-gray-400">
            Cozy and serene environment for relaxation.
          </p>
        </div>

      </div>

      <a
        href="https://wa.me/254728588005?text=I%20want%20to%20book%20a%20room"
        className="btn btn-green mt-4 inline-block"
      >
        Book Your Room
      </a>

    </section>
  );
}
