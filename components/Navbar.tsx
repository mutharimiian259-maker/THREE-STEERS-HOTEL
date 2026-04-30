import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-black border-b border-zinc-800 sticky top-0 z-50">

      {/* LOGO */}
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Three Steers Hotel Logo"
          width={50}
          height={50}
        />
        <span className="text-gold font-bold">Three Steers Hotel</span>
      </div>

      <a
        href="https://wa.me/254728588005"
        className="btn btn-green"
      >
        Book Now
      </a>

    </nav>
  );
}
