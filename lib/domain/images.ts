/* =============================================================
   DOMAIN: IMAGE RESOLUTION
   -------------------------------------------------------------
   Responsibilities:
   - Resolve semantic image keys → asset paths
   - Enforce strict key contract
   - Prevent UI from accessing IMAGES directly

   Rules:
   - No raw IMAGES usage in UI
   - No unsafe string maps
   - No silent failures in dev mode
   ============================================================= */

import { IMAGES } from "@/lib/images";

/* =============================================================
   DEFAULT FALLBACK
   ============================================================= */

const DEFAULT_IMAGE =
  "/images/hotel/exterior-hero.jpg";

/* =============================================================
   STRICT IMAGE KEY CONTRACT
   (compile-time safe domain keys)
   ============================================================= */

export type ImageKey =
  | "batianWing.deluxeTwin"
  | "batianWing.executiveSuite"
  | "batianWing.honeymoon"
  | "lenanaWing.standardSingle"
  | "lenanaWing.standardDouble"
  | "lenanaWing.familyRoom";

/* =============================================================
   IMMUTABLE RESOLUTION MAP
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
   TYPE GUARD (runtime safety layer)
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
        "[images] Invalid image key:",
        imageKey
      );
    }

    return DEFAULT_IMAGE;
  }

  return IMAGE_KEY_MAP[imageKey];
}
