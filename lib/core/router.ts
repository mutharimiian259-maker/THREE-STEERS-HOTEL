import type { StoredEvent } from "./types";

/* ─────────────────────────────────────────
   ADAPTER CONTRACT
───────────────────────────────────────── */

export type EventAdapter = {
  name: string;
  handle(event: StoredEvent): void | Promise<void>;
};

/* ─────────────────────────────────────────
   REGISTRY
───────────────────────────────────────── */

const adapters: EventAdapter[] = [];

/* ─────────────────────────────────────────
   DEBUG MODE
───────────────────────────────────────── */

let DEBUG = false;

export function setRouterDebug(value: boolean) {
  DEBUG = value;
}

/* ─────────────────────────────────────────
   REGISTER ADAPTER
───────────────────────────────────────── */

export function registerAdapter(adapter: EventAdapter): void {
  const exists = adapters.some((a) => a.name === adapter.name);
  if (exists) return;

  adapters.push(adapter);

  if (DEBUG) {
    console.log(`[ROUTER] Adapter registered: ${adapter.name}`);
  }
}

/* ─────────────────────────────────────────
   RESET (DEV ONLY)
───────────────────────────────────────── */

export function resetAdapters(): void {
  adapters.length = 0;
}

/* ─────────────────────────────────────────
   DISPATCH RESULT CONTRACT
───────────────────────────────────────── */

export type DispatchResult = {
  success: boolean;
  adapter: string;
  error?: unknown;
};

/* ─────────────────────────────────────────
   DISPATCH (CONTROLLED FANOUT PIPELINE)
───────────────────────────────────────── */

export async function dispatch(
  event: StoredEvent
): Promise<DispatchResult[]> {
  if (!event) return [];

  if (adapters.length === 0) {
    console.warn("[ROUTER] No adapters registered — event dropped", event);
    return [];
  }

  const results: DispatchResult[] = [];

  for (const adapter of adapters) {
    if (DEBUG) {
      console.log("[ROUTER DISPATCH]", adapter.name, event.type);
    }

    try {
      await Promise.resolve(adapter.handle(event));

      results.push({
        success: true,
        adapter: adapter.name,
      });
    } catch (err) {
      console.error(`[ROUTER ERROR] ${adapter.name}`, err);

      results.push({
        success: false,
        adapter: adapter.name,
        error: err,
      });
    }
  }

  return results;
}

/* ─────────────────────────────────────────
   INTROSPECTION
───────────────────────────────────────── */

export function getAdapters(): string[] {
  return adapters.map((a) => a.name);
}
