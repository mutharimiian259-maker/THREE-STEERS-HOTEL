import { getIdentity } from "@/lib/domain/hotel";
import type { EventSource } from "@/lib/core/types";

/* ---------------------------------------
   TYPES
--------------------------------------- */

export type WhatsAppOptions = {
  source?: EventSource;
  room?: string;
};

/* ---------------------------------------
   MESSAGE NORMALIZATION
--------------------------------------- */

function normalizeMessage(message: string): string {
  return message.trim();
}

/* ---------------------------------------
   WHATSAPP MESSAGE FORMATTER
--------------------------------------- */

export function formatWhatsAppMessage(
  message: string,
  options?: WhatsAppOptions
): string {
  const hotel = getIdentity();

  const normalized = normalizeMessage(message);

  return [
    `🏨 ${hotel.name}`,
    "",
    normalized,
    "",
    "---",
    `Source: ${options?.source ?? "unknown"}`,
    options?.room
      ? `Room: ${options.room}`
      : null,
  ]
    .filter(Boolean)
    .join("\n")
    .trim();
}
