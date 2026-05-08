import { track } from "@/lib/core/analytics";

type WhatsAppOptions = {
  source?: "navbar" | "footer" | "room_card" | "sticky_cta" | "exit_intent" | "unknown";
  room?: string;
};

/* =============================================================
   WHATSAPP CLICK TRACKER
   ============================================================= */

export function trackWhatsAppClick(
  options: WhatsAppOptions = {}
): void {
  try {
    track(
      "whatsapp_click",
      {
        // avoid null drift → keep schema consistent
        ...(options.room ? { room: options.room } : {}),
      },
      options.source ?? "unknown"
    );
  } catch (err) {
    console.error("[trackWhatsAppClick] failed", {
      error: err,
      source: options.source,
    });
  }
}
