import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Obrigatório no export estático (output: 'export'): route handlers precisam
// declarar força estática.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
