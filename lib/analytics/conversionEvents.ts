import { trackEvent } from "./trackEvent";

function isValid(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Semantic funnel event layer (thin wrapper only)
 * Keeps business meaning but avoids duplication
 */
export const FunnelEvents = {
  viewRoom(room: string) {
    if (!isValid(room)) return;

    trackEvent("room_view", {
      room: room.trim(),
    });
  },

  startIntent(source: string) {
    if (!isValid(source)) return;

    trackEvent("booking_intent", {
      source: source.trim(),
    });
  },

  whatsappClick(source: string) {
    if (!isValid(source)) return;

    trackEvent("whatsapp_click", {
      source: source.trim(),
    });
  },

  callClick(source: string) {
    if (!isValid(source)) return;

    trackEvent("call_click", {
      source: source.trim(),
    });
  },
};
