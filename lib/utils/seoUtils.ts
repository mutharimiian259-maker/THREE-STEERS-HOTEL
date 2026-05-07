const DEFAULT_IMAGE = "/images/hotel/og/default.jpg";

/* ---------------------------------------
   URL RESOLUTION
--------------------------------------- */

export function resolveUrl(base: string, path: string): string {
  try {
    return new URL(path || "/", base).toString();
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[resolveUrl] invalid URL", {
        base,
        path,
        err,
      });
    }

    return base;
  }
}

/* ---------------------------------------
   IMAGE PATH RESOLUTION
--------------------------------------- */

export function resolveImagePath(image?: string): string {
  if (!image) return DEFAULT_IMAGE;

  try {
    // external image
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    // internal asset
    if (image.startsWith("/")) {
      return image;
    }

    return DEFAULT_IMAGE;
  } catch {
    return DEFAULT_IMAGE;
  }
}
