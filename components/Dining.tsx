export default function Dining() {
  return (
    <section className="p-6">

      <h2 className="gold text-xl font-bold">
        Food & Drinks Experience
      </h2>

      <p className="text-gray-400 mt-2">
        A tantalizing culinary experience crafted by expert chefs.
      </p>

      <div className="grid md:grid-cols-3 gap-4 mt-4">

        <div className="card">
          <h3 className="gold font-bold">Aberdares Restaurant</h3>
          <p className="text-sm text-gray-400">
            A symphony of flavors for every taste.
          </p>
        </div>

        <div className="card">
          <h3 className="gold font-bold">Nyambene Restaurant</h3>
          <p className="text-sm text-gray-400">
            Authentic and modern cuisine.
          </p>
        </div>

        <div className="card">
          <h3 className="gold font-bold">Master’s Lounge</h3>
          <p className="text-sm text-gray-400">
            Relax, connect, and unwind.
          </p>
        </div>

      </div>

    </section>
  );
}
