import type { Metadata } from "next";
import { site } from "@/lib/site";

// PNG fixo (1200×630) em vez de app/opengraph-image: no export estático o
// arquivo gerado sai sem extensão e o GitHub Pages o serve com tipo errado.
export const imagemCompartilhamento = {
  url: "/marca/compartilhamento.png",
  width: 1200,
  height: 630,
  alt: `${site.nome} — ${site.assinatura} em ${site.endereco.cidade}/${site.endereco.estado}`,
};

// O Next mescla metadata de forma rasa: uma página que define `openGraph`
// substitui o objeto inteiro do layout, e uma que não define herda o da home
// (og:url e og:title errados ao compartilhar). Este helper monta o conjunto
// completo por página, com a imagem padrão da marca, exceto quando a página
// informa a sua (ex.: capa de artigo).
type Pagina = {
  titulo: string;
  descricao: string;
  rota: string;
  imagem?: { src: string; alt: string };
  openGraph?: Metadata["openGraph"];
  robots?: Metadata["robots"];
};

export function metadadosPagina({
  titulo,
  descricao,
  rota,
  imagem,
  openGraph,
  robots,
}: Pagina): Metadata {
  // O template "%s | Greentax" do layout só vale para <title>; no Open Graph
  // o título completo precisa ser montado aqui.
  const tituloCompleto = `${titulo} | ${site.nome}`;
  const imagens = imagem
    ? [{ url: imagem.src, alt: imagem.alt }]
    : [imagemCompartilhamento];

  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: rota },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: site.nome,
      url: rota,
      title: tituloCompleto,
      description: descricao,
      images: imagens,
      ...openGraph,
    } as Metadata["openGraph"],
    twitter: {
      card: "summary_large_image",
      title: tituloCompleto,
      description: descricao,
      images: imagens,
    },
    ...(robots ? { robots } : {}),
  };
}
