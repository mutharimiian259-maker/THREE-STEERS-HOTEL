/* =============================================================
   ANALYTICS BOOTSTRAP — Adapter Registration Layer
   -------------------------------------------------------------
   Responsibilities:
   - Initialize analytics system once
   - Register all event adapters
   - Prevent duplicate initialization
   - Ensure safe runtime behavior

   Rules:
   - Adapters must implement EventAdapter contract
   - No class instantiation (pure objects only)
   ============================================================= */

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
   INITIALIZATION LOCK
   ============================================================= */

let initialized = false;

/* =============================================================
   ADAPTER VALIDATION
   ============================================================= */

function assertAdapter(
  adapter: EventAdapter
): void {
  if (!adapter?.name) {
    throw new Error(
      "[analytics] Invalid adapter: missing name"
    );
  }

  if (typeof adapter.handle !== "function") {
    throw new Error(
      `[analytics] Invalid adapter: ${adapter.name} missing handle()`
    );
  }
}

/* =============================================================
   BOOTSTRAP
   ============================================================= */

export function initAnalytics(): void {
  if (initialized) return;
  initialized = true;

  if (process.env.NODE_ENV === "development") {
    setRouterDebug(true);
  }

  resetAdapters();

  // Fixed deterministic order
  const adapters: EventAdapter[] = [
    GAAdapter,
    LocalStorageAdapter,
    FunnelAdapter,
    LeadAdapter,
  ];

  for (const adapter of adapters) {
    assertAdapter(adapter);
    registerAdapter(adapter);
  }

  if (process.env.NODE_ENV === "development") {
    console.log(
      "[analytics] initialized adapters:",
      getAdapters()
    );
  }
}

/* =============================================================
   SAFE RESET (DEV ONLY)
   ============================================================= */

export function resetAnalytics(): void {
  if (
    process.env.NODE_ENV !==
    "development"
  ) {
    console.warn(
      "[analytics] resetAnalytics blocked in production"
    );
    return;
  }

  initialized = false;
  resetAdapters();
}
