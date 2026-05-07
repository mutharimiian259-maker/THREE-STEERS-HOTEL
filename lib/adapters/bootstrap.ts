import { registerAdapter } from "./router";

import { GAAdapter } from "@/lib/adapters/gaAdapter";
import { LocalStorageAdapter } from "@/lib/adapters/localStorageAdapter";
import { FunnelAdapter } from "@/lib/adapters/funnelAdapter";
import { LeadAdapter } from "@/lib/adapters/leadAdapter";

export function initAnalytics() {
  registerAdapter(GAAdapter);
  registerAdapter(LocalStorageAdapter);
  registerAdapter(FunnelAdapter);
  registerAdapter(LeadAdapter);
}
