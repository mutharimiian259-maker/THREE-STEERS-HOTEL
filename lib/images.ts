/* =============================================================
   DOMAIN: IMAGE RESOLUTION
   -------------------------------------------------------------
   Responsibilities:
   - Resolve semantic image keys → asset paths
   - Provide safe fallback handling
   - Prevent UI from depending on IMAGES structure

   Rules:
   - No UI logic
   - No mutation
   - No business logic
   ============================================================= */

import { IMAGES } from "@/lib/images";

/* =============================================================
   DEFAULT FALLBACK
   ============================================================= */

const DEFAULT_IMAGE =
  "/images/hotel/exterior-hero.jpg";

/* =============================================================
   STRICT IMAGE KEY TYPE
   (prevents silent typos in components/data layer)
   ============================================================= */

export type ImageKey =
  | "batianWing.deluxeTwin"
  | "batianWing.executiveSuite"
  | "batianWing.honeymoon"
  | "lenanaWing.standardSingle"
  | "lenanaWing.standardDouble"
  | "lenanaWing.familyRoom";

/* =============================================================
   IMMUTABLE IMAGE MAP
   ============================================================= */

const IMAGE_KEY_MAP: Record<
  ImageKey,
  string
> = Object.freeze({
  "batianWing.deluxeTwin":
    IMAGES.rooms.batianWing.deluxeTwin,

  "batianWing.executiveSuite":
    IMAGES.rooms.batianWing.executiveSuite,

  "batianWing.honeymoon":
    IMAGES.rooms.batianWing.honeymoon,

  "lenanaWing.standardSingle":
    IMAGES.rooms.lenanaWing.standardSingle,

  "lenanaWing.standardDouble":
    IMAGES.rooms.lenanaWing.standardDouble,

  "lenanaWing.familyRoom":
    IMAGES.rooms.lenanaWing.familyRoom,
});

/* =============================================================
   TYPE GUARD
   ============================================================= */

function isValidImageKey(
  key: string
): key is ImageKey {
  return key in IMAGE_KEY_MAP;
}

/* =============================================================
   DOMAIN RESOLVER
   ============================================================= */

export function getImage(
  imageKey?: string
): string {
  if (!imageKey) {
    return DEFAULT_IMAGE;
  }

  if (!isValidImageKey(imageKey)) {
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.warn(
        "[images] Unknown image key:",
        imageKey
      );
    }

    return DEFAULT_IMAGE;
  }

  return IMAGE_KEY_MAP[imageKey];
}
