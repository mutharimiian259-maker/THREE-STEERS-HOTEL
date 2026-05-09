
import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent } from "@/lib/core/types";
import { getFunnelStage } from "@/lib/core/funnelAccessor";

/* =============================================================
   FUNNEL ADAPTER (PURE TELEMETRY ONLY)
   ============================================================= */

export const FunnelAdapter: EventAdapter = {
  name: "funnel",

  handle(event: StoredEvent) {
    if (typeof window === "undefined") return;

    const stage = getFunnelStage(event.type);

    if (!stage) return;

    /**
     * NOTE:
     * Funnel state is derived in Core only.
     * This adapter is purely for observability.
     *
     * NO:
     * - localStorage writes
     * - history tracking
     * - session state
     */
  },
};
