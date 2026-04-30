export async function trackLead(source: string) {
  // ✅ Prevent SSR crashes
  if (typeof window === "undefined") return;

  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source,
        time: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    });

    // ✅ Handle failed responses
    if (!res.ok) {
      console.error("[LEAD ERROR]", res.status);
      return;
    }

    const data = await res.json();

    // ✅ Optional debug log (remove in production if needed)
    console.log("[LEAD TRACKED]", data);

  } catch (error) {
    console.error("[LEAD FAILED]", error);
  }
}
