import {
  FUNNEL_STAGE_MAP,
} from "@/lib/core/types";

import type {
  EventType,
  FunnelStage,
} from "@/lib/core/types";

/* =============================================================
   FUNNEL ACCESSOR (READ-ONLY CORE INTERFACE)
   ============================================================= */

/**
 * Canonical funnel stage resolver
 * Contracts Layer remains source of truth
 */
export function getFunnelStage(
  eventType: EventType
): FunnelStage | undefined {
  return FUNNEL_STAGE_MAP[eventType];
}

/* =============================================================
   SAFE FUNNEL RESOLVER (STABILIZED)
   ============================================================= */

/**
 * Prevents silent undefined funnel states
 * Used for runtime-safe analytics pipelines
 */
export function getSafeFunnelStage(
  eventType: EventType
): FunnelStage {
  return (
    FUNNEL_STAGE_MAP[eventType] ?? "VISIT"
  );
}

/* =============================================================
   INTENT DETECTION (DERIVED SIGNAL)
   ============================================================= */

/**
 * Funnel-based intent detection (stable baseline)
 * Future: can be extended with behavioral signals
 */
export function isIntentEventType(
  eventType: EventType
): boolean {
  return getFunnelStage(eventType) === "INTENT";
}

/* =============================================================
   FUTURE PLATFORM HOOK (EXTENSION READY)
   ============================================================= */

/**
 * Reserved for multi-tenant overrides later
 * Do NOT remove — this is migration scaffolding
 */
export function resolveFunnelStageWithOverrides(
  eventType: EventType,
  overrideMap?: Partial<
    Record<EventType, FunnelStage>
  >
): FunnelStage {
  return (
    overrideMap?.[eventType] ??
    FUNNEL_STAGE_MAP[eventType] ??
    "VISIT"
  );
}
