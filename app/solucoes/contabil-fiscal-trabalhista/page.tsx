import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Section } from "@/components/ui/Section";
import { Marca } from "@/components/ui/Icons";
import { servicosRecorrentes } from "@/lib/conteudo";
import p from "@/app/paginas.module.css";

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
        rotulo="Serviço recorrente"
        titulo="O básico bem-feito, com visão estratégica."
        lead="Cuidamos de toda a rotina contábil, fiscal e trabalhista da sua empresa com precisão técnica e comunicação próxima — para que você tenha segurança no que já é obrigação e clareza sobre o que isso significa para o seu negócio."
      />

      <Section>
        <div className={p.blocos}>
          {servicosRecorrentes.map((bloco, i) => (
            <div key={bloco.titulo} className={p.bloco}>
              <div>
                <span className={p.blocoNumero}>{String(i + 1).padStart(2, "0")}</span>
                <h2 className={p.blocoTitulo}>{bloco.titulo}</h2>
              </div>
              <ul className={`${p.lista} ${p.listaDupla}`}>
                {bloco.itens.map((item) => (
                  <li key={item} className={p.item}>
                    <Marca />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={p.aviso}>
          <p>
            O escopo e os valores variam conforme o porte e o enquadramento tributário
            da sua empresa. Fale com a gente para uma proposta sob medida.
          </p>
        </div>

        <p className={p.nota}>
          Consultoria tributária, planejamento e recuperação de créditos são tratados
          separadamente, na página de{" "}
          <Link href="/solucoes/consultoria-estrategica">
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
