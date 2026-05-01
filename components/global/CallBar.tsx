"use client";

import { HOTEL } from "@/lib/config/hotel";

export default function CallBar() {
  const phone = HOTEL.contact.phone.primary.replace(/\s/g, "");

  return (
    <div className="hidden md:flex fixed top-0 left-0 right-0 bg-yellow-500 text-black justify-center p-2 text-sm z-50">

      Call us directly for instant booking:{" "}
      <a href={`tel:${phone}`} className="font-semibold underline">
        {HOTEL.contact.phone.primary}
      </a>

    </div>
  );
}
