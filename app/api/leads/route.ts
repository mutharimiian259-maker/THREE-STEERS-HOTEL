export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body?.name || "").trim().slice(0, 100);

    const phone = String(body?.phone || "")
      .replace(/[^\d]/g, "")
      .slice(0, 20);

    const message = String(body?.message || "")
      .trim()
      .slice(0, 1000);

    const type = String(body?.type || "unknown").slice(0, 50);

    const source = String(body?.source || "website").slice(0, 100);

    if (!name || !phone) {
      return Response.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const lead = {
      id: crypto.randomUUID(),
      name,
      phone,
      message,
      type, // important: preserves funnel context
      source, // preserves CTA origin
      status: "new",
      createdAt: new Date().toISOString(),
    };

    // lightweight spam protection hook (safe extension point)
    const key = `${phone}-${type}`;
    const now = Date.now();

    // NOTE: in production this should move to Redis or DB constraint
    if ((globalThis as any).__lead_cache === undefined) {
      (globalThis as any).__lead_cache = new Map();
    }

    const cache = (globalThis as any).__lead_cache as Map<string, number>;

    if (cache.has(key)) {
      const last = cache.get(key)!;
      if (now - last < 10000) {
        return Response.json(
          { success: false, error: "Duplicate lead ignored" },
          { status: 429 }
        );
      }
    }

    cache.set(key, now);

    if (process.env.NODE_ENV !== "production") {
      console.log("[LEAD CAPTURED]", {
        ...lead,
        environment: process.env.NODE_ENV,
      });
    }

    // FUTURE INTEGRATION HOOKS:
    // await supabase.from("leads").insert(lead);
    // await sendEmailNotification(lead);
    // await sendWhatsAppAlert(lead);

    return Response.json(
      {
        success: true,
        lead,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[LEAD API ERROR]", error);

    return Response.json(
      {
        success: false,
        error: "Server error processing lead",
      },
      { status: 500 }
    );
  }
}
