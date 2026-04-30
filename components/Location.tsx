export default function Location() {
  return (
    <section className="p-6">

      <h2 className="gold font-bold">Find Us</h2>

      <iframe
        className="w-full h-64 mt-3 rounded-lg"
        src="https://www.google.com/maps/embed"
      />

      <a
        className="btn btn-gold mt-3 inline-block"
        href="https://maps.google.com"
      >
        Get Directions
      </a>

    </section>
  );
}
