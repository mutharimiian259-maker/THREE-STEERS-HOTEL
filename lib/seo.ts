import {
  getDomain,
  getIdentity,
  getSEO,
} from "@/lib/domain/hotel";

import {
  getSeoKeywordsByIntent,
  getSeoKeywordsByPath,
} from "@/lib/domain/seoStrategy";

import { resolveUrl } from "@/lib/utils/seoUtils";
import { getImage } from "@/lib/domain/images";

/* =============================================================
   TYPES
   ============================================================= */

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

/* =============================================================
   HELPERS
   ============================================================= */

function clamp(
  text: string,
  max: number
): string {
  return text.length > max
    ? text.slice(0, max - 1).trim() + "…"
    : text;
}

function dedupe(
  list: string[]
): string[] {
  return Array.from(
    new Set(
      list
        .map((k) =>
          k.trim().toLowerCase()
        )
        .filter(Boolean)
    )
  );
}

function getBaseUrl(): string {
  const domain = getDomain();

  if (!domain) {
    throw new Error(
      "[seo] Missing domain configuration"
    );
  }

  return domain;
}

/* =============================================================
   MAIN SEO GENERATOR
   ============================================================= */

export function generateSEO({
  title,
  description,
  path = "/",
  image,
  intent = "home",
  keywords,
}: SeoProps = {}) {
  const baseUrl = getBaseUrl();

  const identity = getIdentity();
  const seo = getSEO();

  const siteName = identity.name;

  const fullTitle = clamp(
    title
      ? `${title} | ${siteName}`
      : seo.title,
    60
  );

  const fullDescription = clamp(
    description ?? seo.description,
    160
  );

  const url = resolveUrl(baseUrl, path);

  /* ---------------------------------------------------------
     IMAGE PIPELINE — unified via domain layer
     --------------------------------------------------------- */
  const imagePath = image
    ? getImage(image)
    : getImage(undefined);

  const finalImage = resolveUrl(
    baseUrl,
    imagePath
  );

  /* ---------------------------------------------------------
     KEYWORDS PIPELINE
     --------------------------------------------------------- */
  const finalKeywords = dedupe([
    ...getSeoKeywordsByIntent(intent),
    ...getSeoKeywordsByPath(path),
    ...(keywords ?? []),
  ]).slice(0, 20); // safety cap

  /* ---------------------------------------------------------
     OUTPUT
     --------------------------------------------------------- */

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
