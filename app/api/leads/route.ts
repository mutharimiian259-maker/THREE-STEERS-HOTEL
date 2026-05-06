import { NextResponse } from "next/server";

type EventType =
  | "page_view"
  | "room_view"
  | "whatsapp_click"
  | "call_click"
  | "booking_intent";

type EventPayload = {
  source?: string;
  room?: string;
  value?: number;
  url?: string;
  ts?: number;
  session_id?: string;
  user_id?: string;
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
 * SAFE PAYLOAD SANITIZER
 */
function sanitizePayload(payload: any): EventPayload {
  if (!payload || typeof payload !== "object") return {};

  return {
    source: payload.source ?? "unknown",
    room: payload.room ?? null,
    value: payload.value ?? null,
    url: payload.url ?? null,
    ts: payload.ts ?? Date.now(),
    session_id: payload.session_id ?? null,
    user_id: payload.user_id ?? null,
  };
}

/**
 * EVENT INGESTION LAYER (NOT CRM)
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

    const payload = sanitizePayload(body?.payload);

    /**
     * EVENT OBJECT (IMMUTABLE RECORD)
     */
    const event = {
      id: crypto.randomUUID(),
      type,
      source: String(body?.source || "website"),
      payload,
      createdAt: new Date().toISOString(),
    };

    /**
     * DEV OBSERVABILITY ONLY
     */
    if (process.env.NODE_ENV !== "production") {
      console.log("[EVENT INGEST]", event);
    }

    /**
     * FUTURE: IDEMPOTENT STORAGE LAYER
     *
     * IMPORTANT:
     * Add unique constraint on:
     * - id OR (session_id + type + ts bucket)
     *
     * await supabase.from("events").insert(event);
     */

    return NextResponse.json(
      { success: true, event },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 500 }
    );
  }
}
