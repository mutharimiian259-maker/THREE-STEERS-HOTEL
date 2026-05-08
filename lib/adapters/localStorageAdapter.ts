import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent } from "@/lib/core/types";
import { isStoredEvent } from "@/lib/core/types";

const KEY = "hotel_events";

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
  return existing.some((e) => e.id === event.id);
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

      // validate stored events strictly
      const existing: StoredEvent[] = parsed.filter(isStoredEvent);

      // prevent duplicate writes (critical for analytics accuracy)
      if (isDuplicate(existing, event)) return;

      const updated = [...existing, event].slice(-500);

      localStorage.setItem(KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("[LocalStorageAdapter] failed", {
        error: err,
        event_id: event.id,
      });

      // optional: graceful degradation point (could trigger fallback later)
    }
  },
};
