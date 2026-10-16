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
  imagem?: {
    src: string;
    alt: string;
  };
};

export type ArtigoComSlug = Artigo & { slug: string };

export function formatarData(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
