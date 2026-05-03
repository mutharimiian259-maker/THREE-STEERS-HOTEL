import { track, EventType } from "@/lib/core/analytics";

function isValid(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * 🔥 PURE DOMAIN EVENT LAYER
 * Only expresses business intent
 * NO analytics logic duplication
 */
export const FunnelEvents = {
  viewRoom(room: string) {
    if (!isValid(room)) return;

    track("room_view", {
      room: room.trim(),
    });
  },

  startIntent(source: string) {
    if (!isValid(source)) return;

    /**
     * NOTE:
     * booking_intent is NOT a tracked event type yet.
     * We map it to existing system-safe event.
     */
    track("page_view", {
      source: source.trim(),
      intent: "booking",
    });
  },

  whatsappClick(source: string) {
    if (!isValid(source)) return;

    track("whatsapp_click", {
      source: source.trim(),
    });
  },

  callClick(source: string) {
    if (!isValid(source)) return;

    track("call_click", {
      source: source.trim(),
    });
  },
};
