import { HOTEL } from "@/lib/config";

/**
 * Cleans phone number for WhatsApp API compatibility
 */
function sanitizePhone(phone: string) {
  return phone.replace(/[^\d]/g, "");
}

/**
 * Builds a tracked WhatsApp booking link
 */
export function buildWhatsAppLink(
  message: string,
  options?: {
    source?: string;
    room?: string;
  }
) {
  const phone = sanitizePhone(HOTEL.contact.phone.whatsapp);

  if (!phone) {
    throw new Error("WhatsApp number is missing in HOTEL config");
  }

  const enrichedMessage = `
${message}

---
Source: ${options?.source ?? "direct"}
${options?.room ? `Room: ${options.room}` : ""}
`.trim();

  const encoded = encodeURIComponent(enrichedMessage);

  return `https://wa.me/${phone}?text=${encoded}`;
}
