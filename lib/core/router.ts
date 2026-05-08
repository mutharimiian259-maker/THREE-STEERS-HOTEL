import type { StoredEvent } from "./types";

/* =============================================================
   CORE ROUTER
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
let LOCKED = false;

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
   INVARIANT
   ============================================================= */

function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`[ROUTER] ${message}`);
  }
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
      setTimeout(() => {
        reject(new Error(`Adapter timeout after ${timeout_ms}ms`));
      }, timeout_ms)
    ),
  ]);
}

/* =============================================================
   REGISTER ADAPTER
   ============================================================= */

export function registerAdapter(adapter: EventAdapter): void {
  invariant(!LOCKED, `Cannot register adapter "${adapter.name}" after router initialization`);

  invariant(
    adapter &&
      typeof adapter.name === "string" &&
      typeof adapter.handle === "function",
    "Invalid adapter contract"
  );

  if (adapters.has(adapter.name)) {
    if (process.env.NODE_ENV === "development") {
      throw new Error(`[ROUTER] duplicate adapter: ${adapter.name}`);
    }
    return;
  }

  adapters.set(adapter.name, Object.freeze(adapter));

  debugLog(`adapter registered: ${adapter.name}`);
}

/* =============================================================
   INITIALIZE ROUTER
   ============================================================= */

export function initializeRouter(): void {
  LOCKED = true;

  debugLog("router locked", {
    adapters: [...adapters.keys()],
  });
}

/* =============================================================
   RESET ROUTER (DEV ONLY)
   ============================================================= */

export function resetAdapters(): void {
  if (process.env.NODE_ENV === "production") {
    throw new Error("[ROUTER] resetAdapters() forbidden in production");
  }

  adapters.clear();
  LOCKED = false;

  debugLog("router reset");
}

/* =============================================================
   DISPATCH
   ============================================================= */

export async function dispatch(
  event: StoredEvent
): Promise<readonly DispatchResult[]> {
  invariant(LOCKED, "Router must be initialized before dispatch");
  invariant(event, "dispatch requires event");

  if (adapters.size === 0) {
    console.warn("[ROUTER] no adapters registered — event dropped", event);
    return Object.freeze([]);
  }

  const dispatch_id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `dispatch_${Date.now()}_${Math.random()}`;

  debugLog("dispatch start", { dispatch_id, event });

  const results: DispatchResult[] = [];

  for (const adapter of adapters.values()) {
    const start = Date.now();

    try {
      await withTimeout(Promise.resolve(adapter.handle(event)));

      const duration_ms = Date.now() - start;

      results.push({
        success: true,
        adapter: adapter.name,
        duration_ms,
      });
    } catch (error) {
      const duration_ms = Date.now() - start;

      results.push({
        success: false,
        adapter: adapter.name,
        duration_ms,
        error: normalizeError(error),
      });

      debugLog(`adapter failed: ${adapter.name}`, error);
    }
  }

  debugLog("dispatch complete", {
    dispatch_id,
    results,
  });

  return Object.freeze(results);
}
