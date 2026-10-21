import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { listarArtigos } from "@/lib/blog";
import { metadadosPagina } from "@/lib/seo";
import { FiltroArtigos, ListaArtigos } from "./FiltroArtigos";

export const metadata = metadadosPagina({
  titulo: "Blog de Contabilidade, Tributos e Gestão",
  descricao:
    "Tributário, gestão e tecnologia explicados de forma simples, para você tomar decisões melhores para o seu negócio.",
  rota: "/blog",
});

export default async function Blog() {
  const artigos = await listarArtigos();

  return (
    <>
      <PageHero
        rotulo="Central de conteúdo"
        titulo="Conteúdo para quem decide"
        lead="Tributário, gestão e tecnologia, explicados de forma simples, para você tomar decisões melhores para o seu negócio."
      />

      <Section>
        <Suspense fallback={<ListaArtigos artigos={artigos} filtro={null} />}>
          <FiltroArtigos artigos={artigos} />
        </Suspense>
      </Section>
    </>
  );
}
