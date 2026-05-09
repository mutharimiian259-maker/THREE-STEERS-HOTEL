
/* =============================================================
   CORE EVENT CONTRACTS (CANONICAL LAYER)
   ============================================================= */

export type EventId = string & { readonly __brand: "EventId" };
export type SessionId = string & { readonly __brand: "SessionId" };

/* =============================================================
   EVENT TYPES
   ============================================================= */

export type EventType =
  | "page_view"
  | "room_view"
  | "blog_view"
  | "whatsapp_click"
  | "call_click"
  | "booking_intent"
  | "navigation"
  | "system_error";

/* =============================================================
   EVENT SOURCES
   ============================================================= */

export type EventSource =
  | "navbar"
  | "footer"
  | "room_card"
  | "sticky_cta"
  | "exit_intent"
  | "call_bar"
  | "float_button"
  | "page"
  | "system"
  | "unknown";

/* =============================================================
   CORE PAYLOAD + METADATA
   ============================================================= */

export type EventPayload = Record<string, unknown>;

export type EventMetadata = Readonly<{
  pathname?: string;
  referrer?: string;
  user_agent?: string;
  device?: "mobile" | "desktop" | "tablet";
}>;

/* =============================================================
   FUNNEL STAGES
   ============================================================= */

export type FunnelStage =
  | "VISIT"
  | "ENGAGEMENT"
  | "INTENT"
  | "CONVERSION";

/* =============================================================
   FUNNEL MAP (SINGLE SOURCE OF TRUTH)
   ============================================================= */

export const FUNNEL_STAGE_MAP: Partial<Record<EventType, FunnelStage>> = {
  page_view: "VISIT",

  room_view: "ENGAGEMENT",
  blog_view: "ENGAGEMENT",
  navigation: "ENGAGEMENT",

  whatsapp_click: "INTENT",
  call_click: "INTENT",

  booking_intent: "CONVERSION",
};

/* =============================================================
   INTENT EVENTS
   ============================================================= */

export const INTENT_EVENT_TYPES = new Set<EventType>([
  "whatsapp_click",
  "call_click",
  "booking_intent",
]);

/* =============================================================
   VALIDATION SETS
   ============================================================= */

export const VALID_EVENT_TYPES = new Set<EventType>([
  "page_view",
  "room_view",
  "blog_view",
  "whatsapp_click",
  "call_click",
  "booking_intent",
  "navigation",
  "system_error",
]);

export const VALID_EVENT_SOURCES = new Set<EventSource>([
  "navbar",
  "footer",
  "room_card",
  "sticky_cta",
  "exit_intent",
  "call_bar",
  "float_button",
  "page",
  "system",
  "unknown",
]);

/* =============================================================
   SESSION ID (SINGLE SOURCE)
   ============================================================= */

const SESSION_KEY = "hotel_session_id";

export function getSessionId(): SessionId {
  if (typeof window === "undefined") {
    return crypto.randomUUID() as SessionId;
  }

  const existing = window.sessionStorage.getItem(SESSION_KEY);

  if (existing) return existing as SessionId;

  const id = crypto.randomUUID() as SessionId;

  window.sessionStorage.setItem(SESSION_KEY, id);

  return id;
}

/* =============================================================
   EVENT FACTORY (FIXED: SELF-CONTAINED CREATION)
   ============================================================= */

export function createEvent(input: {
  type: EventType;
  source: EventSource;
  payload: EventPayload;
  url: string;
  metadata?: EventMetadata;
}): StoredEvent {
  const timestamp = Date.now();

  const session_id = getSessionId();

  const id = crypto.randomUUID() as EventId;

  const event = {
    id,
    type: input.type,
    source: input.source,
    payload: input.payload,
    metadata: input.metadata,
    timestamp,
    url: input.url,
    session_id,
    version: 2,
  };

  return Object.freeze({
    ...event,
    signature: createEventSignature(
      input.type,
      input.source,
      input.payload,
      session_id,
      input.url,
      timestamp
    ),
  });
}

/* =============================================================
   SIGNATURE (SIMPLIFIED + STABLE)
   ============================================================= */

export function createEventSignature(
  type: EventType,
  source: EventSource,
  payload: EventPayload,
  session_id: SessionId,
  url: string,
  timestamp: number
): string {
  return [
    type,
    source,
    session_id,
    url,
    timestamp,
    JSON.stringify(payload),
  ].join("|");
}

/* =============================================================
   TYPE GUARDS
   ============================================================= */

export function isEventType(value: unknown): value is EventType {
  return typeof value === "string" && VALID_EVENT_TYPES.has(value as EventType);
}

export function isEventSource(value: unknown): value is EventSource {
  return typeof value === "string" && VALID_EVENT_SOURCES.has(value as EventSource);
}

export function isStoredEvent(value: unknown): value is StoredEvent {
  if (!value || typeof value !== "object") return false;

  const v = value as StoredEvent;

  return (
    typeof v.id === "string" &&
    isEventType(v.type) &&
    isEventSource(v.source) &&
    typeof v.timestamp === "number" &&
    typeof v.url === "string" &&
    typeof v.session_id === "string" &&
    typeof v.signature === "string"
  );
}

/* =============================================================
   SAFETY UTIL
   ============================================================= */

export function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${String(value)}`);
}
