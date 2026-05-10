import type {
  EventAdapter,
} from "@/lib/core/router";

import type {
  StoredEvent,
} from "@/lib/core/types";

/* =============================================================
   CONFIG (TEMPORARY - SHOULD MOVE TO INFRA CONFIG LAYER)
   ============================================================= */

const STORAGE_KEY = "hotel_events";
const MAX_EVENTS = 200;

/* =============================================================
   SAFE PARSER
   ============================================================= */

function safeParse<T>(
  value: string | null
): T[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
}

/* =============================================================
   DEDUP (FULL SCAN - SAFE VERSION)
   ============================================================= */

function isDuplicate(
  existing: StoredEvent[],
  event: StoredEvent
): boolean {
  return existing.some(
    (e) =>
      e.id === event.id ||
      e.signature === event.signature
  );
}

/* =============================================================
   ADAPTER (STORAGE TRANSPORT ONLY)
   ============================================================= */

export const LocalStorageAdapter: EventAdapter = {
  name: "localStorage",

  handle(event: StoredEvent) {
    if (typeof window === "undefined") return;

    try {
      const raw =
        localStorage.getItem(STORAGE_KEY);

      const existing =
        safeParse<StoredEvent>(raw);

      if (isDuplicate(existing, event)) return;

      const updated = [
        ...existing,
        event,
      ].slice(-MAX_EVENTS);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );
    } catch (err) {
      console.error(
        "[LocalStorageAdapter] failed",
        {
          error: err,
          event_id: event.id,
        }
      );

      // FUTURE:
      // - fallback memory buffer
      // - retry queue
      // - or event replay system
    }
  },
};
