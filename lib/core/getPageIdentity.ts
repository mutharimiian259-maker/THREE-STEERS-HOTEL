// lib/core/getPageIdentity.ts

import { resolveRoute } from "./pageResolver";
import { normalizePath } from "./normalizePath";
import { getSeoKeywordsByPath } from "@/lib/seo/keywords";
import { FUNNEL_STAGE_MAP } from "@/lib/core/types";

import type { PageIdentity } from "./pageIdentity";
import type { EventType } from "@/lib/core/types";

export function getPageIdentity(
  path: string,
  lastEventType?: EventType
): PageIdentity {
  const normalizedPath = normalizePath(path);
  const route = resolveRoute(path);

  const seoKeywords = getSeoKeywordsByPath(normalizedPath);

  const funnelStage =
    lastEventType ? FUNNEL_STAGE_MAP[lastEventType] ?? null : null;

  return Object.freeze({
    path,
    normalizedPath,
    route,

    seoIntent: null, // can be derived later from route config

    funnelStage,

    keywords: seoKeywords,

    isNavigation: route?.type === "navigation",
  });
}
