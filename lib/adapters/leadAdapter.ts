import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent } from "@/lib/core/types";

import { isIntentEventType } from "@/lib/core/funnelAccessor";

/* =============================================================
   INTENT CHECK
   ============================================================= */

function isIntentEvent(event: StoredEvent): boolean {
  return isIntentEventType(event.type);
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
  if (
    error instanceof DOMException &&
    error.name === "AbortError"
  ) {
    return "timeout";
  }

  if (error instanceof Error) {
    return "network_error";
  }

  return "unknown_error";
}

/* =============================================================
   RESPONSE CLASSIFIER
   ============================================================= */

function classifyResponse(status: number): string {
  if (status >= 500) return "server_error";

  if (status === 429) return "rate_limited";

  if (status >= 400) return "client_error";

  return "unknown";
}

/* =============================================================
   DEDUPE CACHE
   ============================================================= */

const sentLeadEvents = new Set<string>();

/* =============================================================
   ADAPTER
   ============================================================= */

export const LeadAdapter: EventAdapter = {
  name: "leads",

  async handle(event: StoredEvent) {
    if (typeof window === "undefined") return;

    if (!isIntentEvent(event)) return;

    /* =========================================================
       DEDUPE PROTECTION
       ========================================================= */

    if (sentLeadEvents.has(event.signature)) {
      return;
    }

    sentLeadEvents.add(event.signature);

    try {
      const payload =
        typeof event.payload === "object" &&
        event.payload !== null
          ? event.payload
          : {};

      const response = await fetchWithTimeout(
        "/api/leads",
        {
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
              label:
                typeof payload.label === "string"
                  ? payload.label
                  : undefined,

              value:
                typeof payload.value === "number"
                  ? payload.value
                  : undefined,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error("[LeadAdapter] API rejected lead", {
          category: classifyResponse(response.status),

          status: response.status,

          error: errorText,

          event_id: event.id,
        });

        return;
      }
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
