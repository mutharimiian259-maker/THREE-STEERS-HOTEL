"use client";

/* ---------------------------------------
   TYPES (CORE TRUTH ONLY)
--------------------------------------- */

export type EventType =
  | "page_view"
  | "room_view"
  | "whatsapp_click"
  | "call_click"
  | "booking_intent";

export type EventSource =
  | "navbar"
  | "footer"
  | "room_card"
  | "sticky_cta"
  | "exit_intent"
  | "page"
  | "unknown";

export type EventPayload = Record<string, unknown>;

export type StoredEvent = {
  id: string;
  type: EventType;
  payload: EventPayload;
  time: string;
  ts: number;
  url: string;
  origin: EventSource;
  session_id: string;
};

/* ---------------------------------------
   CONFIG
--------------------------------------- */

const STORAGE_KEY = "hotel_events";
const SESSION_KEY = "hotel_session_id";

const MAX_EVENTS = 200;
const DEDUP_WINDOW_MS = 3000;

/* ---------------------------------------
   SESSION CORE
--------------------------------------- */

function getSessionId(): string {
  if (typeof window === "undefined") return "server";

  let id = localStorage.getItem(SESSION_KEY);

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }

  return id;
}

/* ---------------------------------------
   STORAGE CORE
--------------------------------------- */

const storage = {
  get(): string | null {
    return localStorage.getItem(STORAGE_KEY);
  },

  set(value: string) {
    localStorage.setItem(STORAGE_KEY, value);
  },
};

/* ---------------------------------------
   MEMORY CACHE
--------------------------------------- */

let cache: StoredEvent[] | null = null;

/* ---------------------------------------
   HELPERS
--------------------------------------- */

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/* 🔥 FIX: deep stable stringify (handles nested objects) */
function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }

  const obj = value as Record<string, unknown>;

  const sortedKeys = Object
