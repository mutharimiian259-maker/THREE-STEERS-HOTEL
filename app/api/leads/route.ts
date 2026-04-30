export async function POST(req: Request) {
  try {
    const body = await req.json();

    // BASIC VALIDATION
    const { name, phone, message } = body;

    if (!name || !phone) {
      return Response.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // STRUCTURED LEAD OBJECT
    const lead = {
      name: String(name).trim(),
      phone: String(phone).trim(),
      message: message ? String(message).trim() : "",
      source: "three-steers-hotel-website",
      createdAt: new Date().toISOString(),
    };

    // LOG FOR DEVELOPMENT
    console.log("NEW LEAD:", lead);

    // TODO (NEXT STEP):
    // - store in Supabase / Firebase / DB
    // - send WhatsApp notification
    // - email admin

    return Response.json({ success: true, lead });

  } catch (error) {
    console.error("LEAD API ERROR:", error);

    return Response.json(
      { success: false, error: "Invalid request payload" },
      { status: 500 }
    );
  }
}
