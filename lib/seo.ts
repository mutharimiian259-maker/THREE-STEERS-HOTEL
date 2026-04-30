import { HOTEL } from "@/lib/config/hotel";

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function generateSEO({
  title,
  description,
  path = "",
  image = "/images/hotel.jpg",
}: SeoProps = {}) {
  const fullTitle = title
    ? `${title} | ${HOTEL.name}`
    : HOTEL.seo.title;

  const fullDescription = description || HOTEL.seo.description;

  const url = `${HOTEL.domain}${path}`;

  return {
    title: fullTitle,
    description: fullDescription,

    metadataBase: new URL(HOTEL.domain),

    keywords: HOTEL.seo.keywords,

    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: HOTEL.name,
      type: "website",
      locale: "en_KE",
      images: [
        {
          url: image,
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
      images: [image],
    },

    alternates: {
      canonical: url,
    },
  };
}
