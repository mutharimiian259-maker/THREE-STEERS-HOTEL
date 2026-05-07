import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent } from "@/lib/core/types";

export const LeadAdapter: EventAdapter = {
  name: "leads",

  async handle(event: StoredEvent) {
    if (typeof window === "undefined") return;

    const isIntent =
      event.type === "whatsapp_click" ||
      event.type === "call_click" ||
      event.type === "booking_intent";

    if (!isIntent) return;

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // send only what backend needs (decoupling fix)
        body: JSON.stringify({
          type: event.type,
          source: event.source,
          payload: event.payload,
          timestamp: event.timestamp,
          session_id: event.session_id,
          url: event.url,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[LeadAdapter] API rejected lead", errorText, event);
      }
    } catch (err) {
      console.error("[LeadAdapter] network failure", err, event);
    }
  },
};
