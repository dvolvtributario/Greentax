import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CartaoArtigo } from "@/components/sections/CartaoArtigo";
import { CabecalhoSecao, Section } from "@/components/ui/Section";
import { Pendente } from "@/components/ui/Pendente";
import { CATEGORIAS, listarArtigos } from "@/lib/blog";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tributário, gestão e tecnologia explicados de forma simples, para você tomar decisões melhores para o seu negócio.",
  alternates: { canonical: "/blog" },
};

export default async function Blog({ searchParams }: PageProps<"/blog">) {
  const { categoria } = await searchParams;
  const filtro = typeof categoria === "string" ? categoria : undefined;

  const todos = await listarArtigos();
  const artigos = filtro ? todos.filter((a) => a.categoria === filtro) : todos;

  return (
    <>
      <PageHero
        rotulo="Central de conteúdo"
        titulo="Conteúdo para quem decide"
        lead="Tributário, gestão e tecnologia, explicados de forma simples, para você tomar decisões melhores para o seu negócio."
      />

      <Section>
        <nav aria-label="Filtrar por categoria" className={estilos.filtros}>
          <Link
            href="/blog"
            className={`${estilos.filtro} ${!filtro ? estilos.ativo : ""}`}
            aria-current={!filtro ? "true" : undefined}
          >
            Todos
          </Link>
          {CATEGORIAS.map((cat) => (
            <Link
              key={cat}
              href={`/blog?categoria=${encodeURIComponent(cat)}`}
              className={`${estilos.filtro} ${filtro === cat ? estilos.ativo : ""}`}
              aria-current={filtro === cat ? "true" : undefined}
            >
              {cat}
            </Link>
          ))}
        </nav>

        {artigos.length > 0 ? (
          <div className={estilos.grade}>
            {artigos.map((artigo) => (
              <CartaoArtigo key={artigo.slug} artigo={artigo} />
            ))}
          </div>
        ) : (
          <p className={estilos.vazio}>Nenhum artigo nesta categoria ainda.</p>
        )}
      </Section>

      <Section fundo="papel2">
        <div className={estilos.materiais}>
          <CabecalhoSecao
            rotulo="Materiais"
            titulo="Materiais para baixar"
            lead="Planilhas, tabelas e vídeos para simplificar a gestão da sua empresa."
          />
          <Pendente titulo="Materiais ricos e captura de e-mail">
            <p>
              O briefing prevê planilhas, tabelas e vídeo institucional para download
              mediante cadastro de e-mail. Faltam duas coisas para montar:
            </p>
            <ul>
              <li>Os arquivos em si (planilhas, tabelas, vídeo)</li>
              <li>
                Onde os e-mails capturados devem cair — mesma decisão de CRM pendente
                no formulário de contato
              </li>
            </ul>
            <p>
              Importante para a LGPD: a captura precisa de consentimento explícito e
              link para a Política de Privacidade no próprio formulário.
            </p>
          </Pendente>
        </div>
      </Section>
    </>
  );
}
