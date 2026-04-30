export default function Hero() {
  return (
    <section className="h-[90vh] flex items-center justify-center text-center bg-[url('/images/hotel.jpg')] bg-cover bg-center">

      <div className="bg-black/60 p-6 rounded-xl">

        <h1 className="text-4xl font-bold gold">
          Three Steers Hotel
        </h1>

        <p className="text-gray-200 mt-2">
          Comfortable Stays in the Heart of Meru
        </p>

        <div className="mt-4">
          <a className="btn btn-green m-1" href="https://wa.me/254728588005">
            WhatsApp Book
          </a>

          <a className="btn btn-gold m-1" href="tel:+254728588005">
            Call Now
          </a>
        </div>

      </div>

    </section>
  );
}
