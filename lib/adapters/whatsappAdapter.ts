import { getPhoneByLabel } from "@/lib/domain/contact";
import { sanitizePhone } from "@/lib/domain/phone";

/* =============================================================
   WHATSAPP LINK BUILDER (DOMAIN UTILITY)
   ============================================================= */

export function buildWhatsAppLink(
  message: string
): string {
  const rawPhone =
    getPhoneByLabel("whatsapp");

  const phone =
    sanitizePhone(rawPhone || "");

  if (!phone) {
    console.warn(
      "[WHATSAPP] Missing WhatsApp phone number"
    );

    // safer failure mode (prevents false-success UX)
    return "";
  }

  const encodedMessage =
    encodeURIComponent(message);

  return `https://wa.me/${phone}?text=${encodedMessage}`;
}
