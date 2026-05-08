/* =============================================================
   CORE EVENT CONTRACTS (CANONICAL LAYER)
   -------------------------------------------------------------
   This is the SINGLE source of truth for:
   - event types
   - event sources
   - stored event schema
   - funnel logic
   - storage contracts
   - intent classification

   RULE:
   Nothing outside this file may redefine:
   EventType, EventSource, StoredEvent, FunnelStage
   ============================================================= */

/* =============================================================
   BRANDED IDS (prevent cross-system misuse)
   ============================================================= */

export type EventId = string & { readonly __brand: "EventId" };
export type SessionId = string & { readonly __brand: "SessionId" };

/* =============================================================
   EVENT TYPES (business-level contract)
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
   EVENT SOURCES (origin authority)
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
   CORE PAYLOAD
   ============================================================= */

export type EventPayload = Record<string, unknown>;

/* =============================================================
   EVENT METADATA (non-business context only)
   ============================================================= */

export type EventMetadata = Readonly<{
  pathname?: string;
  referrer?: string;
  user_agent?: string;
  device?: "mobile" | "desktop" | "tablet";
}>;

/* =============================================================
   DELIVERY STATE (future replay / retry system)
   ============================================================= */

export type EventDeliveryState = Readonly<{
  dispatched: boolean;
  failed_adapters?: string[];
}>;

/* =============================================================
   STORED EVENT (CANONICAL IMMUTABLE RECORD)
   ============================================================= */

export type StoredEvent = Readonly<{
  id: EventId;
  type: EventType;
  source: EventSource;

  payload: EventPayload;
  metadata?: EventMetadata;

  timestamp: number;
  url: string;

  session_id: SessionId;

  signature: string;

  version: typeof STORAGE_SCHEMA_VERSION;

  delivery?: EventDeliveryState;
}>;

/* =============================================================
   STORAGE CONTRACTS
   ============================================================= */

export const STORAGE_SCHEMA_VERSION = 2 as const;

export const STORAGE_KEY_EVENTS = "hotel_events_v2" as const;
export const STORAGE_KEY_FUNNEL = "hotel_funnel_v2" as const;

export const STORAGE_MAX_EVENTS = 500 as const;

/* =============================================================
   FUNNEL STAGES (business progression model)
   ============================================================= */

export type FunnelStage =
  | "VISIT"
  | "ENGAGEMENT"
  | "INTENT"
  | "CONVERSION";

/* =============================================================
   EVENT → FUNNEL MAPPING (single authority)
   ============================================================= */

export const FUNNEL_STAGE_MAP: Partial<Record<EventType, FunnelStage>> =
  {
    page_view: "VISIT",

    room_view: "ENGAGEMENT",
    blog_view: "ENGAGEMENT",
    navigation: "ENGAGEMENT",

    whatsapp_click: "INTENT",
    call_click: "INTENT",

    booking_intent: "CONVERSION",
  };

/* =============================================================
   INTENT CLASSIFICATION (revenue-sensitive events)
   ============================================================= */

export const INTENT_EVENT_TYPES = new Set<EventType>([
  "whatsapp_click",
  "call_click",
  "booking_intent",
]);

/* =============================================================
   VALIDATION SETS (runtime safety layer)
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
   EVENT SIGNATURE HELPERS (dedupe + integrity)
   ============================================================= */

export function createEventSignature(
  type: EventType,
  source: EventSource,
  payload: EventPayload,
  session_id: SessionId,
  url: string,
  timestamp: number
): string {
  return JSON.stringify({
    type,
    source,
    payload,
    session_id,
    url,
    timestamp,
  });
}

/* =============================================================
   SESSION ID (browser-scoped identity)
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
   EVENT FACTORY (ONLY AUTHORIZED CREATOR)
   ============================================================= */

export function createEvent(input: {
  id: EventId;
  type: EventType;
  source: EventSource;
  payload: EventPayload;
  url: string;
  timestamp: number;
  session_id: SessionId;
  metadata?: EventMetadata;
}): StoredEvent {
  return Object.freeze({
    ...input,
    version: STORAGE_SCHEMA_VERSION,
    signature: createEventSignature(
      input.type,
      input.source,
      input.payload,
      input.session_id,
      input.url,
      input.timestamp
    ),
    delivery: {
      dispatched: false,
    },
  });
}

/* =============================================================
   TYPE GUARDS (runtime safety enforcement)
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
    typeof v.signature === "string" &&
    v.version === STORAGE_SCHEMA_VERSION
  );
}

/* =============================================================
   SAFETY UTIL
   ============================================================= */

export function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${String(value)}`);
}
