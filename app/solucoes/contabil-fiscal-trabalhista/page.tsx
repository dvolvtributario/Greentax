import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { CtaFinal } from "@/components/sections/cta-final";
import { Section } from "@/components/ui/section";
import { IconeCheck } from "@/components/ui/icons";
import { servicosRecorrentes } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Contábil, Fiscal e Trabalhista",
  description:
    "O que está incluso no serviço recorrente da Greentax: escrituração contábil, apuração de tributos, obrigações acessórias, folha de pagamento, eSocial e EFD-Reinf.",
  alternates: { canonical: "/solucoes/contabil-fiscal-trabalhista" },
};

export default function ContabilFiscalTrabalhista() {
  return (
    <>
      <PageHero
        sobretitulo="Serviço recorrente"
        titulo="O básico bem-feito, com visão estratégica."
        descricao="Cuidamos de toda a rotina contábil, fiscal e trabalhista da sua empresa com precisão técnica e comunicação próxima — para que você tenha segurança no que já é obrigação e clareza sobre o que isso significa para o seu negócio."
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {servicosRecorrentes.map((bloco) => (
            <div
              key={bloco.titulo}
              className="flex flex-col rounded-card border border-ink-200 bg-surface p-7 shadow-card"
            >
              <h2 className="text-xl font-bold text-ink-900">{bloco.titulo}</h2>
              <ul className="mt-6 space-y-4">
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

        {/* Aviso de escopo */}
        <div className="mt-10 rounded-card border border-brand-200 bg-brand-50 p-7">
          <p className="leading-relaxed text-brand-950">
            O escopo e os valores variam conforme o porte e o enquadramento
            tributário da sua empresa. Fale com a gente para uma proposta sob medida.
          </p>
        </div>

        <p className="mt-8 text-[0.9375rem] leading-relaxed text-ink-500">
          Consultoria tributária, planejamento e recuperação de créditos são tratados
          separadamente, na página de{" "}
          <Link
            href="/solucoes/consultoria-estrategica"
            className="font-semibold text-brand-800 underline underline-offset-4"
          >
            Consultoria Estratégica e Serviços Avulsos
          </Link>
          .
        </p>
      </Section>

      <CtaFinal
        titulo="Quer saber o que a mensalidade cobre para o seu enquadramento?"
        rotulo="Solicitar proposta personalizada"
      />
    </>
  );
}
