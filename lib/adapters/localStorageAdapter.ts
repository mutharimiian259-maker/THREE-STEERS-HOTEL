import type { EventAdapter } from "@/lib/core/router";

import type { StoredEvent } from "@/lib/core/types";

import {
  isStoredEvent,
  STORAGE_KEY_EVENTS,
  STORAGE_MAX_EVENTS,
} from "@/lib/core/types";

/* =============================================================
   STORAGE KEY
   ============================================================= */

const KEY = STORAGE_KEY_EVENTS;

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
   EVENT DEDUPLICATION
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
   ADAPTER
   ============================================================= */

export const LocalStorageAdapter: EventAdapter = {
  name: "localStorage",

  handle(event: StoredEvent) {
    if (typeof window === "undefined") return;

    try {
      const existingRaw = localStorage.getItem(KEY);

      const parsed = safeParse(existingRaw);

      /* =========================================================
         STRICT VALIDATION
         ========================================================= */

      const existing: StoredEvent[] =
        parsed.filter(isStoredEvent);

      /* =========================================================
         DEDUPE PROTECTION
         ========================================================= */

      if (isDuplicate(existing, event)) {
        return;
      }

      /* =========================================================
         BOUNDED STORAGE
         ========================================================= */

      const updated = [
        ...existing,
        event,
      ].slice(-STORAGE_MAX_EVENTS);

      localStorage.setItem(
        KEY,
        JSON.stringify(updated)
      );
    } catch (err) {
      console.error("[LocalStorageAdapter] failed", {
        error: err,

        event_id: event.id,
      });

      /* =========================================================
         FUTURE FALLBACK POINT
         ========================================================= */
    }
  },
};
