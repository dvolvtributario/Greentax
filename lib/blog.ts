import fs from "node:fs";
import path from "node:path";

/**
 * Blog em arquivos MDX.
 *
 * Cada artigo é um arquivo em `content/blog/<slug>.mdx` que exporta um objeto
 * `artigo` com os metadados. A listagem é montada lendo a pasta — publicar um
 * novo texto é criar o arquivo, sem registrar nada em lugar nenhum.
 *
 * Se um dia a Greentax quiser publicar por painel, esta camada é o único ponto
 * que muda: troca-se a leitura de disco por chamadas ao CMS e as páginas
 * continuam iguais.
 */

export const CATEGORIAS = [
  "Tributário",
  "Trabalhista",
  "Gestão",
  "Tecnologia",
] as const;

export type Categoria = (typeof CATEGORIAS)[number];

export type Artigo = {
  titulo: string;
  resumo: string;
  categoria: Categoria;
  data: string; 
  autor?: string;
};

export type ArtigoComSlug = Artigo & { slug: string };

const DIRETORIO = path.join(process.cwd(), "content", "blog");

export function listarSlugs(): string[] {
  if (!fs.existsSync(DIRETORIO)) return [];
  return fs
    .readdirSync(DIRETORIO)
    .filter((arquivo) => arquivo.endsWith(".mdx"))
    .map((arquivo) => arquivo.replace(/\.mdx$/, ""));
}

export async function carregarArtigo(slug: string) {
  const mod = await import(`@/content/blog/${slug}.mdx`);
  return {
    Conteudo: mod.default as React.ComponentType,
    artigo: mod.artigo as Artigo,
  };
}

export async function listarArtigos(): Promise<ArtigoComSlug[]> {
  const artigos = await Promise.all(
    listarSlugs().map(async (slug) => {
      const { artigo } = await carregarArtigo(slug);
      return { ...artigo, slug };
    }),
  );

  return artigos.sort((a, b) => b.data.localeCompare(a.data));
}

export function formatarData(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
