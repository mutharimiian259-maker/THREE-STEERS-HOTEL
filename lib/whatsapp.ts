import { HOTEL } from "@/lib/config";
import { trackLead } from "@/lib/analytics/trackLead";

/**
 * Cleans phone number for WhatsApp API compatibility
 */
function sanitizePhone(phone: string) {
  return phone.replace(/[^\d]/g, "");
}

type WhatsAppOptions = {
  source?: string;
  room?: string;
  intent?: "room" | "conference" | "general";
};

/**
 * Builds a tracked WhatsApp booking link
 * + automatically logs lead event for attribution
 */
export function buildWhatsAppLink(
  message: string,
  options?: WhatsAppOptions
) {
  const phone = sanitizePhone(HOTEL.contact.phone.whatsapp);

  if (!phone) {
    throw new Error("WhatsApp number is missing in HOTEL config");
  }

  // NEW: automatic lead tracking BEFORE redirect
  if (typeof window !== "undefined") {
    trackLead("whatsapp_click");
  }

  const enrichedMessage = `
🏨 ${HOTEL.identity.name} Booking Request

${message}

---
Source: ${options?.source ?? "direct"}
Intent: ${options?.intent ?? "general"}
${options?.room ? `Room: ${options.room}` : ""}
Time: ${new Date().toLocaleString()}
`.trim();

  const encoded = encodeURIComponent(enrichedMessage);

  return `https://wa.me/${phone}?text=${encoded}`;
}
