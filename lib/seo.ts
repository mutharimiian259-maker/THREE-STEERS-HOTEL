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

function safeBaseUrl(): string {
  try {
    return new URL(HOTEL.domain.primary).origin;
  } catch {
    return "https://example.com";
  }
}

function joinUrl(base: string, path: string): string {
  try {
    return new URL(path || "/", base).toString().replace(/\/+$/, "");
  } catch {
    return base;
  }
}

/**
 * Intent-based SEO keywords (GLOBAL fallback layer)
 */
function getIntentKeywords(intent?: SeoIntent): string[] {
  switch (intent) {
    case "room":
      return [
        "hotel rooms Meru Kenya",
        "book hotel in Meru via WhatsApp",
        "affordable luxury accommodation Kenya",
      ];

    case "conference":
      return [
        "conference venues Meru Kenya",
        "hotel meeting rooms Kenya",
        "corporate event spaces Meru",
      ];

    case "dining":
      return [
        "hotel restaurant Meru Kenya",
        "fine dining Kenya hotels",
        "restaurant in hotel Meru",
      ];

    case "blog":
      return [
        "travel guide Meru Kenya",
        "Mt Kenya tourism hotels",
        "Kenya hotel experiences",
      ];

    default:
      return HOTEL.seo?.keywords ?? [];
  }
}

/**
 * Page-level keyword enhancer (NEW LAYER)
 */
function getPageBoostKeywords(path?: string): string[] {
  if (!path) return [];

  if (path.includes("/rooms/")) {
    return ["book this hotel room", "hotel room details Meru"];
  }

  if (path === "/rooms") {
    return ["all hotel rooms Meru", "hotel booking Kenya"];
  }

  return [];
}

function dedupeKeywords(arr: string[]): string[] {
  return Array.from(
    new Set(
      arr.map((i) => i.trim().toLowerCase()).filter(Boolean)
    )
  );
}

function validateImage(image?: string): string {
  const fallback = "/images/hotel/og/default.jpg";

  if (!image) return fallback;

  try {
    if (image.startsWith("http")) {
      new URL(image);
      return image;
    }

    if (image.startsWith("/")) return image;

    return fallback;
  } catch {
    return fallback;
  }
}

function clamp(text: string, max: number): string {
  return text.length <= max
    ? text
    : text.slice(0, max - 1).trim() + "…";
}

export function generateSEO({
  title,
  description,
  path = "/",
  image,
  intent = "home",
  keywords,
}: SeoProps = {}) {
  const baseUrl = safeBaseUrl();
  const siteName = HOTEL.identity?.name ?? "Hotel";

  const defaultTitle =
    HOTEL.seo?.defaultTitle ?? siteName;

  const defaultDescription =
    HOTEL.seo?.defaultDescription ??
    "Best hotel experience in Kenya";

  const fullTitle = clamp(
    title ? `${title} | ${siteName}` : defaultTitle,
    60
  );

  const fullDescription = clamp(
    description ?? defaultDescription,
    160
  );

  const url = joinUrl(baseUrl, path);
  const safeImage = validateImage(image);

  const absoluteImage = safeImage.startsWith("http")
    ? safeImage
    : joinUrl(baseUrl, safeImage);

  const finalKeywords = dedupeKeywords([
    ...getIntentKeywords(intent),
    ...getPageBoostKeywords(path), // 🔥 NEW LAYER
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
