"use client";

import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { HOTEL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnel";
import { IMAGES } from "@/lib/images";
import { useState, useMemo } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNavClick = (routeName: string) => {
    // ONLY analytics — no funnel overwrite
    trackEvent("navigation", {
      page: routeName,
      source: "navbar",
    });

    setOpen(false);
  };

  const whatsappLink = useMemo(() => {
    const message = encodeURIComponent(
      `Hello, I would like to book a room at ${HOTEL.identity.name} in Meru. Please assist me with availability and pricing.`
    );

    return `https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${message}`;
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 bg-black border-b border-zinc-800 sticky top-0 z-50">

      {/* BRAND */}
      <Link
        href="/"
        className="flex items-center gap-2"
      >
        <Image
          src={IMAGES.hotel.logo}
          alt={`${HOTEL.identity.name} Logo`}
          width={45}
          height={45}
          priority
        />
        <span className="text-yellow-500 font-bold">
          {HOTEL.identity.name}
        </span>
      </Link>

      {/* DESKTOP NAV */}
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

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden text-white text-xl"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

      {/* MOBILE MENU */}
      {open && (
        <div className="fixed inset-0 bg-black z-50 p-6 flex flex-col gap-6 md:hidden">

          <button
            className="text-white text-right text-xl"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="text-gray-300 text-lg hover:text-yellow-500"
              onClick={() => handleNavClick(route.name)}
            >
              {route.name}
            </Link>
          ))}

          <a
            href={whatsappLink}
            className="mt-6 bg-green-600 text-white text-center py-3 rounded-lg font-semibold"
            onClick={() => {
              trackEvent("whatsapp_click", { source: "navbar_mobile" });
              setFunnelStep("INTENT");
            }}
          >
            Book Now
          </a>
        </div>
      )}

      {/* DESKTOP CTA */}
      <a
        href={whatsappLink}
        className="hidden md:inline-block btn btn-green font-semibold px-5 py-2"
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
