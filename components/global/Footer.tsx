"use client";

import { HOTEL } from "@/lib/config/hotel";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnelEvents";

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-zinc-800 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-xl font-semibold text-yellow-500">
            {HOTEL.identity.name}
          </h2>
          <p className="text-sm text-zinc-400 mt-3">
            Comfort, class, and convenience in the heart of {HOTEL.location.city}.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm text-zinc-400">
            {HOTEL.location.full}
          </p>
          <p className="text-sm text-zinc-400">
            {HOTEL.contact.phone.primary}
          </p>
          <p className="text-sm text-zinc-400">
            {HOTEL.contact.email}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Book Now</h3>

          <a
            href={`https://wa.me/${HOTEL.contact.phone.whatsapp}?text=${encodeURIComponent(
              "Hello, I would like to book a room at Three Steers Hotel Meru."
            )}`}
            className="inline-block bg-green-500 text-white px-4 py-2 rounded-md text-sm"
            onClick={() => {
              trackEvent("whatsapp_click", {
                source: "footer",
              });
              setFunnelStep("CONTACT");
            }}
          >
            WhatsApp Booking
          </a>
        </div>

      </div>

      <div className="text-center text-xs text-zinc-500 pb-6">
        © {new Date().getFullYear()} {HOTEL.identity.name}. All rights reserved.
      </div>

    </footer>
  );
}
