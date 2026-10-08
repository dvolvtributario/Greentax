import type { Metadata } from "next";
import { CabecalhoSecao, Section } from "@/components/ui/Section";
import { Revelar } from "@/components/ui/Revelar";
import { Botao } from "@/components/ui/Button";
import { Ponto, Whatsapp } from "@/components/ui/Icons";
import { nichos } from "@/lib/conteudo";
import { whatsappLink } from "@/lib/site";
import p from "@/app/paginas.module.css";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: "Nichos de Atendimento",
  description:
    "Conheça os setores atendidos pela Greentax e os pontos fiscais e de gestão que merecem atenção em cada atividade.",
  alternates: { canonical: "/nichos" },
};

const mensagemNicho =
  "Olá! Quero entender como a Greentax atende o segmento da minha empresa.";

export default function Nichos() {
  return (
    <>

      <Revelar className={estilos.revelar}>
        <Section>
          <CabecalhoSecao
            nivel="h1"
            rotulo="Nichos de atendimento"
            titulo="Especialistas no seu tipo de negócio"
            lead="Cada setor tem suas próprias particularidades fiscais e de gestão. Nos sete segmentos abaixo, o problema comum de cada atividade, como a Greentax trabalha esse ponto e as questões que merecem atenção no seu caso."
            className={estilos.cabecalhoCentral}
          />

          <nav className={estilos.indice} aria-label="Índice de nichos">
            {nichos.map((nicho) => (
              <a key={nicho.slug} className={estilos.indiceItem} href={`#${nicho.slug}`}>
                <nicho.icone size={16} strokeWidth={1.6} aria-hidden="true" />
                <span>{nicho.titulo}</span>
              </a>
            ))}
          </nav>

          <ol className={estilos.lista}>
            {nichos.map((nicho, indice) => (
              <li key={nicho.slug} id={nicho.slug} className={estilos.nicho}>
                <div className={estilos.nichoInfo}>
                  <div className={estilos.nichoTopo}>
                    <span className={estilos.nichoNumero} aria-hidden="true">
                      {String(indice + 1).padStart(2, "0")}
                    </span>
                    <span className={estilos.nichoTag}>{nicho.tag}</span>
                  </div>
                  <h3 className={estilos.nichoTitulo}>{nicho.titulo}</h3>
                  <p className={estilos.nichoTexto}>{nicho.problema}</p>
                  <p className={`${estilos.nichoTexto} ${estilos.nichoAtendimento}`}>
                    <strong>Como a Greentax trabalha:</strong> {nicho.atendimento}
                  </p>
                </div>

                <div className={estilos.nichoPontos}>
                  <p className={estilos.nichoPontosTitulo}>
                    <nicho.icone size={18} strokeWidth={1.6} aria-hidden="true" />
                    Questões que merecem atenção
                  </p>
                  <ul className={estilos.nichoLista}>
                    {nicho.pontos.map((ponto) => (
                      <li key={ponto}>
                        <Ponto />
                        <span>{ponto}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      </Revelar>

      <Revelar>
        <Section fundo="verde">
          <div className={estilos.cta}>
            <CabecalhoSecao
              claro
              rotulo="Falar com a Greentax"
              titulo="O seu segmento está na lista?"
              lead="Conte como é a operação da sua empresa e mostramos como fica a parte contábil, fiscal e trabalhista no seu tipo de atividade."
            />
            <div className={estilos.ctaAcoes}>
              <Botao href={whatsappLink(mensagemNicho)} externo porte="lg" variante="claro">
                <Whatsapp className={p.iconeBotao} />
                Conversar sobre o meu segmento
              </Botao>
            </div>
          </div>
        </Section>
      </Revelar>
    </>
  );
}
