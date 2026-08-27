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
    "Serviços contábeis, fiscais e trabalhistas para a rotina da empresa e consultoria para questões tributárias, societárias e situações específicas.",
  alternates: { canonical: "/solucoes" },
};

const frentes = [
  {
    href: "/solucoes/contabil-fiscal-trabalhista",
    etiqueta: "Serviço recorrente",
    titulo: "Contábil, Fiscal e Trabalhista",
    resumo:
      "A rotina da empresa acompanhada de perto: escrituração, tributos, folha e obrigações, com espaço para tirar dúvidas ao longo do caminho.",
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
      "Uma análise específica para quando surge uma questão tributária, societária ou financeira que pede mais tempo e conhecimento técnico.",
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
        titulo="O serviço certo para o momento da sua empresa"
        lead="A rotina contábil, fiscal e trabalhista fica organizada. Quando aparece uma questão fora do dia a dia, a Greentax também pode assumir a análise."
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
          <strong>Atendimento a pessoa física.</strong> Também fazemos serviços
          pontuais, como a Declaração de Imposto de Renda para sócios e clientes das
          empresas atendidas. Veja os detalhes na página de{" "}
          <Link href="/solucoes/consultoria-estrategica">Consultoria Estratégica</Link>.
        </p>
      </Section>

      <CtaFinal
        titulo="Está em dúvida sobre qual serviço faz sentido?"
        descricao="Conte o que está acontecendo na sua empresa. A conversa começa pelo seu caso, não por uma lista de pacotes."
        rotulo="Falar com um especialista"
      />
    </>
  );
}
