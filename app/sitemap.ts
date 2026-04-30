import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://threesteershotel.com",
      lastModified: new Date(),
    },
    {
      url: "https://threesteershotel.com/rooms",
      lastModified: new Date(),
    },
    {
      url: "https://threesteershotel.com/contact",
      lastModified: new Date(),
    },
  ];
}
