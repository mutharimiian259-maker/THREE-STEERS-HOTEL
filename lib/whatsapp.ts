import { getPhoneByLabel } from "@/lib/config";

/* =============================================================
   TYPES (DOMAIN ONLY)
   ============================================================= */

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

/* =============================================================
   PURE MESSAGE TEMPLATE (NO UI / NO CONFIG COUPLING)
   ============================================================= */

export function formatWhatsAppMessage(
  message: string,
  options?: WhatsAppOptions
): string {
  const lines: string[] = [
    message,
    options?.source ? `source=${options.source}` : "",
    options?.room ? `room=${options.room}` : "",
  ];

  return lines.filter(Boolean).join("\n");
}

/* =============================================================
   LINK BUILDER (PURE FUNCTION)
   ============================================================= */

export function buildWhatsAppLink(message: string): string {
  const rawPhone = getPhoneByLabel("whatsapp");

  if (!rawPhone) {
    throw new Error("[WHATSAPP] Missing WhatsApp phone configuration");
  }

  const phone = rawPhone.replace(/[^\d]/g, "");

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
