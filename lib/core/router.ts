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
   REGISTER ADAPTER
--------------------------------------- */

export function registerAdapter(adapter: EventAdapter): void {
  adapters.push(adapter);
}

/* ---------------------------------------
   DISPATCH EVENT TO ALL ADAPTERS
--------------------------------------- */

export function dispatch(event: StoredEvent): void {
  if (!event) return;

  for (const adapter of adapters) {
    try {
      adapter.handle(event);
    } catch (err) {
      console.error(`[ROUTER ERROR] ${adapter.name}`, err);
    }
  }
}

/* ---------------------------------------
   DEBUG (OPTIONAL)
--------------------------------------- */

export function getAdapters(): string[] {
  return adapters.map((a) => a.name);
}
