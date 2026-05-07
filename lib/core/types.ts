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
 * CANONICAL EVENT CONTRACT
 * Treat as database schema equivalent
 */
export type StoredEvent = {
  id: string;
  type: EventType;
  source: EventSource;

  payload: EventPayload;

  timestamp: number;     // single source of truth

  url: string;
  session_id: string;

  signature: string;     // dedup + integrity hash

  version: number;       // schema versioning for future evolution
};
