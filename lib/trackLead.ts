const LEAD_CACHE_PREFIX = "lead_last_sent_";
const LEAD_QUEUE_KEY = "lead_retry_queue";

type LeadType =
  | "room_view"
  | "whatsapp_click"
  | "call_click"
  | "email_click"
  | "blog_click"
  | "navigation";

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
        now - parsed.time < 5000 // reduced but safer
      ) {
        return false;
      }
    }

    localStorage.setItem(
      key,
      JSON.stringify({ type, time: now })
    );

    return true;
  } catch {
    return true; // fail open (avoid losing leads)
  }
}

function getRetryQueue(): any[] {
  try {
    const raw = localStorage.getItem(LEAD_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRetryQueue(queue: any[]) {
  try {
    localStorage.setItem(
      LEAD_QUEUE_KEY,
      JSON.stringify(queue)
    );
  } catch {}
}

function queueFailedLead(payload: any) {
  const queue = getRetryQueue();
  queue.push(payload);
  saveRetryQueue(queue);
}

async function flushQueue() {
  const queue = getRetryQueue();
  if (!queue.length) return;

  const remaining: any[] = [];

  for (const item of queue) {
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
    } catch {
      remaining.push(item);
    }
  }

  saveRetryQueue(remaining);
}

export async function trackLead(type: LeadType) {
  if (typeof window === "undefined") return;
  if (!type) return;

  await flushQueue();

  if (!canSendLead(type)) return;

  const payload = {
    type,
    time: new Date().toISOString(),
    url: window.location.href,
    referrer: document.referrer || null,
    device: {
      ua: navigator.userAgent,
      lang: navigator.language,
    },
  };

  try {
    const controller = new AbortController();

    const timeout = setTimeout(
      () => controller.abort(),
      10000
    );

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify(payload),
    });

    clearTimeout(timeout);

    if (!res.ok) {
      queueFailedLead(payload);
      console.error("[LEAD ERROR]", res.status);
    }
  } catch (error) {
    queueFailedLead(payload);
    console.error("[LEAD FAILED]", error);
  }
}
