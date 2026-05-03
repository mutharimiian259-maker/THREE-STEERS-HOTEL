const LEAD_CACHE_KEY = "lead_last_sent";

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

function canSendLead(type: LeadType): boolean {
  if (typeof window === "undefined") return false;

  try {
    const raw = localStorage.getItem(LEAD_CACHE_KEY);
    const now = Date.now();

    if (raw) {
      const parsed: LeadCache = JSON.parse(raw);

      if (
        parsed?.type === type &&
        now - parsed?.time < 10000
      ) {
        return false;
      }
    }

    const nextCache: LeadCache = { type, time: now };

    localStorage.setItem(
      LEAD_CACHE_KEY,
      JSON.stringify(nextCache)
    );

    return true;
  } catch {
    // fail-safe: do NOT block lead tracking on storage errors
    return true;
  }
}

export async function trackLead(type: LeadType) {
  if (typeof window === "undefined") return;
  if (!type) return;

  if (!canSendLead(type)) return;

  try {
    const payload = {
      type,
      time: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer || null,
      device: navigator.userAgent,
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify(payload),
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error("[LEAD ERROR]", res.status);
    }
  } catch (error) {
    console.error("[LEAD FAILED]", error);
  }
}
