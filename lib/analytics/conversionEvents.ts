import { trackEvent } from "./trackEvent";

function isValid(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export const FunnelEvents = {
  viewRoom: (room: string) => {
    if (!isValid(room)) return;

    try {
      trackEvent("room_view", { room: room.trim() });
    } catch {
      // silent fail
    }
  },

  startIntent: (source: string) => {
    if (!isValid(source)) return;

    try {
      trackEvent("booking_intent", { source: source.trim() });
    } catch {
      // silent fail
    }
  },

  whatsappClick: (source: string) => {
    if (!isValid(source)) return;

    try {
      trackEvent("whatsapp_click", { source: source.trim() });
    } catch {
      // silent fail
    }
  },

  callClick: (source: string) => {
    if (!isValid(source)) return;

    try {
      trackEvent("call_click", { source: source.trim() });
    } catch {
      // silent fail
    }
  },
};
