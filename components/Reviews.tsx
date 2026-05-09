import { HOTEL } from "@/lib/config";

type SeoIntent = "home" | "room" | "blog" | "conference" | "dining";

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  intent?: SeoIntent;
  keywords?: string[];
};

/* =============================================================
   URL UTIL
   ============================================================= */

function joinUrl(base: string, path: string = ""): string {
  const cleanBase = base.replace(/\/$/, "");
  const cleanPath = path
    ? path.startsWith("/")
      ? path
      : `/${path}`
    : "";

  return `${cleanBase}${cleanPath}`;
}

/* =============================================================
   INTENT KEYWORDS (SEO CONTEXT ONLY)
   ============================================================= */

const INTENT_KEYWORDS: Record<SeoIntent, string[]> = {
  home: [],
  room: [
    "hotel rooms in Meru",
    "luxury accommodation Kenya",
    "book hotel room Meru",
  ],
  conference: [
    "conference venues Meru",
    "meeting rooms Kenya hotel",
    "corporate events Meru",
  ],
  dining: [
    "restaurants in Meru hotel",
    "fine dining Meru Kenya",
    "hotel food Meru",
  ],
  blog: [
    "travel Meru Kenya",
    "hotels near Mt Kenya",
    "Meru tourism guide",
  ],
};

function getIntentKeywords(intent: SeoIntent = "home"): string[] {
  return INTENT_KEYWORDS[intent] ?? [];
}

/* =============================================================
   SAFE HELPERS
   ============================================================= */

function dedupe(arr: string[]) {
  return Array.from(new Set(arr.filter(Boolean)));
}

function validateImage(image?: string): string {
  const fallback = "/images/hotel/og/default.jpg";

  if (!image || typeof image !== "string") return fallback;

  const isValid =
    image.startsWith("/") ||
    image.startsWith("http://") ||
    image.startsWith("https://");

  return isValid ? image : fallback;
}

/* =============================================================
   SEO GENERATOR
   ============================================================= */

export function generateSEO({
  title,
  description,
  path = "",
  image,
  intent = "home",
  keywords = [],
}: SeoProps = {}) {
  const baseUrl = HOTEL.domain.primary.replace(/\/$/, "");

  const url = joinUrl(baseUrl, path);

  const fullTitle = title
    ? `${title} | ${HOTEL.identity.name}`
    : HOTEL.seo.defaultTitle;

  const fullDescription =
    description || HOTEL.seo.defaultDescription;

  const safeImage = validateImage(image);

  const absoluteImage = safeImage.startsWith("http")
    ? safeImage
    : joinUrl(baseUrl, safeImage);

  const finalKeywords = dedupe([
    ...(HOTEL.seo.keywords || []),
    ...getIntentKeywords(intent),
    ...keywords,
  ]);

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: finalKeywords,

    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: HOTEL.identity.name,
      type: "website",
      locale: "en_KE",
      images: [
        {
          url: absoluteImage,
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
      images: [absoluteImage],
    },

    alternates: {
      canonical: url,
    },
  };
}
