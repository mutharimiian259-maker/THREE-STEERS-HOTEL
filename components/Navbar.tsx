"use client";

import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { HOTEL } from "@/lib/config/hotel";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnelEvents";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-black border-b border-zinc-800 sticky top-0 z-50">

      <Link
        href="/"
        className="flex items-center gap-2"
        onClick={() => setFunnelStep("VISIT")}
      >
        <Image
          src="/logo.png"
          alt={`${HOTEL.identity.name} Logo`}
          width={45}
          height={45}
        />
        <span className="text-yellow-500 font-bold">
          {HOTEL.identity.name}
        </span>
      </Link>

      <div className="hidden md:flex gap-6 text-sm text-gray-300">
        {routes?.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className="hover:text-yellow-500 transition"
            onClick={() => setFunnelStep("VISIT")}
          >
            {route.name}
          </Link>
        ))}
      </div>

      <a
        href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encodeURIComponent(
          "Hello, I would like to book a room at Three Steers Hotel Meru."
        )}`}
        className="btn btn-green"
        onClick={() => {
          trackEvent("whatsapp_click");
          setFunnelStep("CONTACT");
        }}
      >
        Book Now
      </a>

    </nav>
  );
}
