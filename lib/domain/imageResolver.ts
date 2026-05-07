const DEFAULT_IMAGE =
  "/images/hotel/exterior-hero.jpg";

/* ---------------------------------------
   IMAGE PATH RESOLUTION
--------------------------------------- */

export function resolveImagePath(
  path?: string,
  fallback: string = DEFAULT_IMAGE
): string {
  if (!path) return fallback;

  const cleaned = path.trim();

  if (!cleaned) return fallback;

  /* -------------------------------------
     EXTERNAL URL
  ------------------------------------- */

  if (
    cleaned.startsWith("http://") ||
    cleaned.startsWith("https://")
  ) {
    try {
      const url = new URL(cleaned);

      if (
        url.protocol === "http:" ||
        url.protocol === "https:"
      ) {
        return cleaned;
      }

      return fallback;
    } catch {
      return fallback;
    }
  }

  /* -------------------------------------
     INTERNAL ASSET
  ------------------------------------- */

  if (cleaned.startsWith("/")) {
    return cleaned.replace(/\/+/g, "/");
  }

  /* -------------------------------------
     DEV DEBUGGING
  ------------------------------------- */

  if (process.env.NODE_ENV === "development") {
    console.warn("[IMAGE INVALID]", cleaned);
  }

  return fallback;
}
