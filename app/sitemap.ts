import type { MetadataRoute } from "next";
import { listarSlugs } from "@/lib/blog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  const paginas: { rota: string; prioridade: number; frequencia: "weekly" | "monthly" | "yearly" }[] = [
    { rota: "", prioridade: 1, frequencia: "weekly" },
    { rota: "/quem-somos", prioridade: 0.8, frequencia: "monthly" },
    { rota: "/solucoes", prioridade: 0.9, frequencia: "monthly" },
    { rota: "/solucoes/contabil-fiscal-trabalhista", prioridade: 0.9, frequencia: "monthly" },
    { rota: "/solucoes/consultoria-estrategica", prioridade: 0.9, frequencia: "monthly" },
    { rota: "/diferenciais", prioridade: 0.7, frequencia: "monthly" },
    { rota: "/nichos", prioridade: 0.7, frequencia: "monthly" },
    { rota: "/blog", prioridade: 0.8, frequencia: "weekly" },
    { rota: "/contato", prioridade: 0.9, frequencia: "monthly" },
    { rota: "/politica-de-privacidade", prioridade: 0.3, frequencia: "yearly" },
  ];

  const estaticas: MetadataRoute.Sitemap = paginas.map((pagina) => ({
    url: `${site.url}${pagina.rota}`,
    lastModified: agora,
    changeFrequency: pagina.frequencia,
    priority: pagina.prioridade,
  }));

  const artigos: MetadataRoute.Sitemap = listarSlugs().map((slug) => ({
    url: `${site.url}/blog/${slug}`,
    lastModified: agora,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...estaticas, ...artigos];
}
