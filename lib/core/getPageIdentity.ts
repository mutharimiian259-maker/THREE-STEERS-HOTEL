// lib/core/getPageIdentity.ts

import { resolveRoute } from "./pageResolver";
import { normalizePath } from "./normalizePath";
import { getSeoKeywordsByPath } from "@/lib/seo/keywords";

import { getFunnelStage } from "@/lib/core/funnelAccessor";
import type { PageIdentity } from "./pageIdentity";
import type { EventType } from "@/lib/core/types";

/* =============================================================
   PAGE IDENTITY DERIVATION LAYER
   (NO BUSINESS LOGIC — ONLY CONTEXT PROJECTION)
   ============================================================= */

export function getPageIdentity(
  path: string,
  lastEventType?: EventType
): PageIdentity {
  const normalizedPath = normalizePath(path);
  const route = resolveRoute(path);

  const seoKeywords = getSeoKeywordsByPath(normalizedPath);

  const funnelStage = getFunnelStage(lastEventType);

  return Object.freeze({
    path,
    normalizedPath,
    route,

    seoIntent: null, // reserved for future derived config only

    funnelStage,

    keywords: seoKeywords,

    isNavigation: route?.type === "navigation",
  });
}
