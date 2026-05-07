import type { SeoIntent } from "@/lib/seoTypes";

/* ---------------------------------------
   SEO KEYWORD REGISTRY
--------------------------------------- */

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

/* ---------------------------------------
   PATH-BASED SEO REGISTRY
--------------------------------------- */

const SEO_PATH_KEYWORDS: Record<string, string[]> = {
  "/rooms": [
    "all hotel rooms",
    "hotel booking page",
  ],
};

/* ---------------------------------------
   INTENT SEO
--------------------------------------- */

export function getSeoKeywordsByIntent(
  intent: SeoIntent
): string[] {
  return SEO_KEYWORDS[intent] ?? [];
}

/* ---------------------------------------
   PATH SEO
--------------------------------------- */

export function getSeoKeywordsByPath(
  path?: string
): string[] {
  if (!path) return [];

  if (path.startsWith("/rooms/")) {
    return [
      "hotel room details",
      "book hotel room Kenya",
    ];
  }

  return SEO_PATH_KEYWORDS[path] ?? [];
}

/* ---------------------------------------
   DEDUP SAFE MERGER
--------------------------------------- */

export function mergeSeoKeywords(
  ...groups: string[][]
): string[] {
  return [...new Set(groups.flat())];
}
