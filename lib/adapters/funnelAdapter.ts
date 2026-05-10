import type {
  EventAdapter,
} from "@/lib/core/router";

import type {
  StoredEvent,
} from "@/lib/core/types";

import { getFunnelStage } from "@/lib/core/funnelAccessor";

/* =============================================================
   FUNNEL TRACE RECORD (PURE OBSERVABILITY CONTRACT)
   ============================================================= */

type FunnelTraceRecord = Readonly<{
  eventId: string;
  type: string;
  stage: string;
  sessionId: string;
  timestamp: number;
  url: string;
}>;

/* =============================================================
   SAFE STORAGE ACCESS
   ============================================================= */

function safeParse<T>(value: string | null): T[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/* =============================================================
   FUNNEL ADAPTER (OBSERVABILITY LAYER ONLY)
   ============================================================= */

export const FunnelAdapter: EventAdapter = {
  name: "funnel",

  handle(event: StoredEvent) {
    const stage = getFunnelStage(event.type);

    if (!stage) return;

    const record: FunnelTraceRecord = {
      eventId: event.id,
      type: event.type,
      stage,
      sessionId: event.sessionId,
      timestamp: event.timestamp,
      url: event.url,
    };

    try {
      const existing =
        typeof window !== "undefined"
          ? localStorage.getItem(
              "funnel_trace_log"
            )
          : null;

      const log = safeParse<FunnelTraceRecord>(
        existing
      );

      log.push(record);

      // bounded history
      if (log.length > 200) log.shift();

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "funnel_trace_log",
          JSON.stringify(log)
        );
      }
    } catch (error) {
      console.warn(
        "[FUNNEL] failed to persist trace",
        error
      );
    }
  },
};
