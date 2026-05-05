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
  url: string;
  time: number;
};

let isFlushing = false;

function getCacheKey(type: LeadType) {
  return `${LEAD_CACHE_PREFIX}${type}`;
}

function canSendLead(type: LeadType, url: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    const key = getCacheKey(type);
    const last = localStorage.getItem(key);

    if (!last) return true;

    const parsed: LeadCache = JSON.parse(last);

    const now = Date.now();

    // stricter + safer dedup window
    const SAME_PAGE_WINDOW = 5000;

    if (
      parsed?.type === type &&
      parsed?.url === url &&
      now - parsed.time < SAME_PAGE_WINDOW
    ) {
      return false;
    }

    return true;
  } catch {
    return true;
  }
}

function markLeadSent(type: LeadType, url: string) {
  try {
    localStorage.setItem(
      getCacheKey(type),
      JSON.stringify({
        type,
        url,
        time: Date.now(),
      })
    );
  } catch {}
}

function isValidPayload(p: any): p is LeadPayload {
  return (
    p &&
    typeof p.type === "string" &&
    typeof p.time === "string" &&
    typeof p.url === "string" &&
    typeof p.device === "object" &&
    typeof p.device.ua === "string"
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
    localStorage.setItem(
      LEAD_QUEUE_KEY,
      JSON.stringify(queue.slice(-MAX_QUEUE_SIZE))
    );
  } catch (err) {
    console.error("[LEAD] queue save failed", err);
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

async function sendLead(payload: LeadPayload): Promise<boolean> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify(payload),
    });

    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * FIXED: deterministic queue flush (no race condition)
 */
async function flushQueue() {
  if (isFlushing) return;
  isFlushing = true;

  const queue = getRetryQueue();
  if (!queue.length) {
    isFlushing = false;
    return;
  }

  const remaining: LeadPayload[] = [];

  for (const item of queue) {
    const ok = await sendLead(item);
    if (!ok) remaining.push(item);
  }

  saveRetryQueue(remaining);
  isFlushing = false;
}

export async function trackLead(type: LeadType) {
  if (typeof window === "undefined") return;

  const url = window.location.href;

  // start recovery in background (non-blocking but safe)
  flushQueue();

  if (!canSendLead(type, url)) return;

  const payload: LeadPayload = {
    type,
    time: new Date().toISOString(),
    url,
    referrer: document.referrer || null,
    device: {
      ua: navigator.userAgent,
      lang: navigator.language,
    },
  };

  const success = await sendLead(payload);

  if (success) {
    markLeadSent(type, url);
  } else {
    queueFailedLead(payload);
  }
}
