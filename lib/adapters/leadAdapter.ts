import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent } from "@/lib/core/types";

export const LeadAdapter: EventAdapter = {
  name: "leads",

  async handle(event: StoredEvent) {
    const isIntent =
      event.type === "whatsapp_click" ||
      event.type === "call_click" ||
      event.type === "booking_intent";

    if (!isIntent) return;

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
    } catch (err) {
      console.error("[LeadAdapter]", err);
    }
  },
};
