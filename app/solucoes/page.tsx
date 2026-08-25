import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { CtaFinal } from "@/components/sections/cta-final";
import { Section } from "@/components/ui/section";
import { IconeCalculadora, IconeCrescimento, IconeSeta } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Serviço contábil, fiscal e trabalhista recorrente e consultoria estratégica sob demanda — planejamento tributário, recuperação de créditos e serviços societários.",
  alternates: { canonical: "/solucoes" },
};

const frentes = [
  {
    href: "/solucoes/contabil-fiscal-trabalhista",
    icone: IconeCalculadora,
    etiqueta: "Serviço recorrente",
    titulo: "Contábil, Fiscal e Trabalhista",
    resumo:
      "O básico bem-feito, com visão estratégica. Toda a rotina contábil, fiscal e trabalhista da sua empresa com precisão técnica e comunicação próxima.",
    itens: [
      "Escrituração contábil, balancetes e balanço patrimonial",
      "Apuração de tributos e entrega de obrigações acessórias",
      "Folha de pagamento, eSocial e EFD-Reinf",
    ],
    cta: "Ver o que está incluso",
  },
  {
    href: "/solucoes/consultoria-estrategica",
    icone: IconeCrescimento,
    etiqueta: "Sob demanda",
    titulo: "Consultoria Estratégica",
    resumo:
      "Quando sua empresa precisa de mais do que rotina. Nascemos como consultoria tributária e é essa expertise que colocamos à disposição de quem quer ir além da contabilidade recorrente.",
    itens: [
      "Planejamento e estratégias tributárias sob medida",
      "Levantamento e recuperação de créditos tributários",
      "Serviços societários e suporte em fiscalizações",
    ],
    cta: "Ver serviços avulsos",
  },
];

export default function Solucoes() {
  return (
    <>
      <PageHero
        sobretitulo="Soluções"
        titulo="Soluções para cada fase do seu negócio"
        descricao="Duas frentes complementares: a rotina que mantém sua empresa em dia e a estratégia que faz diferença no caixa."
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {frentes.map((frente) => {
            const Icone = frente.icone;
            return (
              <Link
                key={frente.href}
                href={frente.href}
                className="group flex flex-col rounded-card border border-ink-200 bg-surface p-8 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover sm:p-10"
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-50">
                    <Icone className="size-6 text-brand-700" />
                  </span>
                  <span className="rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold tracking-wide text-ink-500 uppercase">
                    {frente.etiqueta}
                  </span>
                </div>

                <h2 className="mt-6 text-2xl font-bold text-ink-900">
                  {frente.titulo}
                </h2>
                <p className="mt-3 leading-relaxed text-ink-500">
                  {frente.resumo}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5 border-t border-ink-100 pt-6">
                  {frente.itens.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-700"
                    >
                      <span
                        aria-hidden
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <span className="mt-7 inline-flex items-center gap-1.5 font-semibold text-brand-800">
                  {frente.cta}
                  <IconeSeta className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>

        <p className="mt-10 rounded-card border border-ink-200 bg-surface-2 p-6 text-[0.9375rem] leading-relaxed text-ink-500">
          <strong className="font-semibold text-ink-900">
            Atendimento a pessoa física.
          </strong>{" "}
          Também cuidamos de serviços pontuais como a Declaração de Imposto de Renda
          para sócios e clientes das empresas atendidas — descrito na página de{" "}
          <Link
            href="/solucoes/consultoria-estrategica"
            className="font-semibold text-brand-800 underline underline-offset-4"
          >
            Consultoria Estratégica
          </Link>
          .
        </p>
      </Section>

      <CtaFinal
        titulo="Não sabe qual frente faz mais sentido para a sua empresa?"
        descricao="O primeiro contato é consultivo e sem compromisso. A gente entende seu momento e indica o caminho."
        rotulo="Falar com um especialista"
      />
    </>
  );
}
