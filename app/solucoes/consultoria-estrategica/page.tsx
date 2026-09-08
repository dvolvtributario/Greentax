import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CabecalhoSecao, Section } from "@/components/ui/Section";
import { Ponto } from "@/components/ui/Icons";
import { servicosConsultoria } from "@/lib/conteudo";
import p from "@/app/paginas.module.css";

export const metadata: Metadata = {
  title: "Consultoria Estratégica",
  description:
    "Planejamento tributário, recuperação de créditos, transações, PER/DCOMP, serviços societários e suporte em fiscalizações.",
  alternates: { canonical: "/solucoes/consultoria-estrategica" },
};

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
        titulo="Algumas decisões pedem uma análise fora da rotina."
        lead="A Greentax começou na consultoria tributária. Essa experiência continua disponível para empresas que precisam revisar uma situação, encontrar créditos, organizar uma estratégia ou lidar com uma fiscalização."
      />

      <Section fundo="papel2" compacta>
        <CabecalhoSecao
          rotulo="Onde a consultoria pode ajudar"
          titulo="Questões que merecem olhar detalhado"
        />
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
            Esses serviços são contratados separadamente. Primeiro entendemos o caso,
            os documentos disponíveis e o objetivo da empresa; depois definimos o
            trabalho necessário.
          </p>
        </div>
      </Section>
    </>
  );
}
