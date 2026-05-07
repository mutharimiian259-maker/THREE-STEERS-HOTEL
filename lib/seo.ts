import { HOTEL } from "@/lib/config";
import { getSeoKeywordsByIntent, getSeoKeywordsByPath } from "@/lib/domain/seoStrategy";
import { resolveUrl, validateImage } from "@/lib/utils/seoUtils";

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

function clamp(text: string, max: number): string {
  return text.length > max ? text.slice(0, max - 1).trim() + "…" : text;
}

function dedupe(list: string[]): string[] {
  return Array.from(new Set(list.map((k) => k.trim().toLowerCase()).filter(Boolean)));
}

function getBaseUrl(): string {
  try {
    return new URL(HOTEL.domain.primary).origin;
  } catch {
    return "https://example.com";
  }
}

export function generateSEO({
  title,
  description,
  path = "/",
  image,
  intent = "home",
  keywords,
}: SeoProps = {}) {
  const baseUrl = getBaseUrl();
  const siteName = HOTEL.identity.name;

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
    ...getSeoKeywordsByIntent(intent),
    ...getSeoKeywordsByPath(path),
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
