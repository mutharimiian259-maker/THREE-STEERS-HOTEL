import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-black border-b border-zinc-800 sticky top-0 z-50">

      {/* LOGO */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Three Steers Hotel Logo"
          width={45}
          height={45}
        />
        <span className="text-yellow-500 font-bold">
          Three Steers Hotel
        </span>
      </Link>

      {/* NAV LINKS */}
      <div className="hidden md:flex gap-6 text-sm text-gray-300">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className="hover:text-yellow-500 transition"
          >
            {route.name}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <a
        href="https://wa.me/254728588005"
        className="btn btn-green"
      >
        Book Now
      </a>

    </nav>
  );
}
