import { registerAdapter, setRouterDebug } from "@/lib/core/router";

import type { EventAdapter } from "@/lib/core/router";

import { GAAdapter } from "@/lib/adapters/gaAdapter";
import { LocalStorageAdapter } from "@/lib/adapters/localStorageAdapter";
import { FunnelAdapter } from "@/lib/adapters/funnelAdapter";
import { LeadAdapter } from "@/lib/adapters/leadAdapter";

/* =============================================================
   BOOTSTRAP STATE
   ============================================================= */

let initialized = false;
let healthy = true;

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
   BOOTSTRAP (ATOMIC + HEALTH AWARE)
   ============================================================= */

export function initAnalytics(): { healthy: boolean } {
  if (initialized) {
    return { healthy };
  }

  initialized = true;
  healthy = true;

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
      assertAdapter(adapter);
      registerAdapter(adapter);
      registeredCount++;
    } catch (error) {
      healthy = false;

      console.error(
        `[analytics] failed to register adapter: ${adapter.name}`,
        error
      );
    }
  }

  if (registeredCount === 0) {
    healthy = false;
    console.warn("[analytics] no adapters successfully registered");
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[analytics] initialized adapters:", registeredCount);
  }

  return { healthy };
}

/* =============================================================
   RESET (DEV ONLY SAFE)
   ============================================================= */

export function resetAnalytics(): void {
  if (process.env.NODE_ENV !== "development") {
    console.warn("[analytics] resetAnalytics blocked in production");
    return;
  }

  initialized = false;
  healthy = true;

  // NOTE: only safe if router supports reset internally
}
