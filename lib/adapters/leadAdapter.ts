import type {
  EventAdapter,
} from "@/lib/core/router";

import type {
  StoredEvent,
} from "@/lib/core/types";

import {
  isLeadEvent,
} from "@/lib/domain/leads";

import {
  fetchWithTimeout,
} from "@/lib/core/net/fetchWithTimeout";

/* =============================================================
   LEAD ADAPTER (TRANSPORT ONLY)
   ============================================================= */

export const LeadAdapter: EventAdapter = {
  name: "leads",

  async handle(event: StoredEvent) {
    if (typeof window === "undefined") return;

    /* =========================================================
       DOMAIN FILTER (MOVED OUT OF ADAPTER)
       ========================================================= */

    if (!isLeadEvent(event)) return;

    try {
      const response =
        await fetchWithTimeout(
          "/api/leads",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(event),
          }
        );

      if (!response.ok) {
        console.error(
          "[LeadAdapter] API rejected lead",
          {
            status: response.status,
            event_id: event.id,
          }
        );
      }
    } catch (err) {
      console.error(
        "[LeadAdapter] failure",
        {
          error: err,
          event_id: event.id,
        }
      );
    }
  },
};
