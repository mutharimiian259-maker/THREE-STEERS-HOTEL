const LEAD_CACHE_PREFIX = "lead_last_sent_";
const LEAD_QUEUE_KEY = "lead_retry_queue";
const MAX_QUEUE_SIZE = 50;

type LeadType =
  | "room_view"
  | "whatsapp_click"
  | "call_click"
  | "email_click"
  | "blog_click"
  | "navigation";

type LeadPayload = {
  type: LeadType;
  time: string;
  url: string;
  referrer: string | null;
  device: {
    ua: string;
    lang: string;
  };
};

type LeadCache = {
  type: LeadType;
  time: number;
};

function getCacheKey(type: LeadType) {
  return `${LEAD_CACHE_PREFIX}${type}`;
}

function canSendLead(type: LeadType): boolean {
  if (typeof window === "undefined") return false;

  try {
    const key = getCacheKey(type);
    const last = localStorage.getItem(key);
    const now = Date.now();

    if (last) {
      const parsed: LeadCache | null = JSON.parse(last);

      if (
        parsed &&
        parsed.type === type &&
        now - parsed.time < 5000
      ) {
        return false;
      }
    }

    return true;
  } catch {
    return true;
  }
}

function markLeadSent(type: LeadType) {
  try {
    localStorage.setItem(
      getCacheKey(type),
      JSON.stringify({ type, time: Date.now() })
    );
  } catch {}
}

function isValidPayload(p: any): p is LeadPayload {
  return (
    p &&
    typeof p.type === "string" &&
    typeof p.time === "string" &&
    typeof p.url === "string"
  );
}

function getRetryQueue(): LeadPayload[] {
  try {
    const raw = localStorage.getItem(LEAD_QUEUE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed)
      ? parsed.filter(isValidPayload)
      : [];
  } catch {
    return [];
  }
}

function saveRetryQueue(queue: LeadPayload[]) {
  try {
    const trimmed = queue.slice(-MAX_QUEUE_SIZE);
    localStorage.setItem(
      LEAD_QUEUE_KEY,
      JSON.stringify(trimmed)
    );
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[LEAD] queue save failed", err);
    }
  }
}

function queueFailedLead(payload: LeadPayload) {
  const queue = getRetryQueue();

  const exists = queue.some(
    (q) =>
      q.type === payload.type &&
      q.url === payload.url &&
      q.time === payload.time
  );

  if (!exists) {
    queue.push(payload);
    saveRetryQueue(queue);
  }
}

async function sendLead(payload: LeadPayload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Bad response");

    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

async function flushQueue() {
  const queue = getRetryQueue();
  if (!queue.length) return;

  const remaining: LeadPayload[] = [];

  await Promise.all(
    queue.map(async (item) => {
      const ok = await sendLead(item);
      if (!ok) remaining.push(item);
    })
  );

  saveRetryQueue(remaining);
}

export async function trackLead(type: LeadType) {
  if (typeof window === "undefined") return;
  if (!type) return;

  // non-blocking retry
  flushQueue();

  if (!canSendLead(type)) return;

  const payload: LeadPayload = JSON.parse(
    JSON.stringify({
      type,
      time: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer || null,
      device: {
        ua: navigator.userAgent,
        lang: navigator.language,
      },
    })
  );

  const success = await sendLead(payload);

  if (success) {
    markLeadSent(type);
  } else {
    queueFailedLead(payload);
  }
}
