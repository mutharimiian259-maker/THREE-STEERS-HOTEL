import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent } from "@/lib/core/types";

/* =============================================================
   CONFIG (MOVE THESE OUT OF TYPES.TS IN FUTURE REFACTOR)
   ============================================================= */

const STORAGE_KEY_EVENTS = "hotel_events";
const STORAGE_MAX_EVENTS = 200;

/* =============================================================
   SAFE PARSER
   ============================================================= */

function safeParse(value: string | null): unknown[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/* =============================================================
   DEDUP (SESSION-SAFE LIGHTWEIGHT VERSION)
   ============================================================= */

function isDuplicate(existing: StoredEvent[], event: StoredEvent): boolean {
  const last = existing[existing.length - 1];

  if (!last) return false;

  return (
    last.id === event.id ||
    last.signature === event.signature
  );
}

/* =============================================================
   ADAPTER
   ============================================================= */

export const LocalStorageAdapter: EventAdapter = {
  name: "localStorage",

  handle(event: StoredEvent) {
    if (typeof window === "undefined") return;

    try {
      const raw = localStorage.getItem(STORAGE_KEY_EVENTS);
      const existing = safeParse(raw) as StoredEvent[];

      const cleaned = existing.filter(
        (e): e is StoredEvent =>
          e &&
          typeof e.id === "string" &&
          typeof e.signature === "string"
      );

      if (isDuplicate(cleaned, event)) return;

      const updated = [...cleaned, event].slice(
        -STORAGE_MAX_EVENTS
      );

      localStorage.setItem(
        STORAGE_KEY_EVENTS,
        JSON.stringify(updated)
      );
    } catch (err) {
      console.error("[LocalStorageAdapter] failed", {
        error: err,
        event_id: event.id,
      });

      /* FUTURE: fallback to memory buffer or retry queue */
    }
  },
};
