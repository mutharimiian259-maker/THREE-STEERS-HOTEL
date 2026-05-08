import {
  registerAdapter,
  resetAdapters,
  setRouterDebug,
  getAdapters,
} from "@/lib/core/router";

import type { EventAdapter } from "@/lib/core/router";

import { GAAdapter } from "@/lib/adapters/gaAdapter";
import { LocalStorageAdapter } from "@/lib/adapters/localStorageAdapter";
import { FunnelAdapter } from "@/lib/adapters/funnelAdapter";
import { LeadAdapter } from "@/lib/adapters/leadAdapter";

/* =============================================================
   INIT STATE (RACE SAFE)
   ============================================================= */

let initPromise: Promise<void> | null = null;

/* =============================================================
   VALIDATION
   ============================================================= */

function assertAdapter(adapter: EventAdapter): void {
  if (!adapter?.name) {
    throw new Error("[analytics] Invalid adapter: missing name");
  }

  if (typeof adapter.handle !== "function") {
    throw new Error(`[analytics] Invalid adapter: ${adapter.name} missing handle()`);
  }
}

/* =============================================================
   BOOTSTRAP
   ============================================================= */

export function initAnalytics(): void {
  if (initPromise) return;

  initPromise = (async () => {
    if (process.env.NODE_ENV === "development") {
      setRouterDebug(true);
    }

    resetAdapters();

    const adapters: EventAdapter[] = [
      GAAdapter,
      LocalStorageAdapter,
      FunnelAdapter,
      LeadAdapter,
    ];

    for (const adapter of adapters) {
      try {
        assertAdapter(adapter);
        registerAdapter(adapter);
      } catch (error) {
        console.error(
          `[analytics] failed to register adapter: ${adapter.name}`,
          error
        );
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[analytics] initialized adapters:", getAdapters());
    }

    if (getAdapters().length === 0) {
      console.warn("[analytics] no adapters registered after init");
    }
  })();
}

/* =============================================================
   RESET (DEV ONLY)
   ============================================================= */

export function resetAnalytics(): void {
  if (process.env.NODE_ENV !== "development") {
    console.warn("[analytics] resetAnalytics blocked in production");
    return;
  }

  initPromise = null;
  resetAdapters();
}
