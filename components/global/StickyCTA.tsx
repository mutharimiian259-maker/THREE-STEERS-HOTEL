"use client";

const WHATSAPP_NUMBER = "254728588005";

export default function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white flex justify-between items-center p-3 z-50">

      <p className="text-sm hidden md:block">
        Book direct for best rates at Three Steers Hotel
      </p>

      <div className="flex gap-3">

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          className="bg-green-500 px-4 py-2 rounded text-sm"
        >
          WhatsApp
        </a>

        <a
          href="tel:+254728588005"
          className="bg-yellow-500 text-black px-4 py-2 rounded text-sm"
        >
          Call
        </a>

      </div>

    </div>
  );
}
