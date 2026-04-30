"use client";

import { HOTEL } from "@/lib/config/hotel";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import { getPhoneLink, getEmailLink } from "@/lib/utils/contact";

export default function ContactInfo() {
  return (
    <section className="p-6 bg-black text-center">

      {/* SEO TITLE */}
      <h2 className="text-xl font-bold text-yellow-500">
        Contact {HOTEL.name}
      </h2>

      {/* EMAIL */}
      <a
        href={getEmailLink()}
        className="block mt-2 text-gray-400 hover:text-white"
      >
        {HOTEL.contact.email}
      </a>

      {/* PHONE */}
      <p className="text-gray-400 mt-1">
        {HOTEL.contact.phone}
      </p>

      {/* CTA BUTTONS */}
      <div className="mt-4">

        <a
          href={getPhoneLink()}
          className="px-6 py-2 bg-yellow-500 text-black rounded-lg m-2 inline-block"
        >
          Call Now
        </a>

        <a
          href={buildWhatsAppLink(
            `Hello, I would like to make a booking at ${HOTEL.name}`
          )}
          className="px-6 py-2 bg-green-600 text-white rounded-lg m-2 inline-block"
        >
          WhatsApp
        </a>

      </div>

    </section>
  );
}
