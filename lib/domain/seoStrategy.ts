import type { SeoIntent } from "@/lib/seoTypes";

export function getSeoKeywordsByIntent(intent: SeoIntent): string[] {
  switch (intent) {
    case "room":
      return [
        "hotel rooms Meru Kenya",
        "hotel booking Kenya",
        "luxury accommodation Meru",
      ];

    case "conference":
      return [
        "conference venues Meru",
        "meeting rooms Kenya hotels",
      ];

    case "dining":
      return [
        "hotel restaurant Meru",
        "fine dining Kenya hotels",
      ];

    case "blog":
      return [
        "travel Kenya hotels",
        "Mt Kenya tourism",
      ];

    default:
      return [];
  }
}

export function getSeoKeywordsByPath(path?: string): string[] {
  if (!path) return [];

  if (path.startsWith("/rooms/")) {
    return ["hotel room details", "book hotel room Kenya"];
  }

  if (path === "/rooms") {
    return ["all hotel rooms", "hotel booking page"];
  }

  return [];
}
