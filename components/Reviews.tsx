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

function joinUrl(base: string, path: string = ""): string {
  const cleanBase = base.replace(/\/$/, "");
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return `${cleanBase}${cleanPath}`;
}

function getIntentKeywords(intent?: SeoIntent): string[] {
  switch (intent) {
    case "room":
      return [
        "hotel rooms in Meru",
        "luxury accommodation Kenya",
        "book hotel room Meru",
      ];

    case "conference":
      return [
        "conference venues Meru",
        "meeting rooms Kenya hotel",
        "corporate events Meru",
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
      return HOTEL.seo.keywords;
  }
}

function dedupe(arr: string[]) {
  return Array.from(new Set(arr.filter(Boolean)));
}

function validateImage(image?: string): string {
  if (typeof image !== "string" || image.trim().length === 0) {
    return "/images/hotel/og/default.jpg";
  }
  return image;
}

export function generateSEO({
  title,
  description,
  path = "",
  image,
  intent = "home",
  keywords = [],
}: SeoProps = {}) {
  const fullTitle = title
    ? `${title} | ${HOTEL.identity.name}`
    : HOTEL.seo.defaultTitle;

  const fullDescription =
    description || HOTEL.seo.defaultDescription;

  const baseUrl = HOTEL.domain.primary;
  const url = joinUrl(baseUrl, path);

  const safeImage = validateImage(image);

  const absoluteImage = safeImage.startsWith("http")
    ? safeImage
    : joinUrl(baseUrl, safeImage);

  const finalKeywords = dedupe([
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
