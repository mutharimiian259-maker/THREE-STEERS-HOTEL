import { MetadataRoute } from "next";
import { HOTEL } from "@/lib/config/hotel";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = HOTEL.domain.primary;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
