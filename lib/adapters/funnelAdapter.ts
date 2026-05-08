import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent } from "@/lib/core/types";
import { FUNNEL_STAGE_MAP } from "@/lib/core/types";

const FUNNEL_KEY = "hotel_funnel_state";

/* =============================================================
   SAFE STORAGE PARSER
   ============================================================= */

function safeParse(value: string | null) {
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

/* =============================================================
   ADAPTER
   ============================================================= */

export const FunnelAdapter: EventAdapter = {
  name: "funnel",

  handle(event: StoredEvent) {
    if (typeof window === "undefined") return;

    const stage = FUNNEL_STAGE_MAP[event.type];
    if (!stage) return;

    try {
      const existing = safeParse(localStorage.getItem(FUNNEL_KEY));

      // session isolation check (critical fix)
      const isSameSession =
        existing?.session_id === event.session_id;

      const baseHistory = isSameSession ? existing?.history ?? [] : [];

      const updated = {
        session_id: event.session_id,

        stage,

        lastEvent: event.type,
        timestamp: event.timestamp,

        history: [
          ...baseHistory,
          {
            stage,
            event: event.type,
            timestamp: event.timestamp,
          },
        ].slice(-50),
      };

      localStorage.setItem(FUNNEL_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("[FunnelAdapter] failed", {
        error: err,
        event_id: event.id,
        type: event.type,
      });
    }
  },
};
