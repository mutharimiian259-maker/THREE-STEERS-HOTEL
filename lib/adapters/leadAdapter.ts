import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent } from "@/lib/core/types";
import { INTENT_EVENT_TYPES } from "@/lib/core/types";

/* =============================================================
   INTENT CHECK
   ============================================================= */

function isIntentEvent(event: StoredEvent): boolean {
  return INTENT_EVENT_TYPES.has(event.type);
}

/* =============================================================
   FETCH WITH TIMEOUT (ABORT SAFE)
   ============================================================= */

function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout = 4000
): Promise<Response> {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, timeout);

  return fetch(url, {
    ...options,
    signal: controller.signal,
  }).finally(() => {
    clearTimeout(timer);
  });
}

/* =============================================================
   ERROR CLASSIFIER
   ============================================================= */

function classifyError(error: unknown) {
  if (error instanceof DOMException && error.name === "AbortError") {
    return "timeout";
  }

  if (error instanceof Error) {
    return "network_error";
  }

  return "unknown_error";
}

/* =============================================================
   ADAPTER
   ============================================================= */

export const LeadAdapter: EventAdapter = {
  name: "leads",

  async handle(event: StoredEvent) {
    if (typeof window === "undefined") return;

    if (!isIntentEvent(event)) return;

    try {
      const response = await fetchWithTimeout("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          event_id: event.id,

          type: event.type,
          source: event.source,
          timestamp: event.timestamp,
          session_id: event.session_id,
          url: event.url,

          payload: {
            label: event.payload?.label,
            value: event.payload?.value,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();

        console.error("[LeadAdapter] API rejected lead", {
          status: response.status,
          error: errorText,
          event_id: event.id,
        });

        return;
      }

      return;
    } catch (err) {
      console.error("[LeadAdapter] failure", {
        type: classifyError(err),
        error: err,
        event_id: event.id,
      });

      return;
    }
  },
};
