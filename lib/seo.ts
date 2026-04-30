import { config } from "./config";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function generateSEO({
  title,
  description,
  path = "",
  image = "/images/hotel.jpg",
}: SeoProps) {
  const url = `${config.domain}${path}`;

  return {
    title,
    description,

    metadataBase: new URL(config.domain),

    openGraph: {
      title,
      description,
      url,
      siteName: config.siteName,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    alternates: {
      canonical: url,
    },
  };
}
