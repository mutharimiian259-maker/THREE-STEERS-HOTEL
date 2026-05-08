const DEFAULT_OG_IMAGE = "/images/hotel/og/default.jpg";

/* =============================================================
   URL RESOLVER (SEO SAFE)
   ============================================================= */

export function resolveUrl(base: string, path: string): string {
  if (!base) return base; // preserve contract instead of breaking SEO

  const safePath = path?.trim() || "/";

  try {
    return new URL(safePath, base).toString();
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[seoUtils] resolveUrl failed", {
        base,
        path,
        err,
      });
    }

    // safer fallback: never return empty or broken value
    return base;
  }
}

/* =============================================================
   IMAGE VALIDATION (SEO SAFE)
   ============================================================= */

export function validateImage(image?: string | null): string {
  if (!image) return DEFAULT_OG_IMAGE;

  const trimmed = image.trim();

  if (!trimmed) return DEFAULT_OG_IMAGE;

  const isValidHttp =
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://");

  const isRelative =
    trimmed.startsWith("/");

  const isProtocolRelative =
    trimmed.startsWith("//");

  if (isValidHttp || isRelative || isProtocolRelative) {
    return trimmed;
  }

  if (process.env.NODE_ENV === "development") {
    console.warn("[seoUtils] invalid image path", {
      image,
    });
  }

  return DEFAULT_OG_IMAGE;
}

/* =============================================================
   OG IMAGE BUILDER
   ============================================================= */

export function buildOgImage(image?: string | null): string {
  return validateImage(image);
}

/* =============================================================
   TITLE NORMALIZER (SEO SAFE)
   ============================================================= */

export function normalizeTitle(
  title: string,
  siteName?: string
): string {
  const cleanTitle = title?.trim() || "";
  const cleanSite = siteName?.trim() || "";

  if (!cleanTitle) return cleanSite || "";

  if (!cleanSite) return cleanTitle;

  return `${cleanTitle} | ${cleanSite}`;
}
