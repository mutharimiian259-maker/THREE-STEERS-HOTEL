import { getPhoneByLabel } from "@/lib/domain/contact";
import { sanitizePhone } from "@/lib/domain/phone";

/* =============================================================
   WHATSAPP LINK BUILDER (PURE DOMAIN UTILITY)
   ============================================================= */

export function buildWhatsAppLink(message: string): string {
  const rawPhone = getPhoneByLabel("whatsapp");
  const phone = sanitizePhone(rawPhone || "");

  if (!phone) {
    console.warn("[WHATSAPP] Missing WhatsApp phone number");
    return "https://wa.me";
  }

  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phone}?text=${encodedMessage}`;
}
