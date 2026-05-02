import { MetadataRoute } from "next";
import { HOTEL } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = HOTEL.domain.primary;

  return {
    rules: [
      {
        userAgent: "*",

        // CORE REVENUE PAGES (fully indexable)
        allow: [
          "/",
          "/rooms",
          "/blog",
        ],

        // SYSTEM + NON-SEO PAGES (block completely)
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/private/",
        ],
      },
    ],

    sitemap: `${baseUrl}/sitemap.xml`,

    // OPTIONAL BUT POWERFUL (crawl optimization hint)
    host: baseUrl,
  };
}
