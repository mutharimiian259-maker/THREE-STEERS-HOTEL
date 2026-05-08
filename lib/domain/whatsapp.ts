/* =============================================================
   DOMAIN: WHATSAPP
   -------------------------------------------------------------
   Responsibilities:
   - WhatsApp message formatting
   - WhatsApp link generation

   Rules:
   - No React / DOM usage
   - No analytics logic
   - No config structure exposure
   - No core-layer dependency leakage
   ============================================================= */

import { getWhatsAppPhone } from "@/lib/config";
import { sanitizePhone } from "@/lib/utils/phone";

/* =============================================================
   TYPES (LOCAL DOMAIN ONLY)
   ============================================================= */

export type WhatsAppSource =
  | "navbar"
  | "footer"
  | "room_card"
  | "sticky_cta"
  | "exit_intent"
  | "call_bar"
  | "float_button"
  | "page"
  | "system"
  | "unknown";

export type WhatsAppOptions = {
  source?: WhatsAppSource;
  room?: string;
};

/* =============================================================
   MESSAGE BUILDER
   ============================================================= */

export function formatWhatsAppMessage(
  message: string,
  options?: WhatsAppOptions
): string {
  const cleanMessage =
    message?.trim() || "Hello";

  const source =
    options?.source ?? "unknown";

  const room =
    options?.room;

  const lines: Array<string | null> = [
    `🏨 Three Steers Hotel Meru`,
    "",
    cleanMessage,
    "",
    "---",
    `Source: ${source}`,
    room ? `Room: ${room}` : null,
  ];

  return lines
    .filter(
      (line): line is string =>
        line !== null
    )
    .join("\n")
    .trim();
}

/* =============================================================
   LINK BUILDER
   ============================================================= */

export function buildWhatsAppLink(
  message: string
): string {
  const rawPhone =
    getWhatsAppPhone();

  if (!rawPhone) {
    console.warn(
      "[whatsapp] missing WhatsApp number"
    );

    return "https://wa.me/";
  }

  const phone =
    sanitizePhone(rawPhone);

  const encoded =
    encodeURIComponent(
      message?.trim() || "Hello"
    );

  return `https://wa.me/${phone}?text=${encoded}`;
}
