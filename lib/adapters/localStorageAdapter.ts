import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent } from "@/lib/core/types";

const KEY = "hotel_events";

export const LocalStorageAdapter: EventAdapter = {
  name: "localStorage",

  handle(event: StoredEvent) {
    try {
      const existing = JSON.parse(localStorage.getItem(KEY) || "[]");

      existing.push(event);

      localStorage.setItem(
        KEY,
        JSON.stringify(existing.slice(-500)) // bounded memory
      );
    } catch (err) {
      console.error("[LocalStorageAdapter]", err);
    }
  },
};
