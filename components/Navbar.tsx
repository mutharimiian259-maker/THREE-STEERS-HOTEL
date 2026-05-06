"use client";

import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { HOTEL } from "@/lib/config";
import { track } from "@/lib/core/analytics";
import { IMAGES } from "@/lib/images";
import { useState, useMemo } from "react";
import {
  buildWhatsAppLink,
  formatWhatsAppMessage,
} from "@/lib/whatsapp";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  /**
   * NAVIGATION EVENT (FIXED)
   */
  const handleNavClick = (routeName: string) => {
    track(
      "navigation",
      {
        destination: routeName,
      },
      "navbar"
    );

    setOpen(false);
  };

  /**
   * CENTRALIZED WHATSAPP LINK
   */
  const whatsappLink = useMemo(() => {
    const message = formatWhatsAppMessage(
      "Hello, I would like to book a room. Please share availability and pricing.",
      { source: "navbar" }
    );

    return buildWhatsAppLink(message);
  }, []);

  /**
   * WHATSAPP CLICK EVENT
   */
  const handleWhatsAppClick = (variant: "desktop" | "mobile") => {
    track(
      "whatsapp_click",
      {
        variant,
      },
      "navbar"
    );
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-black border-b border-zinc-800 sticky top-0 z-50">

      {/* BRAND */}
      <Link
        href="/"
        className="flex items-center gap-2"
        onClick={() => handleNavClick("home")}
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
              onClick={() => handleNavClick(route.name)}
            >
              {route.name}
            </Link>
          ))}

          <a
            href={whatsappLink}
            onClick={() => handleWhatsAppClick("mobile")}
            className="mt-6 bg-green-600 text-white text-center py-3 rounded-lg font-semibold"
          >
            Book Now
          </a>
        </div>
      )}

      {/* DESKTOP CTA */}
      <a
        href={whatsappLink}
        onClick={() => handleWhatsAppClick("desktop")}
        className="hidden md:inline-block btn btn-green font-semibold px-5 py-2"
      >
        Book Now
      </a>

    </nav>
  );
}
