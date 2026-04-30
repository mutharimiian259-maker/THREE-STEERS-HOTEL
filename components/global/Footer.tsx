export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-zinc-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-yellow-500">
            Three Steers Hotel
          </h2>
          <p className="text-sm text-zinc-400 mt-3">
            Comfort, class, and convenience in the heart of Meru.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm text-zinc-400">Meru, Kenya</p>
          <p className="text-sm text-zinc-400">+254 728 588 005</p>
          <p className="text-sm text-zinc-400">
            reservation@threesteershotel.com
          </p>
        </div>

        {/* CTA */}
        <div>
          <h3 className="font-semibold mb-3">Book Now</h3>
          <a
            href="https://wa.me/254728588005"
            className="inline-block bg-green-500 text-white px-4 py-2 rounded-md text-sm"
          >
            WhatsApp Booking
          </a>
        </div>
      </div>

      <div className="text-center text-xs text-zinc-500 pb-6">
        © {new Date().getFullYear()} Three Steers Hotel. All rights reserved.
      </div>
    </footer>
  );
}
