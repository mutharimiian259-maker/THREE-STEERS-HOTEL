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
 * PURE: builds WhatsApp link only (NO SIDE EFFECTS)
 */
export function buildWhatsAppLink(
  message: string,
  options?: WhatsAppOptions
) {
  const phone = sanitizePhone(HOTEL.contact.phone.whatsapp);

  if (!phone) {
    throw new Error("WhatsApp number is missing in HOTEL config");
  }

  const enrichedMessage = formatMessage(message, options);

  const encoded = encodeURIComponent(enrichedMessage);

  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * SEPARATE: analytics trigger (must be called explicitly)
 */
export function trackWhatsAppClick() {
  if (typeof window === "undefined") return;

  trackLead("whatsapp_click");
}

/**
 * PURE message builder (reusable + testable)
 */
function formatMessage(
  message: string,
  options?: WhatsAppOptions
) {
  return `
🏨 ${HOTEL.identity.name} Booking Request

${message}

---
Source: ${options?.source ?? "direct"}
Intent: ${options?.intent ?? "general"}
${options?.room ? `Room: ${options.room}` : ""}
Time: ${new Date().toISOString()}
`.trim();
}
