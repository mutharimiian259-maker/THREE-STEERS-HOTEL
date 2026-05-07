import { registerAdapter, resetAdapters } from "@/lib/core/router";

import { GAAdapter } from "@/lib/adapters/gaAdapter";
import { LocalStorageAdapter } from "@/lib/adapters/localStorageAdapter";
import { FunnelAdapter } from "@/lib/adapters/funnelAdapter";
import { LeadAdapter } from "@/lib/adapters/leadAdapter";

let initialized = false;

export function initAnalytics() {
  if (initialized) return;
  initialized = true;

  resetAdapters();

  registerAdapter(new GAAdapter());
  registerAdapter(new LocalStorageAdapter());
  registerAdapter(new FunnelAdapter());
  registerAdapter(new LeadAdapter());
}
