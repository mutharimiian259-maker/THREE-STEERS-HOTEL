import { HOTEL } from "@/lib/config";
import { trackLead } from "@/lib/core/trackLead";
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
  const phone = sanitizePhone(HOTEL.contact.phone.whatsapp || "");

  if (!phone) {
    // fail-safe instead of crashing production
    return "https://wa.me/";
  }

  const enrichedMessage = formatMessage(message, options);
  const encoded = encodeURIComponent(enrichedMessage);

  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * SINGLE SOURCE OF TRUTH CONVERSION TRIGGER
 */
export function trackWhatsAppClick(options?: WhatsAppOptions): void {
  if (typeof window === "undefined") return;

  // 1. Funnel + analytics system (event-driven)
  track("whatsapp_click", {
    source: options?.source ?? "unknown",
    room: options?.room ?? null,
    intent: options?.intent ?? "general",
  });

  // 2. Lead system (CRM/backend ingestion)
  trackLead("whatsapp_click", {
    source: options?.source,
    room: options?.room,
    intent: options?.intent,
  });
}

/**
 * PURE message builder (reusable + testable)
 */
function formatMessage(
  message: string,
  options?: WhatsAppOptions
): string {
  const lines = [
    `🏨 ${HOTEL.identity.name} Booking Request`,
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
