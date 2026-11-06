import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://auralis.id",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          id: "https://auralis.id",
          en: "https://auralis.id?lang=en",
        },
      },
    },
  ];
}
