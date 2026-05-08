/* =============================================================
   SEO UTILITIES — PURE, SAFE, DETERMINISTIC HELPERS

   Responsibilities:
   - URL resolution
   - image validation
   - fallback safety for SEO assets

   Rules:
   - No DOM usage
   - No business logic
   - No config mutation
   - No side effects except dev logging
   ============================================================= */

const DEFAULT_OG_IMAGE =
  "/images/hotel/og/default.jpg";

/* =============================================================
   URL RESOLVER
   ============================================================= */

export function resolveUrl(
  base: string,
  path: string
): string {
  if (!base) return "";

  const safePath = path?.trim() || "/";

  try {
    return new URL(
      safePath,
      base
    ).toString();
  } catch (err) {
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.warn(
        "[seoUtils] resolveUrl failed",
        {
          base,
          path,
          err,
        }
      );
    }

    return base;
  }
}

/* =============================================================
   IMAGE VALIDATION (SEO SAFE FALLBACK SYSTEM)
   ============================================================= */

export function validateImage(
  image?: string | null
): string {
  if (!image) return DEFAULT_OG_IMAGE;

  const trimmed = image.trim();

  if (!trimmed) return DEFAULT_OG_IMAGE;

  const isHttp =
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://");

  const isRelative =
    trimmed.startsWith("/");

  if (isHttp || isRelative) {
    return trimmed;
  }

  if (
    process.env.NODE_ENV ===
    "development"
  ) {
    console.warn(
      "[seoUtils] invalid image path",
      {
        image,
      }
    );
  }

  return DEFAULT_OG_IMAGE;
}

/* =============================================================
   OG IMAGE BUILDER (CONSISTENCY LAYER)
   ============================================================= */

export function buildOgImage(
  image?: string | null
): string {
  const valid = validateImage(image);

  // Future-proof hook: allows CDN prefixing later
  return valid;
}

/* =============================================================
   SEO TITLE NORMALIZER (SAFE UTILITY)
   ============================================================= */

export function normalizeTitle(
  title: string,
  siteName?: string
): string {
  const cleanTitle =
    title?.trim() || "";

  const cleanSite =
    siteName?.trim() || "";

  if (!cleanTitle) return cleanSite;

  if (!cleanSite) return cleanTitle;

  return `${cleanTitle} | ${cleanSite}`;
}
