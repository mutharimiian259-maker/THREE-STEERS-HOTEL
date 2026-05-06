import { HOTEL } from "@/lib/config";

type SeoIntent =
  | "home"
  | "room"
  | "blog"
  | "conference"
  | "dining";

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  intent?: SeoIntent;
  keywords?: string[];
};

/* ---------------------------------------
   CORE URL BASE (SINGLE SOURCE)
--------------------------------------- */

function getBaseUrl(): string {
  try {
    return new URL(HOTEL.domain.primary).origin;
  } catch {
    return "https://example.com";
  }
}

/* ---------------------------------------
   PURE URL JOIN (NO SIDE EFFECTS)
--------------------------------------- */

function resolveUrl(base: string, path: string): string {
  try {
    return new URL(path || "/", base).toString();
  } catch {
    return base;
  }
}

/* ---------------------------------------
   INTENT KEYWORDS (STATIC DOMAIN KNOWLEDGE)
--------------------------------------- */

function intentKeywords(intent?: SeoIntent): string[] {
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
      return HOTEL.seo?.keywords ?? [];
  }
}

/* ---------------------------------------
   PATH ENRICHMENT (STRICT RULES ONLY)
--------------------------------------- */

function pathKeywords(path?: string): string[] {
  if (!path) return [];

  if (path.startsWith("/rooms/")) {
    return ["hotel room details", "book hotel room Kenya"];
  }

  if (path === "/rooms") {
    return ["all hotel rooms", "hotel booking page"];
  }

  return [];
}

/* ---------------------------------------
   KEYWORD DEDUP (PURE FUNCTION)
--------------------------------------- */

function dedupe(list: string[]): string[] {
  return Array.from(
    new Set(list.map((k) => k.trim().toLowerCase()).filter(Boolean))
  );
}

/* ---------------------------------------
   IMAGE VALIDATION (SAFE ONLY)
--------------------------------------- */

function validateImage(image?: string): string {
  const fallback = "/images/hotel/og/default.jpg";

  if (!image) return fallback;

  if (image.startsWith("http")) return image;
  if (image.startsWith("/")) return image;

  return fallback;
}

/* ---------------------------------------
   TEXT LIMITS (SEO CONSTRAINT LAYER)
--------------------------------------- */

function clamp(text: string, max: number): string {
  return text.length > max
    ? text.slice(0, max - 1).trim() + "…"
    : text;
}

/* ---------------------------------------
   MAIN SEO ENGINE (SINGLE OUTPUT CONTRACT)
--------------------------------------- */

export function generateSEO({
  title,
  description,
  path = "/",
  image,
  intent = "home",
  keywords,
}: SeoProps = {}) {
  const baseUrl = getBaseUrl();
  const siteName = HOTEL.identity?.name ?? "Hotel";

  const fullTitle = clamp(
    title ? `${title} | ${siteName}` : HOTEL.seo.defaultTitle,
    60
  );

  const fullDescription = clamp(
    description ?? HOTEL.seo.defaultDescription,
    160
  );

  const url = resolveUrl(baseUrl, path);
  const safeImage = validateImage(image);

  const finalImage = safeImage.startsWith("http")
    ? safeImage
    : resolveUrl(baseUrl, safeImage);

  const finalKeywords = dedupe([
    ...intentKeywords(intent),
    ...pathKeywords(path),
    ...(keywords ?? []),
  ]);

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: finalKeywords,

    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName,
      type: "website",
      locale: "en_KE",
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [finalImage],
    },

    alternates: {
      canonical: url,
    },
  };
}
