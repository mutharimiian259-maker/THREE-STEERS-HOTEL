"use client";

import { HOTEL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { trackLead } from "@/lib/analytics/trackLead";

function sanitizePhone(phone: string) {
  return phone.replace(/[^\d]/g, "");
}

export default function Footer() {
  const whatsappNumber = sanitizePhone(
    HOTEL.contact.phone.whatsapp
  );

  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to book a room at ${HOTEL.identity.name} in ${HOTEL.location.city}. Please assist me with availability and pricing.`
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleWhatsAppClick = (source: string) => {
    trackEvent("whatsapp_click", {
      source,
      context: "footer",
    });

    trackLead("whatsapp_click");

    // small delay ensures tracking is not dropped
    setTimeout(() => {
      window.open(whatsappLink, "_blank", "noopener,noreferrer");
    }, 120);
  };

  const handleContactClick = (type: string) => {
    trackEvent("navigation", {
      source: "footer",
      type,
    });
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
            {HOTEL.contact.phone.primary}
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
            onClick={() => handleWhatsAppClick("footer")}
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
