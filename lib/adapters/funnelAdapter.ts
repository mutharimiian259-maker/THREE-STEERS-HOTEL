import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent } from "@/lib/core/types";

const FUNNEL_KEY = "hotel_funnel_state";

const STAGE_MAP: Record<string, string> = {
  page_view: "VISIT",
  room_view: "ENGAGEMENT",
  navigation: "ENGAGEMENT",
  whatsapp_click: "INTENT",
  call_click: "INTENT",
  booking_intent: "CONVERSION",
};

export const FunnelAdapter: EventAdapter = {
  name: "funnel",

  handle(event: StoredEvent) {
    if (typeof window === "undefined") return;

    const stage = STAGE_MAP[event.type];
    if (!stage) return;

    try {
      const existingRaw = localStorage.getItem(FUNNEL_KEY);

      const existing = existingRaw ? JSON.parse(existingRaw) : null;

      const updated = {
        stage,

        lastEvent: event.type,
        timestamp: event.timestamp,
        session_id: event.session_id,

        // preserve funnel continuity (important fix)
        history: [
          ...(existing?.history ?? []),
          {
            stage,
            event: event.type,
            timestamp: event.timestamp,
          },
        ].slice(-50), // prevent infinite growth
      };

      localStorage.setItem(FUNNEL_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("[FunnelAdapter] failed", err, event);
    }
  },
};
