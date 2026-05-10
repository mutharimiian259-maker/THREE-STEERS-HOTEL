export type EventId = string & { readonly __brand: "EventId" };

export type SessionId = string & {
  readonly __brand: "SessionId";
};

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
  userAgent?: string;
  device?: "mobile" | "desktop" | "tablet";
}>;

/* =============================================================
   TRACKING INPUT CONTRACT
   UI → CORE
   ============================================================= */

export type TrackingRequest = Readonly<{
  type: EventType;
  source?: EventSource;
  payload?: EventPayload;
  metadata?: EventMetadata;
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
   FUNNEL MAP
   ============================================================= */

export const FUNNEL_STAGE_MAP: Partial<
  Record<EventType, FunnelStage>
> = {
  page_view: "VISIT",

  room_view: "ENGAGEMENT",
  blog_view: "ENGAGEMENT",
  navigation: "ENGAGEMENT",

  whatsapp_click: "INTENT",
  call_click: "INTENT",

  booking_intent: "CONVERSION",
};

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
   SESSION CONTRACT
   ============================================================= */

const SESSION_KEY = "hotel_session_id";

export function getSessionId(): SessionId {
  if (typeof window === "undefined") {
    return crypto.randomUUID() as SessionId;
  }

  const existing = window.sessionStorage.getItem(
    SESSION_KEY
  );

  if (existing) {
    return existing as SessionId;
  }

  const id = crypto.randomUUID() as SessionId;

  window.sessionStorage.setItem(SESSION_KEY, id);

  return id;
}

/* =============================================================
   STORED EVENT
   CORE → ADAPTERS
   ============================================================= */

export type StoredEvent = Readonly<{
  id: EventId;
  type: EventType;
  source: EventSource;
  payload: EventPayload;
  metadata?: EventMetadata;
  timestamp: number;
  url: string;
  sessionId: SessionId;
  version: number;
  signature: string;
}>;

/* =============================================================
   EVENT SCHEMA VERSION
   ============================================================= */

export const EVENT_SCHEMA_VERSION = 2;

/* =============================================================
   EVENT FACTORY
   ============================================================= */

export function createEvent(
  input: TrackingRequest & {
    id: EventId;
    url: string;
    sessionId: SessionId;
  }
): StoredEvent {
  const timestamp = Date.now();

  const source: EventSource =
    input.source ?? "unknown";

  const payload: EventPayload =
    input.payload ?? {};

  const event: StoredEvent = {
    id: input.id,
    type: input.type,
    source,
    payload,
    metadata: input.metadata,
    url: input.url,
    sessionId: input.sessionId,

    timestamp,

    version: EVENT_SCHEMA_VERSION,

    signature: createEventSignature(
      input.type,
      source,
      input.sessionId,
      input.url,
      payload
    ),
  };

  return Object.freeze(event);
}

/* =============================================================
   DETERMINISTIC SIGNATURE
   ============================================================= */

export function createEventSignature(
  type: EventType,
  source: EventSource,
  sessionId: SessionId,
  url: string,
  payload: EventPayload
): string {
  return [
    type,
    source,
    sessionId,
    url,
    JSON.stringify(payload),
  ].join("|");
}

/* =============================================================
   TYPE GUARDS
   ============================================================= */

export function isEventType(
  value: unknown
): value is EventType {
  return (
    typeof value === "string" &&
    VALID_EVENT_TYPES.has(value as EventType)
  );
}

export function isEventSource(
  value: unknown
): value is EventSource {
  return (
    typeof value === "string" &&
    VALID_EVENT_SOURCES.has(value as EventSource)
  );
}

export function isStoredEvent(
  value: unknown
): value is StoredEvent {
  if (!value || typeof value !== "object") {
    return false;
  }

  const v = value as StoredEvent;

  return (
    typeof v.id === "string" &&
    isEventType(v.type) &&
    isEventSource(v.source) &&
    typeof v.timestamp === "number" &&
    typeof v.url === "string" &&
    typeof v.sessionId === "string" &&
    typeof v.signature === "string"
  );
}

/* =============================================================
   SAFETY UTIL
   ============================================================= */

export function assertNever(
  value: never
): never {
  throw new Error(
    `Unhandled case: ${String(value)}`
  );
}
