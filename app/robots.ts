import { MetadataRoute } from "next";
import { HOTEL } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = HOTEL.domain.primary;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",

        // optional but improves crawl efficiency for e-commerce/hotel funnels
        disallow: ["/api/", "/admin/"],
      },
    ],

    // Next.js App Router auto-generates sitemap at /sitemap.xml
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
