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

  const siteName = identity?.name ?? "Hotel";

  const resolvedTitle =
    title ? `${title} | ${siteName}` : seo?.title ?? siteName;

  const resolvedDescription =
    description ?? seo?.description ?? "";

  const fullTitle = clamp(resolvedTitle, 60);
  const fullDescription = clamp(resolvedDescription, 160);

  const url = resolveUrl(baseUrl, path);

  const imagePath = getImage(image ?? "default");
  const finalImage = resolveUrl(baseUrl, imagePath);

  const finalKeywords = dedupe([
    ...getSeoKeywordsByIntent(intent),
    ...getSeoKeywordsByPath(path),
    ...(keywords ?? []),
  ]).slice(0, 20);

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
