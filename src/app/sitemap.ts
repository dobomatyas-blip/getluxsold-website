import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://getluxsold.com";
  const lastModified = new Date();

  return [
    // Homepage - Hungarian (default)
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          hu: baseUrl,
          en: `${baseUrl}/en`,
          de: `${baseUrl}/de`,
        },
      },
    },
    // Homepage - English
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          hu: baseUrl,
          en: `${baseUrl}/en`,
          de: `${baseUrl}/de`,
        },
      },
    },
    // Homepage - German
    {
      url: `${baseUrl}/de`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          hu: baseUrl,
          en: `${baseUrl}/en`,
          de: `${baseUrl}/de`,
        },
      },
    },
    // Property: Bem rakpart 26 - Hungarian (default)
    {
      url: `${baseUrl}/properties/bem-rakpart-26`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          hu: `${baseUrl}/properties/bem-rakpart-26`,
          en: `${baseUrl}/properties/bem-rakpart-26/en`,
          de: `${baseUrl}/properties/bem-rakpart-26/de`,
        },
      },
    },
    // Property: Bem rakpart 26 - English
    {
      url: `${baseUrl}/properties/bem-rakpart-26/en`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          hu: `${baseUrl}/properties/bem-rakpart-26`,
          en: `${baseUrl}/properties/bem-rakpart-26/en`,
          de: `${baseUrl}/properties/bem-rakpart-26/de`,
        },
      },
    },
    // Property: Bem rakpart 26 - German
    {
      url: `${baseUrl}/properties/bem-rakpart-26/de`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          hu: `${baseUrl}/properties/bem-rakpart-26`,
          en: `${baseUrl}/properties/bem-rakpart-26/en`,
          de: `${baseUrl}/properties/bem-rakpart-26/de`,
        },
      },
    },
  ];
}
