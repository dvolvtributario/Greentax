import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { FormularioContato } from "@/components/sections/formulario-contato";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Pendente } from "@/components/ui/pendente";
import {
  IconeEmail,
  IconeEscudo,
  IconeInstagram,
  IconeLocal,
  IconeWhatsapp,
} from "@/components/ui/icons";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com quem entende do seu negócio. Conte um pouco sobre sua empresa e retornamos com um diagnóstico inicial, sem compromisso.",
  alternates: { canonical: "/contato" },
};

const faq = [
  {
    pergunta: "Trocar de contabilidade dá trabalho?",
    resposta:
      "A migração é conduzida por nós. Solicitamos os arquivos ao escritório anterior, conferimos a situação fiscal e societária da empresa e assumimos as obrigações a partir da competência combinada.",
  },
  {
    pergunta: "Quais documentos preciso separar?",
    resposta:
      "No primeiro contato, nada. Para a proposta, ajuda saber o faturamento aproximado, o regime tributário, o número de funcionários e o ramo de atividade.",
  },
  {
    pergunta: "Em quanto tempo recebo o retorno?",
    resposta:
      "O primeiro retorno é um diagnóstico inicial, sem compromisso. A proposta formal depende do porte e do enquadramento da empresa.",
  },
];

export default function Contato() {
  return (
    <>
      <PageHero
        sobretitulo="Contato"
        titulo="Fale com quem entende do seu negócio"
        descricao="Conte um pouco sobre sua empresa e retornamos com um diagnóstico inicial, sem compromisso."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Formulário */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-bold">Solicitar proposta</h2>
              <p className="mt-2 text-ink-500">
                Campos marcados com{" "}
                <span className="font-semibold text-brand-600">*</span> são
                obrigatórios.
              </p>
              <div className="mt-8">
                <FormularioContato />
              </div>
            </div>

            {/* Bloco institucional lateral */}
            <aside className="lg:col-span-5">
              <div className="rounded-card border border-ink-200 bg-surface-2 p-7 sm:p-8">
                <h2 className="text-lg font-bold text-ink-900">
                  {site.razaoSocial}
                </h2>

                <ul className="mt-6 space-y-5 text-[0.9375rem]">
                  <li className="flex gap-3">
                    <IconeLocal className="mt-0.5 size-5 shrink-0 text-brand-700" />
                    <span className="leading-relaxed text-ink-700">
                      {site.endereco.logradouro}
                      <br />
                      {site.endereco.complemento}
                      <br />
                      {site.endereco.bairro} — {site.endereco.cidade}/
                      {site.endereco.estado}
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <IconeWhatsapp className="mt-0.5 size-5 shrink-0 text-brand-700" />
                    <a
                      href={whatsappLink(
                        "Olá! Vim pelo site e gostaria de falar com um especialista da Greentax.",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand-800 underline underline-offset-4"
                    >
                      {site.contato.whatsappExibicao}
                    </a>
                  </li>

                  {site.contato.email ? (
                    <li className="flex gap-3">
                      <IconeEmail className="mt-0.5 size-5 shrink-0 text-brand-700" />
                      <a
                        href={`mailto:${site.contato.email}`}
                        className="font-semibold text-brand-800 underline underline-offset-4"
                      >
                        {site.contato.email}
                      </a>
                    </li>
                  ) : null}

                  {site.redes.map((rede) => (
                    <li key={rede.url} className="flex gap-3">
                      <IconeInstagram className="mt-0.5 size-5 shrink-0 text-brand-700" />
                      <a
                        href={rede.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-brand-800 underline underline-offset-4"
                      >
                        {rede.nome}
                      </a>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 flex gap-3 border-t border-ink-200 pt-6 text-sm leading-relaxed text-ink-500">
                  <IconeEscudo className="mt-0.5 size-5 shrink-0 text-brand-700" />
                  Seus dados estão seguros com a gente. Tratamos todas as
                  informações em conformidade com a Lei Geral de Proteção de Dados
                  (LGPD).
                </p>
              </div>

              <Pendente titulo="Mapa de localização" className="mt-6" compacto>
                O briefing pede um mapa. Recomendo o embed do Google Maps carregado
                apenas após clique — um iframe do Maps carregado direto grava
                cookies de terceiros antes do consentimento, o que conflita com a
                LGPD. Preciso do CEP para fechar o endereço exato.
              </Pendente>
            </aside>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <Section fundo="claro" size="narrow">
        <h2 className="text-2xl font-bold sm:text-3xl">Dúvidas comuns</h2>
        <dl className="mt-8 divide-y divide-ink-200 border-y border-ink-200">
          {faq.map((item) => (
            <div key={item.pergunta} className="py-6">
              <dt className="font-semibold text-ink-900">{item.pergunta}</dt>
              <dd className="mt-2 leading-relaxed text-ink-500">
                {item.resposta}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-ink-500">
          Estas respostas foram redigidas como ponto de partida — vale a Greentax
          revisar os prazos e o processo de migração antes de publicar.
        </p>
      </Section>
    </>
  );
}
