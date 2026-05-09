import { FUNNEL_STAGE_MAP } from "@/lib/core/types";
import type { EventType, FunnelStage } from "@/lib/core/types";

/* =============================================================
   FUNNEL ACCESSOR (READ-ONLY CORE INTERFACE)
   ============================================================= */

/**
 * Returns funnel stage for a given event type
 * Single source of truth: FUNNEL_STAGE_MAP
 */
export function getFunnelStage(eventType: EventType): FunnelStage {
  return FUNNEL_STAGE_MAP[eventType] ?? "VISITOR";
}

/* =============================================================
   INTENT DETECTION (DERIVED ONLY, NO DUPLICATE TRUTH)
   ============================================================= */

/**
 * Intent is defined purely by funnel stage
 * NOT by hardcoded event lists
 */
export function isIntentEventType(eventType: EventType): boolean {
  return getFunnelStage(eventType) === "INTENT";
}
