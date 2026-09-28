import type { MetadataRoute } from "next";
import { company } from "@/lib/company";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/pricing", "/guides", "/privacy", "/terms"];
  return routes.map((route) => ({
    url: `${company.siteUrl}${route}`,
    changeFrequency: route === "" || route === "/pricing" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/pricing" ? 0.9 : 0.6,
  }));
}
