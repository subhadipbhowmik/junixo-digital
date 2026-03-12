import { MetadataRoute } from "next"
import fs from "fs"
import path from "path"

const BASE_URL = "https://junixo.com"

type Manifest = Record<string, string>

export default function sitemap(): MetadataRoute.Sitemap {

  const manifestPath = path.join(
    process.cwd(),
    ".next/app-path-routes-manifest.json"
  )

  const manifest: Manifest = JSON.parse(
    fs.readFileSync(manifestPath, "utf8")
  )

  const routes = Object.values(manifest).filter((route) => {
    if (!route) return false

    return (
      !route.startsWith("/api") &&
      !route.startsWith("/admin") &&
      !route.startsWith("/_") &&
      !route.includes("[") &&
      route !== "/favicon.ico" &&
      route !== "/robots.txt"
    )
  })

  const sitemap: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${BASE_URL}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.7,
  }))

  return sitemap
}