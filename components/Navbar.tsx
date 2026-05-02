"use client";

import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { HOTEL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnel";

export default function Navbar() {
  const handleNavClick = (routeName: string) => {
    // Navigation is still VISIT, not INTENT
    setFunnelStep("VISIT");

    trackEvent("page_view", {
      page: routeName,
      source: "navbar",
    });
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-black border-b border-zinc-800 sticky top-0 z-50">

      {/* BRAND */}
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

      {/* NAV LINKS */}
      <div className="hidden md:flex gap-6 text-sm text-gray-300">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className="transition hover:text-yellow-500"
            onClick={() => handleNavClick(route.name)}
          >
            {route.name}
          </Link>
        ))}
      </div>

      {/* PRIMARY CTA */}
      <a
        href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encodeURIComponent(
          "Hello, I would like to book a room at " +
            HOTEL.identity.name +
            " in Meru. Please assist me with availability and pricing."
        )}`}
        className="btn btn-green font-semibold px-5 py-2"
        onClick={() => {
          trackEvent("whatsapp_click", { source: "navbar" });
          setFunnelStep("INTENT");
        }}
      >
        Book Now
      </a>

    </nav>
  );
}
