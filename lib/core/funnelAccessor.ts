import { FUNNEL_STAGE_MAP } from "@/lib/core/types";
import type { EventType, FunnelStage } from "@/lib/core/types";

/* =============================================================
   FUNNEL ACCESSOR (READ LAYER)
   -------------------------------------------------------------
   Single source for funnel state interpretation
   ============================================================= */

/* =============================================================
   STATIC RESOLUTION (event → stage)
   ============================================================= */

export function getFunnelStage(
  eventType?: EventType
): FunnelStage | null {
  if (!eventType) return null;

  return FUNNEL_STAGE_MAP[eventType] ?? null;
}

/* =============================================================
   INTENT CHECK (optional reuse from adapters)
   ============================================================= */

export function isIntentEventType(eventType: EventType): boolean {
  return (
    eventType === "whatsapp_click" ||
    eventType === "call_click" ||
    eventType === "booking_intent"
  );
}
