import type { SeoIntent } from "@/lib/seoTypes";

/* =============================================================
   SEO KEYWORD REGISTRY
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
   PATH KEYWORDS (NORMALIZED SUPPORT)
   ============================================================= */

const SEO_PATH_KEYWORDS: Record<string, string[]> = {
  "/rooms": ["all hotel rooms", "hotel booking page"],
};

/* =============================================================
   PATH NORMALIZATION (SEO SAFE MATCHING)
   ============================================================= */

function normalizePath(path: string): string {
  return path
    .split("?")[0] // remove query params
    .replace(/\/+$/, "") // remove trailing slash
    .toLowerCase();
}

/* =============================================================
   INTENT KEYWORDS
   ============================================================= */

export function getSeoKeywordsByIntent(
  intent: SeoIntent
): string[] {
  return SEO_KEYWORDS[intent] ?? [];
}

/* =============================================================
   PATH KEYWORDS (IMPROVED MATCHING)
   ============================================================= */

export function getSeoKeywordsByPath(
  path?: string
): string[] {
  if (!path) return [];

  const normalized = normalizePath(path);

  // dynamic route pattern handling
  if (normalized.startsWith("/rooms")) {
    return [
      "hotel room details",
      "book hotel room Kenya",
    ];
  }

  return SEO_PATH_KEYWORDS[normalized] ?? [];
}

/* =============================================================
   DEDUP + MERGE
   ============================================================= */

export function mergeSeoKeywords(
  ...groups: string[][]
): string[] {
  return [...new Set(groups.flat())];
}
