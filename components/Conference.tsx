export default function Conference() {
  return (
    <section className="p-6 bg-zinc-900">

      <h2 className="gold text-xl font-bold">
        Meetings, Seminars & Events
      </h2>

      <p className="text-gray-400 mt-2">
        We provide everything you need for a successful event.
      </p>

      <ul className="mt-3 text-sm text-gray-300 space-y-2">
        <li>✔ Flexible spaces (10 – 300 guests)</li>
        <li>✔ High-speed WiFi & AV equipment</li>
        <li>✔ Dedicated event planner</li>
        <li>✔ Catering services</li>
      </ul>

      <div className="grid md:grid-cols-2 gap-4 mt-4">

        <div className="card">
          <h3 className="gold">Summit Hall</h3>
          <p className="text-sm text-gray-400">
            Perfect for large events and conferences.
          </p>
        </div>

        <div className="card">
          <h3 className="gold">Conference Room 2</h3>
          <p className="text-sm text-gray-400">
            Ideal for meetings and seminars.
          </p>
        </div>

      </div>

      <a
        href="https://wa.me/254728588005?text=Conference%20booking"
        className="btn btn-green mt-4 inline-block"
      >
        Make Enquiry
      </a>

    </section>
  );
}
