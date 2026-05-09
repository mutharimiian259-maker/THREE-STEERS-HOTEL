import { track } from "@/lib/core/analytics";
import { getPhoneByLabel } from "@/lib/domain/contact";
import { sanitizePhone } from "@/lib/domain/phone";

/* =============================================================
   WHATSAPP LINK BUILDER
   -------------------------------------------------------------
   PURE FUNCTION + SIDE EFFECT ISOLATION
   ============================================================= */

/* =============================================================
   SAFE TRACK WRAPPER
   ============================================================= */

function safeTrack() {
  void track;
}

/* =============================================================
   WHATSAPP LINK BUILDER
   ============================================================= */

export function buildWhatsAppLink(message: string): string {
  const rawPhone = getPhoneByLabel("whatsapp");
  const phone = sanitizePhone(rawPhone || "");

  /* =============================================================
     MISSING PHONE HANDLING
     ============================================================= */

  if (!phone) {
    console.warn("[WHATSAPP] Missing WhatsApp phone number");

    void track(
      "system_error",
      {
        context: "whatsapp_missing_phone",
        severity: "high",
        message_length: message.length,
      },
      "system"
    );

    return "https://wa.me";
  }

  /* =============================================================
     ANALYTICS SIDE EFFECT (NON-BLOCKING)
     ============================================================= */

  queueMicrotask(() => {
    void track(
      "whatsapp_click",
      {
        label: "whatsapp_cta",
        message_length: message.length,
      },
      "sticky_cta"
    );
  });

  /* =============================================================
     SAFE URL ENCODING
     ============================================================= */

  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phone}?text=${encodedMessage}`;
}
