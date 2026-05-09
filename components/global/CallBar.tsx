"use client";

import { HOTEL, getPrimaryPhone } from "@/lib/config";
import { track } from "@/lib/core/analytics";

export default function CallBar() {
  const phone = getPrimaryPhone();

  /* =========================================================
     CALL ACTION (PURE EVENT EMISSION)
     ========================================================= */

  const handleCallClick = () => {
    track("call_click", {}, "call_bar");

    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="hidden md:flex fixed top-0 left-0 right-0 bg-yellow-500 text-black justify-center p-2 text-sm z-50">

      Call us directly for instant booking:{" "}

      <button
        onClick={handleCallClick}
        className="font-semibold underline"
      >
        {phone}
      </button>

    </div>
  );
}
