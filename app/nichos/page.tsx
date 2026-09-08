import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Pendente } from "@/components/ui/Pendente";

export const metadata: Metadata = {
  title: "Nichos de Atendimento",
  description:
    "Conheça os setores atendidos pela Greentax e os pontos fiscais e de gestão que merecem atenção em cada atividade.",
  alternates: { canonical: "/nichos" },
};

export default function Nichos() {
  return (
    <>
      <PageHero
        rotulo="Nichos de atendimento"
        titulo="Especialistas no seu tipo de negócio"
        lead="Entendemos que cada setor tem suas próprias particularidades fiscais e de gestão, por isso desenvolvemos conhecimento aprofundado nos segmentos que mais atendemos."
      />

      <Section largura="estreito">
        <Pendente titulo="Segmentos prioritários a definir">
          <p>
            O briefing pede a escolha de 3 a 6 nichos com base na carteira atual. Essa
            confirmação precisa vir antes da publicação para evitar uma página genérica.
          </p>

          <p>
            <strong>Para cada segmento, o conteúdo terá:</strong>
          </p>
          <ol>
            <li>Nome do segmento</li>
            <li>Um problema comum da atividade e como a Greentax trabalha esse ponto</li>
            <li>De 2 a 3 questões fiscais ou tributárias que merecem atenção</li>
          </ol>

          <p>
            A referência a operações com produtos monofásicos e substituição tributária
            indica que comércio e revenda podem estar entre os segmentos a considerar.
            Isso precisa ser confirmado pela equipe antes de entrar no site.
          </p>
        </Pendente>
      </Section>
    </>
  );
}
