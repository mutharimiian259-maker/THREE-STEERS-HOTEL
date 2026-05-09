
import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent } from "@/lib/core/types";

/* =============================================================
   FETCH WITH TIMEOUT
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
   ERROR CLASSIFIER
   ============================================================= */

function classifyError(error: unknown) {
  if (error instanceof DOMException && error.name === "AbortError") {
    return "timeout";
  }

  if (error instanceof Error) return "network_error";

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
   LEAD ADAPTER (PURE TRANSPORT ONLY)
   ============================================================= */

export const LeadAdapter: EventAdapter = {
  name: "leads",

  async handle(event: StoredEvent) {
    if (typeof window === "undefined") return;

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
          payload: event.payload,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();

        console.error("[LeadAdapter] API rejected lead", {
          category: classifyResponse(response.status),
          status: response.status,
          error: errorText,
          event_id: event.id,
        });
      }
    } catch (err) {
      console.error("[LeadAdapter] failure", {
        type: classifyError(err),
        error: err,
        event_id: event.id,
      });
    }
  },
};
