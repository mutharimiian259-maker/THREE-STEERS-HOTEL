export async function POST(req: Request) {
  try {
    const body = await req.json();

    const lead = {
      id: crypto.randomUUID(),
      type: String(body?.type || "unknown"),
      source: String(body?.source || "website"),
      payload: body?.payload || {},
      createdAt: new Date().toISOString(),
    };

    if (process.env.NODE_ENV !== "production") {
      console.log("[LEAD EVENT]", lead);
    }

    // FUTURE ONLY STORAGE LAYER
    // await supabase.from("events").insert(lead);

    return Response.json({ success: true, lead }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
