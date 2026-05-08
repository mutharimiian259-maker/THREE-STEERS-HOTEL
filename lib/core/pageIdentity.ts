// lib/core/pageIdentity.ts

import type { Route } from "@/lib/routes";
import type { SeoIntent } from "@/lib/seoTypes";
import type { FunnelStage } from "@/lib/core/types";

/* =============================================================
   SINGLE PAGE TRUTH MODEL
   ============================================================= */

export type PageIdentity = Readonly<{
  path: string;
  normalizedPath: string;

  route: Route | null;

  seoIntent: SeoIntent | null;
  funnelStage: FunnelStage | null;

  keywords: string[];

  isNavigation: boolean;
}>;
