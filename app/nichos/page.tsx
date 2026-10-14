import type { Metadata } from "next";
import { CabecalhoSecao, Section } from "@/components/ui/Section";
import { Revelar } from "@/components/ui/Revelar";
import { Botao } from "@/components/ui/Button";
import { Whatsapp } from "@/components/ui/Icons";
import { CarrosselNichos } from "@/components/sections/CarrosselNichos";
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
            lead="Cada setor tem suas próprias particularidades fiscais e de gestão. Nos sete segmentos a seguir, o problema comum de cada atividade, como a Greentax trabalha esse ponto e as questões que merecem atenção no seu caso."
            className={estilos.cabecalhoCentral}
          />

          <CarrosselNichos className={estilos.carrossel} />
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
