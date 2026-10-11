import { MetadataRoute } from "next";

// Bump these when the page content changes.
const LAST_UPDATED = {
  home: new Date("2026-10-11"),
  projects: new Date("2026-10-11"),
  panelmate: new Date("2026-10-11"),
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://khankhail.com",
      lastModified: LAST_UPDATED.home,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://khankhail.com/projects",
      lastModified: LAST_UPDATED.projects,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://khankhail.com/panelmate",
      lastModified: LAST_UPDATED.panelmate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
