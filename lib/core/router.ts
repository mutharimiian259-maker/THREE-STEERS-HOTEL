import type { StoredEvent } from "./types";

/* ---------------------------------------
   ADAPTER CONTRACT
--------------------------------------- */

export type EventAdapter = {
  name: string;
  handle(event: StoredEvent): void | Promise<void>;
};

/* ---------------------------------------
   INTERNAL REGISTRY
--------------------------------------- */

const adapters: EventAdapter[] = [];

/* ---------------------------------------
   DEBUG MODE
--------------------------------------- */

let DEBUG = false;

export function setRouterDebug(value: boolean) {
  DEBUG = value;
}

/* ---------------------------------------
   REGISTER ADAPTER
--------------------------------------- */

export function registerAdapter(adapter: EventAdapter): void {
  const exists = adapters.some((a) => a.name === adapter.name);
  if (exists) return;

  adapters.push(adapter);
}

/* ---------------------------------------
   RESET (DEV + TEST SAFETY)
--------------------------------------- */

export function resetAdapters(): void {
  adapters.length = 0;
}

/* ---------------------------------------
   DISPATCH EVENT
--------------------------------------- */

export function dispatch(event: StoredEvent): void {
  if (!event) return;

  if (adapters.length === 0) {
    console.warn("[ROUTER] No adapters registered — event dropped", event);
    return;
  }

  for (const adapter of adapters) {
    if (DEBUG) {
      console.log("[ROUTER DISPATCH]", adapter.name, event.type);
    }

    try {
      adapter.handle(event);
    } catch (err) {
      console.error(`[ROUTER ERROR] ${adapter.name}`, err);
    }
  }
}

/* ---------------------------------------
   DEBUG INTROSPECTION
--------------------------------------- */

export function getAdapters(): string[] {
  return adapters.map((a) => a.name);
}
