import { HOTEL } from "@/lib/config";

export type WhatsAppOptions = {
  source?: string;
  room?: string;
};

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
