import { track } from "@/lib/core/analytics";
import type { EventSource } from "@/lib/core/types";

type WhatsAppOptions = {
  source?: EventSource;
  room?: string;
};

/* =============================================================
   WHATSAPP CLICK TRACKER
   -------------------------------------------------------------
   SAFE ANALYTICS WRAPPER (NON-BLOCKING)
   ============================================================= */

export function trackWhatsAppClick(
  options: WhatsAppOptions = {}
): void {
  try {
    /* =========================================================
       FIRE-AND-FORGET (EXPLICIT)
       ========================================================= */

    void track(
      "whatsapp_click",
      {
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
