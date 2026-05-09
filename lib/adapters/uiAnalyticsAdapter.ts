
import { track as coreTrack } from "@/lib/core/analytics";
import type { EventType, EventSource } from "@/lib/core/types";

/* =============================================================
   UI ANALYTICS ADAPTER (PASSIVE LAYER ONLY)
   ============================================================= */

export function track(
  type: EventType,
  payload: Record<string, unknown> = {},
  origin: EventSource = "unknown"
): void {
  /**
   * FORWARD ONLY TO CORE
   * NO LOCAL STATE
   * NO STORAGE
   * NO DEDUP
   * NO GA
   * NO EVENT BUS
   */

  coreTrack(type, payload, origin);
}
