import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { CabecalhoSecao, Section } from "@/components/ui/Section";
import { Marca } from "@/components/ui/Icons";
import { servicosConsultoria } from "@/lib/conteudo";
import p from "@/app/paginas.module.css";

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
        rotulo="Sob demanda"
        titulo="Quando sua empresa precisa de mais do que rotina."
        lead="Nascemos como consultoria tributária e é essa expertise que colocamos à disposição das empresas que querem ir além da contabilidade recorrente: planejar, reduzir riscos e recuperar valores que fazem diferença no caixa."
      />

      <Section fundo="papel2" compacta>
        <CabecalhoSecao rotulo="Maior valor percebido" titulo="Onde a diferença aparece no caixa" />
        <div className={`${p.etiquetas} ${p.espaco}`}>
          {destaques.map((item) => (
            <span key={item} className={p.etiqueta}>
              {item}
            </span>
          ))}
        </div>
      </Section>

      <Section>
        <div className={p.blocos}>
          {servicosConsultoria.map((bloco, i) => (
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
