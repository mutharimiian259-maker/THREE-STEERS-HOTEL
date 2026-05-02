const LEAD_CACHE_KEY = "lead_last_sent";

// improved classification types
type LeadType =
  | "room_view"
  | "whatsapp_click"
  | "call_click"
  | "booking_intent"
  | "conference_intent"
  | "blog_click"
  | "navigation";

function canSendLead(type: LeadType): boolean {
  if (typeof window === "undefined") return false;

  try {
    const last = localStorage.getItem(LEAD_CACHE_KEY);
    const now = Date.now();

    if (last) {
      const parsed = JSON.parse(last);

      // stronger deduplication: type + time window
      if (
        parsed?.type === type &&
        now - parsed?.time < 10000 // 10s window
      ) {
        return false;
      }
    }

    localStorage.setItem(
      LEAD_CACHE_KEY,
      JSON.stringify({ type, time: now })
    );

    return true;
  } catch {
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

      // NEW: revenue context (VERY IMPORTANT)
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
