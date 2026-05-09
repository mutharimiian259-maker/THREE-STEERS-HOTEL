import type { StoredEvent } from "./types";

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
   ROUTER STATE (BOOTSTRAP IMMUTABLE AFTER INIT)
   ============================================================= */

const adapters = new Map<string, EventAdapter>();
let isFrozen = false;

/* =============================================================
   DEBUG (ENV-BASED ONLY)
   ============================================================= */

function isDebugEnabled(): boolean {
  return process.env.NODE_ENV === "development";
}

function debugLog(message: string, payload?: unknown): void {
  if (!isDebugEnabled()) return;
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
   REGISTER ADAPTER (ONLY BEFORE FREEZE)
   ============================================================= */

export function registerAdapter(adapter: EventAdapter): void {
  if (isFrozen) {
    throw new Error("[ROUTER] Cannot register adapter after freeze");
  }

  if (!adapter?.name || typeof adapter.handle !== "function") {
    throw new Error("[ROUTER] Invalid adapter contract");
  }

  if (adapters.has(adapter.name)) {
    throw new Error(`[ROUTER] duplicate adapter: ${adapter.name}`);
  }

  adapters.set(adapter.name, adapter);

  debugLog("adapter registered", adapter.name);
}

/* =============================================================
   FREEZE REGISTRY (CALLED DURING BOOTSTRAP)
   ============================================================= */

export function freezeRouter(): void {
  isFrozen = true;
}

/* =============================================================
   DISPATCH (SYNCHRONIZED EVENT FAN-OUT)
   ============================================================= */

export async function dispatch(
  event: StoredEvent
): Promise<readonly DispatchResult[]> {
  if (!event) {
    throw new Error("[ROUTER] dispatch requires event");
  }

  debugLog("dispatch start", event);

  const results: DispatchResult[] = [];

  for (const adapter of adapters.values()) {
    const start = Date.now();

    try {
      // IMPORTANT: preserve natural sync/async behavior
      await adapter.handle(event);

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

  return results;
}

/* =============================================================
   INTROSPECTION
   ============================================================= */

export function getRegisteredAdapters(): string[] {
  return Array.from(adapters.keys());
}
