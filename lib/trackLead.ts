const LEAD_CACHE_KEY = "lead_last_sent";

function canSendLead(source: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    const last = localStorage.getItem(LEAD_CACHE_KEY);
    const now = Date.now();

    if (last) {
      const parsed = JSON.parse(last);
      if (parsed.source === source && now - parsed.time < 15000) {
        return false;
      }
    }

    localStorage.setItem(
      LEAD_CACHE_KEY,
      JSON.stringify({ source, time: now })
    );

    return true;
  } catch {
    return true;
  }
}

export async function trackLead(source: string) {
  if (typeof window === "undefined") return;

  if (!source || typeof source !== "string") return;

  if (!canSendLead(source)) return;

  try {
    const payload = {
      source: source.trim(),
      time: new Date().toISOString(),
      url: window.location.href,
    };

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("[LEAD ERROR]", res.status);
      return;
    }

  } catch (error) {
    console.error("[LEAD FAILED]", error);
  }
}
