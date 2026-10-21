import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Seta } from "@/components/ui/Icons";
import { carregarArtigo, formatarData, listarSlugs } from "@/lib/blog";
import { metadadosPagina } from "@/lib/seo";
import { site } from "@/lib/site";
import estilos from "./page.module.css";

export function generateStaticParams() {
  return listarSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { artigo } = await carregarArtigo(slug);
    return metadadosPagina({
      titulo: artigo.titulo,
      descricao: artigo.resumo,
      rota: `/blog/${slug}`,
      imagem: artigo.imagem,
      openGraph: {
        type: "article",
        publishedTime: artigo.data,
        authors: [artigo.autor ?? site.nome],
        section: artigo.categoria,
      },
    });
  } catch {
    return { title: "Artigo não encontrado" };
  }
}

export default async function ArtigoPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;

  let dados;
  try {
    dados = await carregarArtigo(slug);
  } catch {
    notFound();
  }

  const { Conteudo, artigo } = dados;

  const dadosEstruturados = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: artigo.titulo,
    description: artigo.resumo,
    datePublished: artigo.data,
    author: { "@type": "Organization", name: artigo.autor ?? site.nome },
    publisher: {
      "@type": "Organization",
      name: site.nome,
      logo: { "@type": "ImageObject", url: `${site.url}/icon.png` },
    },
    mainEntityOfPage: `${site.url}/blog/${slug}/`,
    ...(artigo.imagem ? { image: `${site.url}${artigo.imagem.src}` } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dadosEstruturados).replace(/</g, "\\u003c"),
        }}
      />

      <article className={estilos.artigo}>
        <Container largura="estreito">
          <Link href="/blog" className={estilos.voltar}>
            <Seta />
            Voltar para o blog
          </Link>

          <header className={estilos.cabecalho}>
            <div className={estilos.meta}>
              <span className={estilos.categoria}>{artigo.categoria}</span>
              <span aria-hidden className={estilos.separador} />
              <time dateTime={artigo.data}>{formatarData(artigo.data)}</time>
              {artigo.autor ? (
                <>
                  <span aria-hidden className={estilos.separador} />
                  <span>{artigo.autor}</span>
                </>
              ) : null}
            </div>

            <h1 className={estilos.titulo}>{artigo.titulo}</h1>
            <p className={estilos.resumo}>{artigo.resumo}</p>
          </header>

          <div className={estilos.prosa}>
            <Conteudo />
          </div>
        </Container>
      </article>
    </>
  );
}
