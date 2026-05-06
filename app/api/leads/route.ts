import { NextResponse } from "next/server";

type EventType =
  | "page_view"
  | "room_view"
  | "whatsapp_click"
  | "call_click"
  | "booking_intent";

type LeadEventPayload = {
  source?: string;
  room?: string;
  value?: number;
  url?: string;
  ts?: number;
  [key: string]: unknown;
};

function isValidType(type: string): type is EventType {
  return [
    "page_view",
    "room_view",
    "whatsapp_click",
    "call_click",
    "booking_intent",
  ].includes(type);
}

/**
 * EVENT INGESTION LAYER
 * (NOT CRM — just structured logging)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const type = String(body?.type);

    if (!isValidType(type)) {
      return NextResponse.json(
        { success: false, error: "Invalid event type" },
        { status: 400 }
      );
    }

    const payload: LeadEventPayload = body?.payload || {};

    const event = {
      id: crypto.randomUUID(),
      type,
      source: String(body?.source || "website"),
      payload,
      createdAt: new Date().toISOString(),
    };

    /**
     * DEV LOGGING ONLY
     */
    if (process.env.NODE_ENV !== "production") {
      console.log("[EVENT INGEST]", event);
    }

    /**
     * FUTURE PERSISTENCE LAYER (REAL STORAGE)
     * This is where Supabase / DB goes
     *
     * await supabase.from("events").insert(event);
     */

    return NextResponse.json(
      { success: true, event },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 500 }
    );
  }
}
