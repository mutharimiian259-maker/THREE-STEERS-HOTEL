import { HOTEL, getPhoneByLabel } from "@/lib/config";
import { track } from "@/lib/core/analytics";

/**
 * ORIGIN TYPES (SAFE ENUM ONLY)
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

/* ---------------------------------------
   PHONE SANITIZER (PURE)
--------------------------------------- */

function sanitizePhone(phone?: string): string {
  if (!phone) return "";
  return phone.replace(/[^\d]/g, "");
}

/* ---------------------------------------
   MESSAGE FORMATTER (PURE DOMAIN)
--------------------------------------- */

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

/* ---------------------------------------
   LINK BUILDER (ADAPTER LAYER)
--------------------------------------- */

export function buildWhatsAppLink(message: string): string {
  const rawPhone = getPhoneByLabel("whatsapp");
  const phone = sanitizePhone(rawPhone || undefined);

  if (!phone) {
    console.warn("[WHATSAPP] Missing phone number");
    return "https://wa.me/";
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/* ---------------------------------------
   ANALYTICS ONLY (NO STATE / NO STORAGE)
--------------------------------------- */

export function trackWhatsAppClick(options?: WhatsAppOptions): void {
  if (typeof window === "undefined") return;

  track(
    "whatsapp_click",
    {
      room: options?.room ?? null,
      source: options?.source ?? "unknown",
    },
    options?.source ?? "unknown"
  );
}
