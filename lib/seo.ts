import { HOTEL } from "@/lib/config";

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

function joinUrl(base: string, path: string): string {
  if (!path) return base;
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export function generateSEO({
  title,
  description,
  path = "",
  image = "/images/hotel.jpg",
}: SeoProps = {}) {
  const fullTitle = title
    ? `${title} | ${HOTEL.identity.name}`
    : HOTEL.seo.defaultTitle;

  const fullDescription =
    description || HOTEL.seo.defaultDescription;

  const baseUrl = HOTEL.domain.primary;

  const url = joinUrl(baseUrl, path);

  const safeImage =
    typeof image === "string" && image.length > 0
      ? image
      : "/images/hotel.jpg";

  const absoluteImage = safeImage.startsWith("http")
    ? safeImage
    : joinUrl(baseUrl, safeImage);

  return {
    title: fullTitle,
    description: fullDescription,

    keywords: Array.isArray(HOTEL.seo.keywords)
      ? [...HOTEL.seo.keywords]
      : [],

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
