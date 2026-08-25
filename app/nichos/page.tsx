import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Section } from "@/components/ui/Section";
import { Pendente } from "@/components/ui/Pendente";

export const metadata: Metadata = {
  title: "Nichos de Atendimento",
  description:
    "Cada setor tem suas próprias particularidades fiscais e de gestão. Conheça os segmentos em que a Greentax desenvolveu conhecimento aprofundado.",
  alternates: { canonical: "/nichos" },
};

export default function Nichos() {
  return (
    <>
      <PageHero
        rotulo="Nichos de atendimento"
        titulo="Especialistas no seu tipo de negócio"
        lead="Entendemos que cada setor tem suas próprias particularidades fiscais e de gestão — por isso desenvolvemos conhecimento aprofundado nos segmentos que mais atendemos."
      />

      <Section largura="estreito">
        <Pendente titulo="Segmentos prioritários a definir">
          <p>
            Esta é a maior lacuna do projeto. O briefing (itens 6 e 11) pede validar
            de <strong>3 a 6 nichos</strong> com base na carteira atual da consultoria
            antes de escrever a copy — e a copy final entrega apenas o modelo a
            repetir, não os segmentos.
          </p>

          <p>
            <strong>Estrutura definida para cada segmento:</strong>
          </p>
          <ol>
            <li>Nome do segmento</li>
            <li>
              Frase de abertura reconhecendo o desafio específico do setor + como a
              Greentax resolve
            </li>
            <li>2 a 3 pontos de atenção fiscal/tributária relevantes para o segmento</li>
          </ol>

          <p>
            <strong>Pista que já está no briefing:</strong> a menção a Monofásicos e
            Substituição Tributária no contrato indica atuação forte em{" "}
            <em>comércio e revenda</em> — provavelmente um dos nichos a priorizar.
          </p>

          <p>
            Assim que a lista existir, os dados entram em <code>lib/conteudo.ts</code>{" "}
            e esta página passa a renderizar os segmentos com o CTA
            &ldquo;Sou desse segmento, quero saber mais&rdquo;.
          </p>
        </Pendente>
      </Section>

      <CtaFinal
        titulo="Não encontrou o seu segmento?"
        descricao="Atendemos empresas de perfis variados. Conte sobre o seu negócio e a gente diz como pode ajudar."
        rotulo="Solicitar atendimento especializado"
      />
    </>
  );
}
