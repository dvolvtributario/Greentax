import type { MetadataRoute } from "next";
import { listarArtigos } from "@/lib/blog";
import { site } from "@/lib/site";

// Obrigatório no export estático (output: 'export'): route handlers precisam
// declarar força estática.
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Páginas fixas: sem lastModified — não dá para afirmar data de alteração real
  // (marcar a data do build mentiria para o Google).
  const estaticas: MetadataRoute.Sitemap = paginas.map((pagina) => ({
    url: `${site.url}${pagina.rota}`,
    changeFrequency: pagina.frequencia,
    priority: pagina.prioridade,
  }));

  const artigos: MetadataRoute.Sitemap = (await listarArtigos()).map((artigo) => ({
    url: `${site.url}/blog/${artigo.slug}`,
    lastModified: new Date(artigo.data),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...estaticas, ...artigos];
}
