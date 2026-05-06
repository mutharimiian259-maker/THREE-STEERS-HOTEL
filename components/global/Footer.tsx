"use client";

import { HOTEL, getPrimaryPhone } from "@/lib/config";
import { track } from "@/lib/core/analytics";
import {
  buildWhatsAppLink,
  formatWhatsAppMessage,
} from "@/lib/whatsapp";

export default function Footer() {
  /**
   * CENTRALIZED WHATSAPP LINK
   */
  const whatsappLink = buildWhatsAppLink(
    formatWhatsAppMessage(
      "Hello, I would like to book a room. Please share availability and pricing.",
      { source: "footer" }
    )
  );

  /**
   * WHATSAPP CLICK
   */
  const handleWhatsAppClick = () => {
    track(
      "whatsapp_click",
      {
        action: "footer_cta",
      },
      "footer"
    );

    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  };

  /**
   * CONTACT TRACKING (FIXED SEMANTICS)
   */
  const handleContactClick = (type: "location" | "phone" | "email") => {
    track(
      "call_click",
      {
        action: "footer_contact",
        contact_type: type,
      },
      "footer"
    );
  };

  return (
    <footer className="bg-black text-white border-t border-zinc-800 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-xl font-semibold text-yellow-500">
            {HOTEL.identity.name}
          </h2>
          <p className="text-sm text-zinc-400 mt-3">
            Comfort, class, and convenience in the heart of {HOTEL.location.city}.
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>

          <p
            className="text-sm text-zinc-400 cursor-pointer"
            onClick={() => handleContactClick("location")}
          >
            {HOTEL.location.full}
          </p>

          <p
            className="text-sm text-zinc-400 cursor-pointer"
            onClick={() => handleContactClick("phone")}
          >
            {getPrimaryPhone()}
          </p>

          <p
            className="text-sm text-zinc-400 cursor-pointer"
            onClick={() => handleContactClick("email")}
          >
            {HOTEL.contact.email}
          </p>
        </div>

        {/* CTA */}
        <div>
          <h3 className="font-semibold mb-3">Book Now</h3>

          <button
            onClick={handleWhatsAppClick}
            className="inline-block bg-green-500 text-white px-4 py-2 rounded-md text-sm"
          >
            WhatsApp Booking
          </button>

        </div>

      </div>

      <div className="text-center text-xs text-zinc-500 pb-6">
        © {new Date().getFullYear()} {HOTEL.identity.name}. All rights reserved.
      </div>

    </footer>
  );
}
