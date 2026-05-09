import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent } from "@/lib/core/types";

import { getFunnelStage } from "@/lib/core/funnelAccessor";

const FUNNEL_KEY = "hotel_funnel_state";

/* =============================================================
   TYPES
   ============================================================= */

type FunnelHistoryEntry = Readonly<{
  stage: string;
  event: string;
  timestamp: number;
  signature?: string;
}>;

type FunnelStorage = Readonly<{
  session_id: string;
  stage: string;
  lastEvent: string;
  timestamp: number;
  history: readonly FunnelHistoryEntry[];
}>;

/* =============================================================
   SAFE STORAGE PARSER
   ============================================================= */

function safeParse(value: string | null): FunnelStorage | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as FunnelStorage;
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

    const stage = getFunnelStage(event.type);

    if (!stage) return;

    try {
      const existing = safeParse(localStorage.getItem(FUNNEL_KEY));

      /* =========================================================
         SESSION ISOLATION
         ========================================================= */

      const isSameSession =
        existing?.session_id === event.session_id;

      const baseHistory = isSameSession
        ? [...(existing?.history ?? [])]
        : [];

      /* =========================================================
         DEDUPE PROTECTION
         ========================================================= */

      const lastEntry = baseHistory[baseHistory.length - 1];

      const isDuplicate =
        lastEntry?.signature === event.signature;

      if (isDuplicate) {
        return;
      }

      /* =========================================================
         UPDATED STATE
         ========================================================= */

      const updated: FunnelStorage = {
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
            signature: event.signature,
          },
        ].slice(-50),
      };

      localStorage.setItem(
        FUNNEL_KEY,
        JSON.stringify(updated)
      );
    } catch (err) {
      console.error("[FunnelAdapter] failed", {
        error: err,
        event_id: event.id,
        type: event.type,
      });
    }
  },
};
