import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { CtaFinal } from "@/components/sections/cta-final";
import { Section } from "@/components/ui/section";
import { Pendente } from "@/components/ui/pendente";
import { CartaoArtigo } from "@/components/sections/cartao-artigo";
import { CATEGORIAS, listarArtigos } from "@/lib/blog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tributário, gestão e tecnologia explicados de forma simples — para você tomar decisões melhores para o seu negócio.",
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
        sobretitulo="Central de conteúdo"
        titulo="Conteúdo para quem decide"
        descricao="Tributário, gestão e tecnologia, explicados de forma simples — para você tomar decisões melhores para o seu negócio."
      />

      <Section>
        {/* Filtro por categoria */}
        <nav aria-label="Filtrar por categoria" className="flex flex-wrap gap-2">
          <Link
            href="/blog"
            aria-current={!filtro ? "true" : undefined}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              !filtro
                ? "border-brand-800 bg-brand-800 text-white"
                : "border-ink-200 text-ink-700 hover:border-brand-800 hover:text-brand-800",
            )}
          >
            Todos
          </Link>
          {CATEGORIAS.map((cat) => (
            <Link
              key={cat}
              href={`/blog?categoria=${encodeURIComponent(cat)}`}
              aria-current={filtro === cat ? "true" : undefined}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                filtro === cat
                  ? "border-brand-800 bg-brand-800 text-white"
                  : "border-ink-200 text-ink-700 hover:border-brand-800 hover:text-brand-800",
              )}
            >
              {cat}
            </Link>
          ))}
        </nav>

        {/* Listagem */}
        {artigos.length > 0 ? (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {artigos.map((artigo) => (
              <li key={artigo.slug}>
                <CartaoArtigo artigo={artigo} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 rounded-card border border-ink-200 bg-surface-2 p-8 text-center text-ink-500">
            Nenhum artigo nesta categoria ainda.
          </p>
        )}
      </Section>

      {/* Materiais ricos */}
      <Section fundo="claro">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-bold">Materiais para baixar</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-500">
              Planilhas, tabelas e vídeos para simplificar a gestão da sua empresa.
            </p>
          </div>
          <div className="lg:col-span-7">
            <Pendente titulo="Materiais ricos e captura de e-mail">
              <p>
                O briefing prevê planilhas, tabelas e vídeo institucional para
                download mediante cadastro de e-mail. Faltam duas coisas para
                montar:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Os arquivos em si (planilhas, tabelas, vídeo)</li>
                <li>
                  Onde os e-mails capturados devem cair — mesma decisão de CRM
                  pendente no formulário de contato
                </li>
              </ul>
              <p className="mt-3">
                Importante para a LGPD: a captura precisa de consentimento
                explícito e link para a Política de Privacidade no próprio
                formulário.
              </p>
            </Pendente>
          </div>
        </div>
      </Section>

      <CtaFinal
        titulo="Prefere falar direto com quem entende do seu negócio?"
        rotulo="Solicitar proposta"
      />
    </>
  );
}
