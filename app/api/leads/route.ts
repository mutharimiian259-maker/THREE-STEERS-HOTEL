export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body?.name || "").trim();
    const phone = String(body?.phone || "").trim();
    const message = String(body?.message || "").trim();

    if (!name || !phone) {
      return Response.json(
        {
          success: false,
          error: "Name and phone are required",
        },
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

    console.log("NEW LEAD CAPTURED:", lead);

    // FUTURE INTEGRATIONS READY:
    // 1. Supabase insert
    // 2. Email notification (Resend / Nodemailer)
    // 3. WhatsApp admin alert
    // 4. CRM pipeline tagging

    return Response.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error("LEAD API ERROR:", error);

    return Response.json(
      {
        success: false,
        error: "Invalid request payload",
      },
      { status: 500 }
    );
  }
}
