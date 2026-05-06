import { HOTEL } from "@/lib/config";
import { track } from "@/lib/core/analytics";

/**
 * STRICT ORIGIN TYPES (prevents random strings)
 */
type WhatsAppSource =
  | "navbar"
  | "footer"
  | "room_card"
  | "sticky_cta"
  | "exit_intent"
  | "unknown";

type WhatsAppOptions = {
  source?: WhatsAppSource;
  room?: string;
};

/**
 * PURE: phone sanitizer
 */
function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

/**
 * PURE: WhatsApp link builder
 */
export function buildWhatsAppLink(message: string): string {
  const phone = sanitizePhone(HOTEL.contact.phone.whatsapp || "");

  if (!phone) return "https://wa.me/";

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * ANALYTICS ONLY (intent tracking)
 * ❗ NO BUSINESS SIDE EFFECTS HERE
 */
export function trackWhatsAppClick(options?: WhatsAppOptions): void {
  if (typeof window === "undefined") return;

  track("whatsapp_click", {
    room: options?.room ?? null,
  }, options?.source ?? "unknown");
}

/**
 * MESSAGE FORMATTER (UI ONLY)
 */
export function formatWhatsAppMessage(
  message: string,
  options?: WhatsAppOptions
): string {
  return [
    `🏨 ${HOTEL.identity.name}`,
    "",
    message,
    "",
    "---",
    `Source: ${options?.source ?? "unknown"}`,
    options?.room ? `Room: ${options.room}` : null,
  ]
    .filter(Boolean)
    .join("\n")
    .trim();
}
