import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent } from "@/lib/core/types";
import { getFunnelStage } from "@/lib/core/funnelAccessor";

/* =============================================================
   FUNNEL ADAPTER (OBSERVABILITY LAYER)
   ============================================================= */

export const FunnelAdapter: EventAdapter = {
  name: "funnel",

  handle(event: StoredEvent) {
    const stage = getFunnelStage(event.type);

    if (!stage) return;

    /**
     * Funnel is treated as a derived event stream.
     * We emit a lightweight trace record for observability.
     */

    const record = {
      event_id: event.id,
      type: event.type,
      stage,
      session_id: event.sessionId,
      timestamp: event.timestamp,
      url: event.url,
    };

    // Lightweight observability sink (non-blocking)
    try {
      const existing = localStorage.getItem("funnel_trace_log");
      const log = existing ? JSON.parse(existing) : [];

      log.push(record);

      // keep bounded history
      if (log.length > 200) log.shift();

      localStorage.setItem("funnel_trace_log", JSON.stringify(log));
    } catch (error) {
      console.warn("[FUNNEL] failed to persist trace", error);
    }
  },
};
