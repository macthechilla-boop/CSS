import type { MetadataRoute } from "next";

const BASE_URL = "https://christianseemann.space";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    "",
    "landing",
    "vita",
    "contact",
    "legal",
    "portfolio/globe-installation",
    "portfolio/morphonic-lab",
    "portfolio/laser-cyanotype",
    "portfolio/new-ecologies",
    "portfolio/sinks",
  ];

  return routes.map((path) => ({
    url: `${BASE_URL}/${path}`.replace(/\/$/, ""),
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
