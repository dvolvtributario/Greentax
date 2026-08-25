import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CtaFinal } from "@/components/sections/cta-final";
import { Section, TituloSecao } from "@/components/ui/section";
import { Pendente } from "@/components/ui/pendente";
import {
  IconeCrescimento,
  IconeInteligencia,
  IconeRelacionamento,
  IconeTecnologia,
} from "@/components/ui/icons";
import { pilares } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "A Greentax é uma empresa de contabilidade consultiva que atua como parceira estratégica de empresas que buscam crescer com organização, segurança e inteligência.",
  alternates: { canonical: "/quem-somos" },
};

const icones = [
  IconeInteligencia,
  IconeTecnologia,
  IconeRelacionamento,
  IconeCrescimento,
];

export default function QuemSomos() {
  return (
    <>
      <PageHero
        sobretitulo="Quem Somos"
        titulo="Contabilidade nunca deveria ser vista apenas como uma obrigação."
        descricao="Nossa atuação combina excelência técnica, tecnologia e atendimento próximo para transformar informações contábeis e tributárias em direcionamentos que fortalecem a gestão empresarial."
      />

      {/* Por que existimos */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <TituloSecao sobretitulo="Por que existimos" titulo="O manifesto" />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink-500 lg:col-span-8">
            <p className="text-xl font-medium text-ink-900">
              Acreditamos que a contabilidade nunca deveria ser vista apenas como
              uma obrigação.
            </p>
            <p>
              Empresas não crescem porque entregam declarações em dia. Crescem
              porque tomam decisões melhores. E decisões melhores nascem de
              informações confiáveis, análises consistentes e parceiros que
              compreendem o negócio como um todo.
            </p>
            <p>
              Foi a partir dessa visão que a Greentax foi construída — não para ser
              apenas mais um escritório de contabilidade, mas para ser uma empresa
              que aproxima empresários dos números que realmente importam. Que
              transforma dados em direção. Que utiliza tecnologia para simplificar
              processos. E que entende que cada empresa possui uma história,
              desafios e objetivos únicos.
            </p>
          </div>
        </div>
      </Section>

      {/* Compromisso e visão */}
      <Section fundo="claro">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Nosso compromisso</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-ink-500">
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
            <h2 className="text-2xl font-bold sm:text-3xl">Visão de futuro</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-ink-500">
              <p>
                Queremos contribuir para um mercado em que empresários enxergam a
                contabilidade como uma ferramenta de crescimento — onde tecnologia e
                atendimento humano caminhem juntos, decisões sejam tomadas com base
                em dados e confiança seja construída todos os dias.
              </p>
              <p className="border-l-2 border-brand-500 pl-5 text-lg font-medium text-ink-900">
                Transformamos informações contábeis em inteligência para decisões que
                impulsionam empresas.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Pilares */}
      <Section>
        <TituloSecao
          sobretitulo="Pilares estratégicos"
          titulo="O que sustenta a forma como trabalhamos"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {pilares.map((pilar, i) => {
            const Icone = icones[i];
            return (
              <div
                key={pilar.titulo}
                className="rounded-card border border-ink-200 bg-surface p-7 shadow-card"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-brand-50">
                  <Icone className="size-5.5 text-brand-700" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink-900">
                  {pilar.titulo}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-500">
                  {pilar.descricao}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Equipe */}
      <Section fundo="claro">
        <TituloSecao
          sobretitulo="Time"
          titulo="As pessoas por trás da Greentax"
          descricao="O briefing pede fotos reais de equipe e ambiente de trabalho — não banco de imagem genérico."
        />
        <Pendente titulo="Fotos e dados da equipe" className="mt-10">
          <p>
            Para cada pessoa: foto real, nome, cargo e — quando houver — registro
            profissional (CRC), que o briefing sugere para reforçar credibilidade
            técnica.
          </p>
          <p className="mt-2">
            As imagens vão em <code className="font-mono">public/equipe/</code> e os
            dados em <code className="font-mono">lib/conteudo.ts</code>.
          </p>
        </Pendente>
      </Section>

      {/* Linha do tempo */}
      <Section>
        <TituloSecao
          sobretitulo="Nossa origem"
          titulo="Da consultoria tributária à contabilidade completa"
          descricao="O briefing pede reforçar que a frente contábil é extensão natural da consultoria já prestada, não um negócio à parte."
        />
        <Pendente titulo="Marcos da linha do tempo" className="mt-10">
          Datas e marcos da trajetória (fundação como consultoria tributária,
          abertura do segundo CNPJ para a contabilidade, número de clientes ao
          longo do tempo). O briefing marca esta seção como opcional — incluir
          apenas se fizer sentido comercialmente.
        </Pendente>
      </Section>

      <CtaFinal
        titulo="Quer saber como podemos apoiar o crescimento da sua empresa?"
        rotulo="Conheça nossas soluções"
        href="/solucoes"
      />
    </>
  );
}
