import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}/${l}`]));
  return locales.map((l) => ({
    url: `${siteConfig.url}/${l}`,
    lastModified: new Date(),
    alternates: { languages },
  }));
}
