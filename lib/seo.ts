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
    const url = new URL(HOTEL.domain.primary);
    return url.origin;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[SEO] Invalid base URL config", err);
    }
    return "https://example.com";
  }
}

function joinUrl(base: string, path: string): string {
  try {
    const url = new URL(path || "/", base);
    return url.toString().replace(/\/+$/, "");
  } catch {
    return base;
  }
}

function getIntentKeywords(intent?: SeoIntent): string[] {
  switch (intent) {
    case "room":
      return [
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

function dedupeKeywords(arr: string[]): string[] {
  return Array.from(
    new Set(arr.map((i) => i.trim().toLowerCase()).filter(Boolean))
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

    if (process.env.NODE_ENV === "development") {
      console.warn("[SEO] Invalid image fallback used:", image);
    }

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
    ...getIntentKeywords(intent), // priority
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
