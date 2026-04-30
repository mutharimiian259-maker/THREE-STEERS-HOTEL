import Image from "next/image";

export default function Navbar() {
  return (
    <nav
      aria-label="Main Navigation"
      className="flex items-center justify-between p-4 bg-black border-b border-zinc-800 sticky top-0 z-50"
    >

      {/* LOGO + BRAND */}
      <div className="flex items-center gap-2">

        <Image
          src="/logo.png"
          alt="Three Steers Hotel Meru Kenya"
          width={50}
          height={50}
        />

        <span className="font-bold text-yellow-500">
          Three Steers Hotel
        </span>

      </div>

      {/* BOOKING CTA */}
      <a
        href={`https://wa.me/254728588005?text=${encodeURIComponent(
          "Hello, I would like to make a booking at Three Steers Hotel Meru"
        )}`}
        className="px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        Book Now
      </a>

    </nav>
  );
}
