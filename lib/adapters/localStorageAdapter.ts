import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent } from "@/lib/core/types";

const KEY = "hotel_events";

export const LocalStorageAdapter: EventAdapter = {
  name: "localStorage",

  handle(event: StoredEvent) {
    if (typeof window === "undefined") return;

    try {
      const raw = localStorage.getItem(KEY);

      let existing: StoredEvent[] = [];

      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            existing = parsed;
          }
        } catch {
          // corrupted storage recovery
          existing = [];
        }
      }

      const updated = [...existing, event].slice(-500);

      localStorage.setItem(KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("[LocalStorageAdapter]", err);
    }
  },
};
