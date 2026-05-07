import { track } from "@/lib/core/analytics";

type WhatsAppOptions = {
  source?: "navbar" | "footer" | "room_card" | "sticky_cta" | "exit_intent" | "unknown";
  room?: string;
};

export function trackWhatsAppClick(options: WhatsAppOptions = {}): void {
  track(
    "whatsapp_click",
    {
      room: options.room ?? null,
    },
    options.source ?? "unknown"
  );
}
