import { NextResponse } from "next/server";
import type { EventType, EventPayload } from "@/lib/core/types";

function isValidType(type: string): type is EventType {
  return [
    "page_view",
    "room_view",
    "whatsapp_click",
    "call_click",
    "booking_intent",
    "navigation",
    "system_error",
    "blog_view",
  ].includes(type as EventType);
}

/* =============================================================
   PAYLOAD SANITIZER (CORE ALIGNED)
   ============================================================= */

function sanitizePayload(payload: any): EventPayload {
  if (!payload || typeof payload !== "object") return {};

  return {
    source: payload.source ?? "unknown",
    room: payload.room,
    value: payload.value,
    url: payload.url,
    ts: payload.ts ?? Date.now(),
    sessionId: payload.sessionId,
    userId: payload.userId,
  };
}

/* =============================================================
   EVENT INGESTION (CORE-ALIGNED CONTRACT)
   ============================================================= */

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const type = String(body?.type);

    if (!isValidType(type)) {
      return NextResponse.json(
        { success: false, error: "INVALID_EVENT_TYPE" },
        { status: 400 }
      );
    }

    const payload = sanitizePayload(body?.payload);

    /* =========================================================
       CORE-COMPATIBLE EVENT SHAPE
       ========================================================= */

    const event = {
      id: crypto.randomUUID(),
      type: type as EventType,
      source: String(body?.source || "website"),
      payload,
      timestamp: Date.now(),
    };

    /* =========================================================
       OBSERVABILITY
       ========================================================= */

    if (process.env.NODE_ENV !== "production") {
      console.log("[EVENT INGEST]", event);
    }

    return NextResponse.json(
      {
        success: true,
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "INVALID_REQUEST",
      },
      { status: 500 }
    );
  }
}
