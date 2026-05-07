import { MetadataRoute } from "next";
import { HOTEL } from "@/lib/config";

function getBaseUrl(): string | null {
  try {
    return new URL(HOTEL.domain.primary).origin.replace(/\/$/, "");
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.warn("[ROBOTS] Invalid domain config");
    }
    return null;
  }
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",

        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/private/",
        ],
      },
    ],

    sitemap: baseUrl
      ? `${baseUrl}/sitemap.xml`
      : undefined,
  };
}
