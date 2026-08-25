import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CtaFinal } from "@/components/sections/cta-final";
import { Section } from "@/components/ui/section";
import { IconeCheck, IconeCrescimento } from "@/components/ui/icons";
import { servicosConsultoria } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Consultoria Estratégica",
  description:
    "Planejamento tributário, recuperação de créditos, transação tributária, PER/DCOMP, serviços societários e suporte em fiscalizações — sob demanda e sob medida.",
  alternates: { canonical: "/solucoes/consultoria-estrategica" },
};

/** Serviços de maior valor percebido — destacados conforme o briefing. */
const destaques = [
  "Planejamento tributário",
  "Recuperação de créditos tributários",
  "Transação tributária",
  "Defesa administrativa",
];

export default function ConsultoriaEstrategica() {
  return (
    <>
      <PageHero
        sobretitulo="Sob demanda"
        titulo="Quando sua empresa precisa de mais do que rotina."
        descricao="Nascemos como consultoria tributária e é essa expertise que colocamos à disposição das empresas que querem ir além da contabilidade recorrente: planejar, reduzir riscos e recuperar valores que fazem diferença no caixa."
      />

      {/* Destaques */}
      <Section fundo="claro">
        <div className="flex flex-wrap gap-3">
          {destaques.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-surface px-5 py-2.5 text-sm font-semibold text-brand-800"
            >
              <IconeCrescimento className="size-4 text-brand-500" />
              {item}
            </span>
          ))}
        </div>
      </Section>

      {/* Grade de serviços */}
      <Section>
        <div className="space-y-12">
          {servicosConsultoria.map((bloco) => (
            <div key={bloco.titulo} className="grid gap-6 lg:grid-cols-12 lg:gap-12">
              <h2 className="text-xl font-bold text-ink-900 lg:col-span-4">
                {bloco.titulo}
              </h2>
              <ul className="grid gap-x-8 gap-y-4 lg:col-span-8 sm:grid-cols-2">
                {bloco.itens.map((item) => (
                  <li key={item} className="flex gap-3">
                    <IconeCheck className="mt-0.5 size-5 shrink-0 text-brand-500" />
                    <span className="text-[0.9375rem] leading-relaxed text-ink-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-card border border-brand-200 bg-brand-50 p-7">
          <p className="leading-relaxed text-brand-950">
            Esses serviços são prestados sob demanda, mediante autorização prévia —
            porque cada estratégia é desenhada para a realidade específica da sua
            empresa, não é um pacote padrão.
          </p>
        </div>
      </Section>

      <CtaFinal
        titulo="Quando sua empresa precisa de mais do que rotina, a Greentax já está lá."
        descricao="Comece por um diagnóstico: entendemos seu cenário e apontamos onde há oportunidade real."
        rotulo="Agendar diagnóstico"
      />
    </>
  );
}
