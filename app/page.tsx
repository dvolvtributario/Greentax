import type { Metadata } from "next";
import Link from "next/link";
import { Botao } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, TituloSecao } from "@/components/ui/section";
import { Pendente } from "@/components/ui/pendente";
import { CtaFinal } from "@/components/sections/cta-final";
import { ProvaSocial } from "@/components/sections/prova-social";
import { CartaoArtigo } from "@/components/sections/cartao-artigo";
import { listarArtigos } from "@/lib/blog";
import {
  IconeCrescimento,
  IconeSeta,
  IconeCheck,
} from "@/components/ui/icons";
import { diferenciais, solucoesResumo } from "@/lib/conteudo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.nome} — Contabilidade consultiva em Araçatuba/SP`,
  description: site.descricao,
  alternates: { canonical: "/" },
};

export default async function Home() {
  // Três artigos mais recentes para a chamada do blog na Home.
  const destaques = (await listarArtigos()).slice(0, 3);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-surface pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_32rem_at_85%_-10%,var(--color-brand-50),transparent)]"
        />
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-800">
                <IconeCrescimento className="size-4 text-brand-500" />
                Contabilidade consultiva
              </p>

              <h1 className="mt-6 text-4xl leading-[1.08] font-bold sm:text-5xl lg:text-6xl">
                Contabilidade que acompanha a{" "}
                <span className="text-brand-800">evolução</span> da sua empresa.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500 sm:text-xl">
                {site.promessa}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Botao href="/contato" tamanho="lg">
                  Solicitar proposta
                  <IconeSeta className="size-5" />
                </Botao>
                <Botao href="/solucoes" variante="secundario" tamanho="lg">
                  Conhecer as soluções
                </Botao>
              </div>
            </div>

            {/* Painel de apoio — estética "tech-consultiva" */}
            <div className="lg:col-span-5">
              <div className="rounded-card border border-ink-200 bg-surface p-7 shadow-card sm:p-8">
                <p className="text-sm font-semibold tracking-[0.14em] text-brand-600 uppercase">
                  O que muda na prática
                </p>
                <ul className="mt-6 space-y-5">
                  {[
                    "Obrigações contábeis, fiscais e trabalhistas entregues no prazo.",
                    "Apuração de tributos com análise para pagar o que é justo.",
                    "Acompanhamento consultivo, não apenas execução de tarefas.",
                    "Planejamento tributário e recuperação de créditos quando faz sentido.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50">
                        <IconeCheck className="size-4 text-brand-700" />
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-ink-700">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- BLOCO INSTITUCIONAL ---------- */}
      <Section fundo="claro">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <TituloSecao
              sobretitulo="Quem é a Greentax"
              titulo="Mais do que cumprir obrigações — parceria estratégica."
            />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink-500 lg:col-span-7">
            <p>
              A Greentax é uma empresa de contabilidade consultiva que vai além do
              cumprimento das obrigações fiscais e contábeis. Atuamos como parceiros
              estratégicos de empresas que buscam crescer com organização, segurança
              e inteligência na tomada de decisões.
            </p>
            <p>
              Unimos excelência técnica, tecnologia e atendimento próximo para
              transformar informações contábeis e tributárias em direcionamentos que
              fortalecem a gestão da sua empresa.
            </p>
            <Botao href="/quem-somos" variante="fantasma">
              Conheça nossa história
              <IconeSeta className="size-4" />
            </Botao>
          </div>
        </div>
      </Section>

      {/* ---------- SOLUÇÕES ---------- */}
      <Section>
        <TituloSecao
          sobretitulo="Soluções"
          titulo="Soluções para cada fase do seu negócio"
          descricao="Do que é obrigação ao que é estratégia — com a mesma consistência técnica."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solucoesResumo.map((solucao) => (
            <Link
              key={solucao.slug}
              href={solucao.href}
              className="group flex flex-col rounded-card border border-ink-200 bg-surface p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover"
            >
              <h3 className="text-lg font-semibold text-ink-900">
                {solucao.titulo}
              </h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-500">
                {solucao.resumo}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-800">
                Ver detalhes
                <IconeSeta className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ---------- DIFERENCIAIS ---------- */}
      <Section fundo="claro">
        <TituloSecao
          sobretitulo="Diferenciais"
          titulo="Por que empresas escolhem a Greentax"
        />

        <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {diferenciais.map((item, i) => (
            <div key={item.titulo}>
              <span className="text-sm font-bold text-brand-500 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-ink-900">
                {item.titulo}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">
                {item.descricao}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- PROVA SOCIAL ---------- */}
      <ProvaSocial />

      {/* ---------- NICHOS (resumo) ---------- */}
      <Section>
        <TituloSecao
          sobretitulo="Nichos de atendimento"
          titulo="Especialistas no seu tipo de negócio"
          descricao="Entendemos que cada setor tem suas próprias particularidades fiscais e de gestão — por isso desenvolvemos conhecimento aprofundado nos segmentos que mais atendemos."
        />
        <Pendente
          titulo="Segmentos prioritários ainda não definidos"
          className="mt-10"
        >
          O briefing (item 11) pede validar de 3 a 6 nichos com base na carteira
          atual antes da redação. Assim que estiverem definidos, eles entram aqui
          como cards e ganham a página completa em{" "}
          <code className="font-mono">/nichos</code>.
        </Pendente>
      </Section>

      {/* ---------- BLOG ---------- */}
      <Section fundo="claro">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <TituloSecao
            sobretitulo="Central de conteúdo"
            titulo="Conteúdo para quem decide"
            descricao="Tributário, gestão e tecnologia explicados de forma simples, direto para o seu negócio."
          />
          <Botao href="/blog" variante="secundario" className="shrink-0">
            Ver todos os artigos
          </Botao>
        </div>

        {destaques.length > 0 ? (
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destaques.map((artigo) => (
              <li key={artigo.slug}>
                <CartaoArtigo artigo={artigo} />
              </li>
            ))}
          </ul>
        ) : null}
      </Section>

      {/* ---------- CTA FINAL ---------- */}
      <CtaFinal />
    </>
  );
}
