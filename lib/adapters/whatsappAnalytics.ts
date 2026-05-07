import { track } from "@/lib/core/analytics";

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
