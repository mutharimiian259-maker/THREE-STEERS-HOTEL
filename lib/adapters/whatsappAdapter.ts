import { track } from "@/lib/core/analytics";
import { getPhoneByLabel } from "@/lib/domain/contact";
import { sanitizePhone } from "@/lib/domain/phone";

/* =============================================================
   WHATSAPP LINK BUILDER
   ============================================================= */

export function buildWhatsAppLink(message: string): string {
  const rawPhone = getPhoneByLabel("whatsapp");
  const phone = sanitizePhone(rawPhone || "");

  if (!phone) {
    console.warn("[WHATSAPP] Missing WhatsApp phone number");

    track(
      "system_error",
      {
        context: "whatsapp_missing_phone",
        severity: "high",
        message_length: message.length,
      },
      "system"
    );

    // safer fallback (prevents broken CTA)
    return "https://wa.me";
  }

  /* =============================================================
     IMPORTANT: ensure tracking is not lost on navigation
     ============================================================= */

  try {
    // fire-and-forget but stabilized
    void track(
      "whatsapp_click",
      {
        label: "whatsapp_cta",
        message_length: message.length,
      },
      "sticky_cta"
    );
  } catch (err) {
    console.error("[WHATSAPP] tracking failed", err);
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
