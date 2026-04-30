export default function Conference() {
  return (
    <section className="p-6 bg-zinc-900">

      <h2 className="gold text-xl font-bold">
        Conferences & Events in Meru
      </h2>

      <p className="text-gray-300 mt-2">
        Flexible spaces for meetings, seminars, and events for up to 300 guests.
      </p>

      <ul className="mt-3 text-sm">
        <li>✔ High-speed WiFi</li>
        <li>✔ AV Equipment</li>
        <li>✔ Catering services</li>
        <li>✔ Event planning support</li>
      </ul>

      <a
        href="https://wa.me/254728588005?text=Conference booking"
        className="btn btn-whatsapp mt-4 inline-block"
      >
        Enquire Now
      </a>

    </section>
  );
}
