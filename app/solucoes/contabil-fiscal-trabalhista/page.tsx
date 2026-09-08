import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Ponto } from "@/components/ui/Icons";
import { servicosRecorrentes } from "@/lib/conteudo";
import p from "@/app/paginas.module.css";

export const metadata: Metadata = {
  title: "Contábil, Fiscal e Trabalhista",
  description:
    "Escrituração contábil, apuração de tributos, obrigações acessórias, folha de pagamento, eSocial e EFD-Reinf.",
  alternates: { canonical: "/solucoes/contabil-fiscal-trabalhista" },
};

export default function ContabilFiscalTrabalhista() {
  return (
    <>
      <PageHero
        rotulo="Serviço recorrente"
        titulo="A rotina da sua empresa em ordem, com alguém para conversar."
        lead="Cuidamos da parte contábil, fiscal e trabalhista e explicamos o que você precisa saber para acompanhar a empresa sem depender de termos técnicos a cada fechamento."
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
                    <Ponto />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={p.aviso}>
          <p>
            O escopo e o valor do serviço dependem do porte, da atividade e do
            enquadramento tributário. A proposta é montada depois de entendermos a
            realidade da empresa.
          </p>
        </div>

        <p className={p.nota}>
          Planejamento tributário, recuperação de créditos e outros trabalhos
          específicos ficam na página de{" "}
          <Link href="/solucoes/consultoria-estrategica">
            Consultoria Estratégica e Serviços Avulsos
          </Link>.
        </p>
      </Section>
    </>
  );
}
