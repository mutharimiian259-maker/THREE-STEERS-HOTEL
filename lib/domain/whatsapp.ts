import { getWhatsAppPhone } from "@/lib/config";
import { sanitizePhone } from "@/lib/utils/phone";

/* =============================================================
   MESSAGE BUILDER (PURE DOMAIN)
   ============================================================= */

export function formatWhatsAppMessage(message: string): string {
  if (!message || !message.trim()) {
    throw new Error("[whatsapp] message cannot be empty");
  }

  return message.trim();
}

/* =============================================================
   LINK BUILDER (PURE DOMAIN)
   ============================================================= */

export function buildWhatsAppLink(message: string): string {
  const rawPhone = getWhatsAppPhone();

  if (!rawPhone) {
    console.warn("[whatsapp] missing WhatsApp number");
    return "https://wa.me/";
  }

  const phone = sanitizePhone(rawPhone);
  const encoded = encodeURIComponent(message);

  return `https://wa.me/${phone}?text=${encoded}`;
}
