import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Section } from "@/components/ui/Section";
import { Marca, Seta } from "@/components/ui/Icons";
import p from "@/app/paginas.module.css";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Serviço contábil, fiscal e trabalhista recorrente e consultoria estratégica sob demanda — planejamento tributário, recuperação de créditos e serviços societários.",
  alternates: { canonical: "/solucoes" },
};

const frentes = [
  {
    href: "/solucoes/contabil-fiscal-trabalhista",
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
        rotulo="Soluções"
        titulo="Soluções para cada fase do seu negócio"
        lead="Duas frentes complementares: a rotina que mantém sua empresa em dia e a estratégia que faz diferença no caixa."
      />

      <Section>
        <div className={estilos.frentes}>
          {frentes.map((frente, i) => (
            <Link key={frente.href} href={frente.href} className={estilos.frente}>
              <div className={estilos.frenteTopo}>
                <span className={estilos.frenteNumero}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={estilos.frenteEtiqueta}>{frente.etiqueta}</span>
              </div>

              <h2 className={estilos.frenteTitulo}>{frente.titulo}</h2>
              <p className={estilos.frenteResumo}>{frente.resumo}</p>

              <ul className={estilos.frenteLista}>
                {frente.itens.map((item) => (
                  <li key={item} className={p.item}>
                    <Marca />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <span className={estilos.frenteAcao}>
                {frente.cta}
                <Seta />
              </span>
            </Link>
          ))}
        </div>

        <p className={p.nota}>
          <strong>Atendimento a pessoa física.</strong> Também cuidamos de serviços
          pontuais como a Declaração de Imposto de Renda para sócios e clientes das
          empresas atendidas descrito na página de{" "}
          <Link href="/solucoes/consultoria-estrategica">Consultoria Estratégica</Link>.
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
