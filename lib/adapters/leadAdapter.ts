import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent, EventType } from "@/lib/core/types";

/* =============================================================
   INTENT FILTER (LEAD-GRADE EVENTS ONLY)
   ============================================================= */

const LEAD_EVENTS = new Set<EventType>([
  "whatsapp_click",
  "call_click",
  "booking_intent",
]);

function isLeadEvent(event: StoredEvent): boolean {
  return LEAD_EVENTS.has(event.type);
}

/* =============================================================
   FETCH WITH TIMEOUT (SHOULD EVENTUALLY MOVE TO /lib/core/net)
   ============================================================= */

function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout = 4000
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  return fetch(url, {
    ...options,
    signal: controller.signal,
  }).finally(() => clearTimeout(timer));
}

/* =============================================================
   LEAD ADAPTER (PURE TRANSPORT ONLY)
   ============================================================= */

export const LeadAdapter: EventAdapter = {
  name: "leads",

  async handle(event: StoredEvent) {
    if (typeof window === "undefined") return;

    /* =========================================================
       DOMAIN FILTERING (CRITICAL FIX)
       ========================================================= */

    if (!isLeadEvent(event)) return;

    try {
      const response = await fetchWithTimeout("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        /* =====================================================
           SEND FULL CANONICAL EVENT (NO RECONSTRUCTION)
           ===================================================== */
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        console.error("[LeadAdapter] API rejected lead", {
          status: response.status,
          event_id: event.id,
        });
      }
    } catch (err) {
      console.error("[LeadAdapter] failure", {
        error: err,
        event_id: event.id,
      });
    }
  },
};
