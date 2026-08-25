import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { CtaFinal } from "@/components/sections/cta-final";
import { IconeSeta } from "@/components/ui/icons";
import { carregarArtigo, formatarData, listarSlugs } from "@/lib/blog";
import { site } from "@/lib/site";

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
    return {
      title: artigo.titulo,
      description: artigo.resumo,
      alternates: { canonical: `/blog/${slug}` },
      openGraph: {
        type: "article",
        title: artigo.titulo,
        description: artigo.resumo,
        publishedTime: artigo.data,
      },
    };
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
    publisher: { "@type": "Organization", name: site.nome },
    mainEntityOfPage: `${site.url}/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dadosEstruturados).replace(/</g, "\\u003c"),
        }}
      />

      <article className="py-14 sm:py-20">
        <Container size="narrow">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-800"
          >
            <IconeSeta className="size-4 rotate-180" />
            Voltar para o blog
          </Link>

          <header className="mt-8 border-b border-ink-200 pb-8">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
                {artigo.categoria}
              </span>
              <time dateTime={artigo.data} className="text-ink-500">
                {formatarData(artigo.data)}
              </time>
              {artigo.autor ? (
                <span className="text-ink-500">· {artigo.autor}</span>
              ) : null}
            </div>

            <h1 className="mt-5 text-3xl leading-[1.15] font-bold sm:text-4xl">
              {artigo.titulo}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-500">
              {artigo.resumo}
            </p>
          </header>

          <div className="prose prose-greentax mt-10 max-w-none">
            <Conteudo />
          </div>
        </Container>
      </article>

      <CtaFinal
        titulo="Ficou com dúvida sobre como isso afeta a sua empresa?"
        descricao="O primeiro contato é consultivo e sem compromisso."
        rotulo="Falar com um especialista"
      />
    </>
  );
}
