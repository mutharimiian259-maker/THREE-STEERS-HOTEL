import { HOTEL } from "@/lib/config";
import { track } from "@/lib/core/analytics";
import { trackLead } from "@/lib/trackLead";

/**
 * Clean phone for WhatsApp API
 */
function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

type WhatsAppOptions = {
  source?: string;
  room?: string;
};

/**
 * PURE: WhatsApp link builder
 */
export function buildWhatsAppLink(message: string): string {
  const phone = sanitizePhone(HOTEL.contact.phone.whatsapp || "");

  if (!phone) return "https://wa.me/";

  const encoded = encodeURIComponent(message);

  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * EVENT + LEAD TRIGGER (single responsibility chain)
 */
export function trackWhatsAppClick(
  options?: WhatsAppOptions
): void {
  if (typeof window === "undefined") return;

  // 1. Analytics event (funnel input)
  track("whatsapp_click", {
    source: options?.source ?? "unknown",
    room: options?.room ?? null,
  });

  // 2. Lead system (conversion output)
  trackLead("whatsapp_click");
}

/**
 * Message formatting (UI-only)
 */
export function formatWhatsAppMessage(
  message: string,
  options?: WhatsAppOptions
): string {
  const lines = [
    `🏨 ${HOTEL.identity.name}`,
    "",
    message,
    "",
    "---",
    `Source: ${options?.source ?? "direct"}`,
    options?.room ? `Room: ${options.room}` : null,
  ];

  return lines.filter(Boolean).join("\n").trim();
}
