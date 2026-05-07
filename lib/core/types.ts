export type EventType =
  | "page_view"
  | "room_view"
  | "whatsapp_click"
  | "call_click"
  | "booking_intent"
  | "system_error"; // added observability layer

export type EventSource =
  | "navbar"
  | "footer"
  | "room_card"
  | "sticky_cta"
  | "exit_intent"
  | "page"
  | "system"        // added internal system origin
  | "unknown";

export type EventPayload = Record<string, unknown>;

/**
 * CANONICAL EVENT CONTRACT
 * Treated as immutable schema boundary
 */
export type StoredEvent = {
  id: string;
  type: EventType;
  source: EventSource;

  payload: EventPayload;

  timestamp: number;

  url: string;
  session_id: string;

  signature: string;

  version: number;

  /**
   * OPTIONAL OBSERVABILITY EXTENSION
   * (safe to ignore if unused)
   */
  status?: "created" | "processed" | "failed";

  adapters?: string[]; // which adapters handled this event
};
