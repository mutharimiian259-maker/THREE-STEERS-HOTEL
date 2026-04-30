"use client";

import { useEffect, useState } from "react";

export default function ExitIntentModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.clientY < 10) {
        setShow(true);
      }
    };

    window.addEventListener("mousemove", handler);

    return () => window.removeEventListener("mousemove", handler);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded max-w-md text-center">

        <h2 className="text-xl font-bold">
          Wait! Before you go
        </h2>

        <p className="text-gray-600 mt-2">
          Book directly with us for better rates and instant confirmation
        </p>

        <a
          href="https://wa.me/254728588005"
          className="mt-4 inline-block bg-green-500 text-white px-5 py-2 rounded"
        >
          Book via WhatsApp
        </a>

        <button
          onClick={() => setShow(false)}
          className="block mt-3 text-sm text-gray-500"
        >
          Close
        </button>

      </div>

    </div>
  );
}
