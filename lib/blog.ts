import fs from "node:fs";
import path from "node:path";

// Tipos, categorias e helpers de data são isomórficos (usados no cliente,
// ex.: filtro do blog) e vivem em lib/blog-tipos.ts; este módulo só existe
// no servidor (fs).
export {
  CATEGORIAS,
  formatarData,
  type Artigo,
  type ArtigoComSlug,
  type Categoria,
} from "./blog-tipos";

import type { Artigo } from "./blog-tipos";

const DIRETORIO = path.join(process.cwd(), "content", "blog");

export function listarSlugs(): string[] {
  if (!fs.existsSync(DIRETORIO)) return [];
  return fs
    .readdirSync(DIRETORIO)
    // Arquivos iniciados com "_" são templates internos (ex.: _modelo.mdx),
    // não artigos publicados. O prefixo "_" também impede o slug de passar
    // na validação da rota/painel. Eles são necessários: sem nenhum .mdx na
    // pasta, o import dinâmico de carregarArtigo falha no build.
    .filter((arquivo) => arquivo.endsWith(".mdx") && !arquivo.startsWith("_"))
    .map((arquivo) => arquivo.replace(/\.mdx$/, ""));
}

export async function carregarArtigo(slug: string) {
  const mod = await import(`@/content/blog/${slug}.mdx`);
  return {
    Conteudo: mod.default as React.ComponentType,
    artigo: mod.artigo as Artigo,
  };
}

export async function listarArtigos() {
  const artigos = await Promise.all(
    listarSlugs().map(async (slug) => {
      const { artigo } = await carregarArtigo(slug);
      return { ...artigo, slug };
    }),
  );

  return artigos.sort((a, b) => b.data.localeCompare(a.data));
}
