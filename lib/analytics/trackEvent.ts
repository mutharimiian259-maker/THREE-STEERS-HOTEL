export type EventType =
  | "page_view"
  | "room_view"
  | "whatsapp_click"
  | "call_click"
  | "funnel_step"
  | "booking_intent";

type Payload = {
  id: string;
  event: EventType;
  data: Record<string, unknown>;
  time: string;
  url: string;
};

const STORAGE_KEY = "hotel_analytics";
const MAX_EVENTS = 200;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Improved duplicate detection:
 * prevents same event spam within same session context
 */
function isDuplicate(a: Payload, b: Payload): boolean {
  if (a.event !== b.event) return false;
  if (a.url !== b.url) return false;

  return JSON.stringify(a.data) === JSON.stringify(b.data);
}

export function trackEvent(
  event: EventType,
  data: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;

  const payload: Payload = {
    id: generateId(),
    event,
    data,
    time: new Date().toISOString(),
    url: window.location.href,
  };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const events: Payload[] = raw ? JSON.parse(raw) : [];

    const last = events.at(-1);

    if (last && isDuplicate(last, payload)) return;

    events.push(payload);

    // simple bounded storage
    if (events.length > MAX_EVENTS) {
      events.splice(0, events.length - MAX_EVENTS);
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));

    const w = window as Window & {
      gtag?: (command: string, event: string, params?: Record<string, unknown>) => void;
    };

    if (typeof w.gtag === "function") {
      w.gtag("event", event, {
        ...data,
        page_location: payload.url,
      });
    }
  } catch {
    // silent fail (safe for production)
  }
}
