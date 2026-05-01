export async function POST(req: Request) {
  try {
    if (req.method !== "POST") {
      return Response.json(
        { success: false, error: "Method not allowed" },
        { status: 405 }
      );
    }

    const body = await req.json();

    const name = String(body?.name || "").trim().slice(0, 100);
    const phone = String(body?.phone || "").trim().slice(0, 20);
    const message = String(body?.message || "").trim().slice(0, 1000);

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
      source: "three-steers-hotel-website",
      status: "new",
      createdAt: new Date().toISOString(),
    };

    if (process.env.NODE_ENV !== "production") {
      console.log("NEW LEAD CAPTURED:", lead);
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
    console.error("LEAD API ERROR:", error);

    return Response.json(
      {
        success: false,
        error: "Server error processing lead",
      },
      { status: 500 }
    );
  }
}
