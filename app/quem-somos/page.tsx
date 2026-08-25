import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { CabecalhoSecao, Grade, Section } from "@/components/ui/Section";
import { Pendente } from "@/components/ui/Pendente";
import { pilares } from "@/lib/conteudo";
import p from "@/app/paginas.module.css";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "A Greentax é uma empresa de contabilidade consultiva que atua como parceira estratégica de empresas que buscam crescer com organização, segurança e inteligência.",
  alternates: { canonical: "/quem-somos" },
};

export default function QuemSomos() {
  return (
    <>
      <PageHero
        rotulo="Quem Somos"
        titulo="Contabilidade nunca deveria ser vista apenas como uma obrigação."
        lead="Nossa atuação combina excelência técnica, tecnologia e atendimento próximo para transformar informações contábeis e tributárias em direcionamentos que fortalecem a gestão empresarial."
      />

      {/* Manifesto */}
      <Section>
        <div className={p.duasColunas}>
          <CabecalhoSecao rotulo="Por que existimos" titulo="O manifesto" />
          <div className={`${p.texto} ${p.textoGrande}`}>
            <p className={p.abertura}>
              Acreditamos que a contabilidade nunca deveria ser vista apenas como uma
              obrigação.
            </p>
            <p>
              Empresas não crescem porque entregam declarações em dia. Crescem porque
              tomam decisões melhores. E decisões melhores nascem de informações
              confiáveis, análises consistentes e parceiros que compreendem o negócio
              como um todo.
            </p>
            <p>
              Foi a partir dessa visão que a Greentax foi construída — não para ser
              apenas mais um escritório de contabilidade, mas para ser uma empresa que
              aproxima empresários dos números que realmente importam. Que transforma
              dados em direção. Que utiliza tecnologia para simplificar processos. E
              que entende que cada empresa possui uma história, desafios e objetivos
              únicos.
            </p>
          </div>
        </div>
      </Section>

      {/* Compromisso e visão */}
      <Section fundo="papel2">
        <div className={p.meioAMeio}>
          <div>
            <h2 className={p.subtitulo}>Nosso compromisso</h2>
            <div className={p.corpo}>
              <p>
                Assumimos o compromisso de construir relações baseadas em confiança,
                transparência e proximidade.
              </p>
              <p>
                Cada empresa atendida merece uma estrutura organizada, processos
                eficientes e profissionais preparados para apoiar sua evolução. Por
                isso combinamos pessoas, conhecimento e tecnologia para oferecer uma
                experiência consultiva, moderna e acessível.
              </p>
              <p>
                Nosso trabalho é fazer com que a gestão financeira, contábil e
                tributária deixe de ser uma preocupação e passe a ser uma vantagem
                competitiva.
              </p>
            </div>
          </div>

          <div>
            <h2 className={p.subtitulo}>Visão de futuro</h2>
            <div className={p.corpo}>
              <p>
                Queremos contribuir para um mercado em que empresários enxergam a
                contabilidade como uma ferramenta de crescimento — onde tecnologia e
                atendimento humano caminhem juntos, decisões sejam tomadas com base em
                dados e confiança seja construída todos os dias.
              </p>
              <p className={p.citacao}>
                Transformamos informações contábeis em inteligência para decisões que
                impulsionam empresas.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Pilares */}
      <Section>
        <CabecalhoSecao
          rotulo="Pilares estratégicos"
          titulo="O que sustenta a forma como trabalhamos"
        />
        <Grade colunas={4} className={p.espacoG}>
          {pilares.map((pilar, i) => (
            <div key={pilar.titulo} className={estilos.pilar}>
              <span className={estilos.pilarNumero}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={estilos.pilarTitulo}>{pilar.titulo}</h3>
              <p className={estilos.pilarTexto}>{pilar.descricao}</p>
            </div>
          ))}
        </Grade>
      </Section>

      {/* Equipe */}
      <Section fundo="papel2">
        <div className={p.duasColunas}>
          <CabecalhoSecao
            rotulo="Time"
            titulo="As pessoas por trás da Greentax"
            lead="O briefing pede fotos reais de equipe e ambiente de trabalho — não banco de imagem genérico."
          />
          <Pendente titulo="Fotos e dados da equipe">
            <p>
              Para cada pessoa: foto real, nome, cargo e — quando houver — registro
              profissional (CRC), que o briefing sugere para reforçar credibilidade
              técnica.
            </p>
            <p>
              As imagens vão em <code>public/equipe/</code> e os dados em{" "}
              <code>lib/conteudo.ts</code>.
            </p>
          </Pendente>
        </div>
      </Section>

      {/* Origem */}
      <Section>
        <div className={p.duasColunas}>
          <CabecalhoSecao
            rotulo="Nossa origem"
            titulo="Da consultoria tributária à contabilidade completa"
            lead="O briefing pede reforçar que a frente contábil é extensão natural da consultoria já prestada, não um negócio à parte."
          />
          <Pendente titulo="Marcos da linha do tempo">
            Datas e marcos da trajetória (fundação como consultoria tributária,
            abertura do segundo CNPJ para a contabilidade, evolução da carteira). O
            briefing marca esta seção como opcional — incluir apenas se fizer sentido
            comercialmente.
          </Pendente>
        </div>
      </Section>

      <CtaFinal
        titulo="Quer saber como podemos apoiar o crescimento da sua empresa?"
        rotulo="Conheça nossas soluções"
        href="/solucoes"
      />
    </>
  );
}
