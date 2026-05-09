import type { SeoIntent } from "@/lib/seoTypes";
import { normalizePath } from "@/lib/core/normalizePath";

/* =============================================================
   SEO KEYWORD REGISTRY (CONFIG ONLY)
   ============================================================= */

const SEO_KEYWORDS: Record<SeoIntent, string[]> = {
  room: [
    "hotel rooms Meru Kenya",
    "hotel booking Kenya",
    "luxury accommodation Meru",
  ],

  conference: [
    "conference venues Meru",
    "meeting rooms Kenya hotels",
  ],

  dining: [
    "hotel restaurant Meru",
    "fine dining Kenya hotels",
  ],

  blog: [
    "travel Kenya hotels",
    "Mt Kenya tourism",
  ],
};

/* =============================================================
   PATH KEYWORDS (CONFIG ONLY)
   ============================================================= */

const SEO_PATH_KEYWORDS: Record<string, string[]> = {
  "/rooms": ["hotel rooms", "hotel booking"],
};

/* =============================================================
   INTENT KEYWORDS
   ============================================================= */

export function getSeoKeywordsByIntent(intent: SeoIntent): string[] {
  return SEO_KEYWORDS[intent] ?? [];
}

/* =============================================================
   PATH KEYWORDS (CLEAN MATCHING ONLY)
   ============================================================= */

export function getSeoKeywordsByPath(path?: string): string[] {
  if (!path) return [];

  const normalized = normalizePath(path);

  return SEO_PATH_KEYWORDS[normalized] ?? [];
}

/* =============================================================
   MERGE UTILITY (PURE)
   ============================================================= */

export function mergeSeoKeywords(
  ...groups: string[][]
): string[] {
  return Array.from(new Set(groups.flat()));
}
