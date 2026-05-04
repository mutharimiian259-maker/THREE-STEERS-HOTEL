import { MetadataRoute } from "next";
import { HOTEL } from "@/lib/config";

function getBaseUrl(): string {
  try {
    const url = new URL(HOTEL.domain.primary);
    return url.origin.replace(/\/$/, "");
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.warn("[ROBOTS] Invalid domain config");
    }
    return "";
  }
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",

        // Allow all public content (includes dynamic routes)
        allow: ["/"],

        // Block system/private endpoints
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/private/",
        ],
      },
    ],

    sitemap: baseUrl ? `${baseUrl}/sitemap.xml` : undefined,

    // only include host if valid
    ...(baseUrl ? { host: baseUrl } : {}),
  };
}
