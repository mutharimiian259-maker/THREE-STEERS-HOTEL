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

function joinUrl(base: string, path: string): string {
  if (!path) return base;

  const cleanBase = base.replace(/\/+$/, "");
  const cleanPath = path.trim().replace(/^\/+/, "");

  return `${cleanBase}/${cleanPath}`;
}

function getIntentKeywords(intent?: SeoIntent): string[] {
  switch (intent) {
    case "room":
      return [
        // high intent first
        "book hotel room Meru Kenya",
        "hotel booking WhatsApp Meru",
        "hotel rooms in Meru",
        "luxury accommodation Kenya",
        "affordable hotel rooms Meru",
      ];

    case "conference":
      return [
        "conference venues Meru",
        "meeting rooms Kenya hotel",
        "corporate events Meru",
        "book conference hotel Kenya",
      ];

    case "dining":
      return [
        "restaurants in Meru hotel",
        "fine dining Meru Kenya",
        "hotel food Meru",
      ];

    case "blog":
      return [
        "travel Meru Kenya",
        "hotels near Mt Kenya",
        "Meru tourism guide",
      ];

    default:
      return HOTEL.seo?.keywords ?? [];
  }
}

function dedupe(arr: string[]): string[] {
  return Array.from(new Set(arr.filter(Boolean)));
}

function validateImage(image?: string): string {
  const fallback = "/images/hotel/og/default.jpg";

  if (!image) return fallback;

  const trimmed = image.trim();

  if (!trimmed.startsWith("/") && !trimmed.startsWith("http")) {
    return fallback;
  }

  return trimmed;
}

export function generateSEO({
  title,
  description,
  path = "",
  image,
  intent = "home",
  keywords,
}: SeoProps = {}) {
  const fullTitle = title
    ? `${title} | ${HOTEL.identity.name}`
    : HOTEL.seo.defaultTitle;

  const fullDescription =
    description ?? HOTEL.seo.defaultDescription;

  const baseUrl = HOTEL.domain.primary;
  const url = joinUrl(baseUrl, path);

  const safeImage = validateImage(image);

  const absoluteImage = safeImage.startsWith("http")
    ? safeImage
    : joinUrl(baseUrl, safeImage);

  // prioritize intent keywords first
  const finalKeywords = dedupe([
    ...getIntentKeywords(intent),
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
