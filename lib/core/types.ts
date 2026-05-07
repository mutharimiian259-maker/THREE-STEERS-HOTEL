export type EventType =
  | "page_view"
  | "room_view"
  | "whatsapp_click"
  | "call_click"
  | "booking_intent";

export type EventSource =
  | "navbar"
  | "footer"
  | "room_card"
  | "sticky_cta"
  | "exit_intent"
  | "page"
  | "unknown";

export type EventPayload = Record<string, unknown>;

/**
 * Internal canonical event object
 */
export type StoredEvent = {
  id: string;
  type: EventType;
  payload: EventPayload;
  time: string;
  ts: number;
  url: string;
  origin: EventSource;
  session_id: string;
  _sig: string;
};
