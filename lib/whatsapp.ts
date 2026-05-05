
import { HOTEL } from "@/lib/config";
import { track } from "@/lib/core/analytics";

/**
 * Cleans phone number for WhatsApp API compatibility
 */
function sanitizePhone(phone: string): string {
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
): string {
  const phone = sanitizePhone(
    HOTEL.contact.phone.whatsapp || ""
  );

  if (!phone) {
    return "https://wa.me/";
  }

  const enrichedMessage = formatMessage(message, options);
  const encoded = encodeURIComponent(enrichedMessage);

  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * 🔥 SINGLE SOURCE OF TRUTH EVENT ONLY
 * (NO LEAD LOGIC HERE)
 */
export function trackWhatsAppClick(
  options?: WhatsAppOptions
): void {
  if (typeof window === "undefined") return;

  track("whatsapp_click", {
    source: options?.source ?? "unknown",
    room: options?.room ?? null,
    intent: options?.intent ?? "general",
  });
}

/**
 * PURE message builder (UI-only formatting)
 */
function formatMessage(
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
    `Intent: ${options?.intent ?? "general"}`,
    options?.room ? `Room: ${options.room}` : null,
  ];

  return lines.filter(Boolean).join("\n").trim();
}
