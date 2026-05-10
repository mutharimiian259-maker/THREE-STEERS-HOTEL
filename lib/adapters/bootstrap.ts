import {
  registerAdapter,
  setRouterDebug,
  getRegisteredAdapters,
} from "@/lib/core/router";

import type { EventAdapter } from "@/lib/core/router";

import { GAAdapter } from "@/lib/adapters/gaAdapter";
import { LocalStorageAdapter } from "@/lib/adapters/localStorageAdapter";
import { FunnelAdapter } from "@/lib/adapters/funnelAdapter";
import { LeadAdapter } from "@/lib/adapters/leadAdapter";

/* =============================================================
   BOOTSTRAP STATE
   ============================================================= */

let initialized = false;

/* =============================================================
   BOOTSTRAP (ATOMIC + SAFE)
   ============================================================= */

export function initAnalytics(): {
  initialized: boolean;
  adapterCount: number;
} {
  if (initialized) {
    return {
      initialized: true,
      adapterCount: getRegisteredAdapters().length,
    };
  }

  initialized = true;

  if (process.env.NODE_ENV === "development") {
    setRouterDebug(true);
  }

  const adapters: EventAdapter[] = [
    GAAdapter,
    LocalStorageAdapter,
    FunnelAdapter,
    LeadAdapter,
  ];

  let registeredCount = 0;

  for (const adapter of adapters) {
    try {
      if (!adapter?.name || typeof adapter.handle !== "function") {
        throw new Error(
          `[analytics] invalid adapter contract`
        );
      }

      registerAdapter(adapter);
      registeredCount++;
    } catch (error) {
      console.error(
        `[analytics] failed to register adapter: ${adapter?.name}`,
        error
      );
    }
  }

  if (registeredCount === 0) {
    console.warn(
      "[analytics] no adapters successfully registered"
    );
  }

  if (process.env.NODE_ENV === "development") {
    console.log(
      "[analytics] initialized adapters:",
      registeredCount
    );
  }

  return {
    initialized: true,
    adapterCount: registeredCount,
  };
}

/* =============================================================
   RESET (DEV ONLY SAFE)
   ============================================================= */

export function resetAnalytics(): void {
  if (process.env.NODE_ENV !== "development") {
    console.warn(
      "[analytics] resetAnalytics blocked in production"
    );
    return;
  }

  initialized = false;

  // NOTE:
  // Router reset should be handled inside router layer explicitly
}
