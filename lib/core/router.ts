import type { StoredEvent } from "./types";

/* =============================================================
   CORE ROUTER (EVENT FAN-OUT SYSTEM)
   ============================================================= */

export type EventAdapter = Readonly<{
  name: string;
  handle(event: StoredEvent): void | Promise<void>;
}>;

export type DispatchResult = Readonly<{
  success: boolean;
  adapter: string;
  duration_ms: number;
  error?: unknown;
}>;

/* =============================================================
   ROUTER STATE
   ============================================================= */

const adapters = new Map<string, EventAdapter>();

let DEBUG = false;

/* =============================================================
   DEBUG CONTROL
   ============================================================= */

export function setRouterDebug(value: boolean): void {
  DEBUG = value;
}

/* =============================================================
   LOGGER
   ============================================================= */

function debugLog(message: string, payload?: unknown): void {
  if (!DEBUG) return;
  console.log(`[ROUTER] ${message}`, payload ?? "");
}

/* =============================================================
   ERROR NORMALIZER
   ============================================================= */

function normalizeError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    message: String(error),
  };
}

/* =============================================================
   TIMEOUT WRAPPER
   ============================================================= */

async function withTimeout<T>(
  promise: Promise<T>,
  timeout_ms = 3000
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Adapter timeout ${timeout_ms}ms`)), timeout_ms)
    ),
  ]);
}

/* =============================================================
   REGISTER ADAPTER
   ============================================================= */

export function registerAdapter(adapter: EventAdapter): void {
  if (!adapter?.name || typeof adapter.handle !== "function") {
    throw new Error("[ROUTER] Invalid adapter contract");
  }

  if (adapters.has(adapter.name)) {
    if (process.env.NODE_ENV === "development") {
      throw new Error(`[ROUTER] duplicate adapter: ${adapter.name}`);
    }
    return;
  }

  adapters.set(adapter.name, Object.freeze(adapter));

  debugLog("adapter registered", adapter.name);
}

/* =============================================================
   DISPATCH (CORE EVENT FAN-OUT)
   ============================================================= */

export async function dispatch(
  event: StoredEvent
): Promise<readonly DispatchResult[]> {
  if (!event) {
    throw new Error("[ROUTER] dispatch requires event");
  }

  const results: DispatchResult[] = [];

  debugLog("dispatch start", event);

  for (const adapter of adapters.values()) {
    const start = Date.now();

    try {
      await withTimeout(Promise.resolve(adapter.handle(event)));

      results.push({
        success: true,
        adapter: adapter.name,
        duration_ms: Date.now() - start,
      });
    } catch (error) {
      results.push({
        success: false,
        adapter: adapter.name,
        duration_ms: Date.now() - start,
        error: normalizeError(error),
      });

      debugLog("adapter failed", {
        adapter: adapter.name,
        error,
      });
    }
  }

  debugLog("dispatch complete", results);

  return Object.freeze(results);
}

/* =============================================================
   ROUTER INTROSPECTION (SAFE)
   ============================================================= */

export function getRegisteredAdapters(): string[] {
  return [...adapters.keys()];
}
