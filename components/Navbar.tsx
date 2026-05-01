"use client";

import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { HOTEL } from "@/lib/config/hotel";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep, getFunnelStep } from "@/lib/analytics/funnelEvents";

export default function Navbar() {
  const currentStep = typeof window !== "undefined" ? getFunnelStep() : null;

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
            className={`transition hover:text-yellow-500 ${
              currentStep === "ROOM_VIEW" ? "text-yellow-500" : ""
            }`}
            onClick={() => {
              trackEvent("page_view", { page: route.name });
              setFunnelStep("INTENT");
            }}
          >
            {route.name}
          </Link>
        ))}
      </div>

      {/* PRIMARY CTA */}
      <a
        href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encodeURIComponent(
          "Hello, I would like to book a room at Three Steers Hotel Meru."
        )}`}
        className="btn btn-green"
        onClick={() => {
          trackEvent("whatsapp_click", { source: "navbar" });
          setFunnelStep("CONTACT");
        }}
      >
        Book via WhatsApp
      </a>

    </nav>
  );
}
