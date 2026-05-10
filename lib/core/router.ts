import type { StoredEvent } from "./types";

/* =============================================================
   ADAPTER CONTRACT (MISSING LAYER FIX)
   ============================================================= */

export type AdapterEvent = Readonly<StoredEvent>;

export type EventAdapter = Readonly<{
  name: string;
  handle(event: AdapterEvent): void | Promise<void>;
}>;

/* =============================================================
   DISPATCH RESULT
   ============================================================= */

export type DispatchResult = Readonly<{
  accepted: boolean;
  adapter: string;
  duration_ms: number;
  error?: unknown;
}>;

/* =============================================================
   ROUTER STATE
   ============================================================= */

type RouterState =
  | "uninitialized"
  | "ready"
  | "frozen";

const adapters = new Map<string, EventAdapter>();

let routerState: RouterState = "uninitialized";

let routerDebug =
  process.env.NODE_ENV === "development";

/* =============================================================
   DEBUG
   ============================================================= */

export function setRouterDebug(enabled: boolean): void {
  routerDebug = enabled;
}

function debugLog(
  message: string,
  payload?: unknown
): void {
  if (!routerDebug) return;

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
   REGISTER ADAPTER
   ============================================================= */

export function registerAdapter(
  adapter: EventAdapter
): void {
  if (routerState === "frozen") {
    throw new Error(
      "[ROUTER] Cannot register adapter after freeze"
    );
  }

  if (
    !adapter?.name ||
    typeof adapter.handle !== "function"
  ) {
    throw new Error(
      "[ROUTER] Invalid adapter contract"
    );
  }

  if (adapters.has(adapter.name)) {
    throw new Error(
      `[ROUTER] Duplicate adapter: ${adapter.name}`
    );
  }

  adapters.set(adapter.name, adapter);

  routerState = "ready";

  debugLog("adapter registered", adapter.name);
}

/* =============================================================
   FREEZE ROUTER
   ============================================================= */

export function freezeRouter(): void {
  if (routerState === "uninitialized") {
    throw new Error(
      "[ROUTER] Cannot freeze empty router"
    );
  }

  routerState = "frozen";

  debugLog("router frozen");
}

/* =============================================================
   DISPATCH
   ============================================================= */

export async function dispatch(
  event: StoredEvent
): Promise<readonly DispatchResult[]> {
  if (!event) {
    throw new Error(
      "[ROUTER] dispatch requires event"
    );
  }

  if (
    routerState !== "ready" &&
    routerState !== "frozen"
  ) {
    throw new Error(
      "[ROUTER] Router not initialized"
    );
  }

  if (adapters.size === 0) {
    throw new Error(
      "[ROUTER] No registered adapters"
    );
  }

  debugLog("dispatch start", event);

  const results: DispatchResult[] = [];

  for (const adapter of adapters.values()) {
    const start = Date.now();

    try {
      await adapter.handle(event);

      results.push({
        accepted: true,
        adapter: adapter.name,
        duration_ms: Date.now() - start,
      });
    } catch (error) {
      const normalized = normalizeError(error);

      results.push({
        accepted: false,
        adapter: adapter.name,
        duration_ms: Date.now() - start,
        error: normalized,
      });

      debugLog("adapter failed", {
        adapter: adapter.name,
        error: normalized,
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
  return [...adapters.keys()];
}

export function getRouterState(): RouterState {
  return routerState;
}
