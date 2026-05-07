import type { EventAdapter } from "@/lib/core/router";
import type { StoredEvent } from "@/lib/core/types";

export const GAAdapter: EventAdapter = {
  name: "ga",

  handle(event: StoredEvent) {
    if (typeof window === "undefined") return;
    if (!window.gtag) return;

    window.gtag("event", event.type, {
      event_category: event.source,
      event_label: event.payload?.label ?? "",
      value: event.payload?.value ?? 0,
      page_location: event.url,
      session_id: event.session_id,
    });
  },
};
