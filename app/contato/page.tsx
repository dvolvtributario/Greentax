import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FormularioContato } from "@/components/sections/FormularioContato";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Pendente } from "@/components/ui/Pendente";
import { Envelope, Escudo, Instagram, Local, Whatsapp } from "@/components/ui/Icons";
import { site, whatsappLink } from "@/lib/site";
import p from "@/app/paginas.module.css";
import estilos from "./page.module.css";

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
        rotulo="Contato"
        titulo="Fale com quem entende do seu negócio"
        lead="Conte um pouco sobre sua empresa e retornamos com um diagnóstico inicial, sem compromisso."
      />

      <section className={estilos.secao}>
        <Container>
          <div className={estilos.grade}>
            <div>
              <h2 className={estilos.tituloForm}>Solicitar proposta</h2>
              <p className={estilos.aviso}>
                Campos marcados com <span className={estilos.obrigatorio}>*</span> são
                obrigatórios.
              </p>
              <div className={estilos.form}>
                <FormularioContato />
              </div>
            </div>

            <aside>
              <div className={estilos.painel}>
                <h2 className={estilos.painelTitulo}>{site.razaoSocial}</h2>

                <ul className={estilos.dados}>
                  <li className={estilos.dado}>
                    <Local />
                    <span>
                      {site.endereco.logradouro}
                      <br />
                      {site.endereco.complemento}
                      <br />
                      {site.endereco.bairro} — {site.endereco.cidade}/
                      {site.endereco.estado}
                    </span>
                  </li>

                  <li className={estilos.dado}>
                    <Whatsapp />
                    <a
                      href={whatsappLink(
                        "Olá! Vim pelo site e gostaria de falar com um especialista da Greentax.",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {site.contato.whatsappExibicao}
                    </a>
                  </li>

                  {site.contato.email ? (
                    <li className={estilos.dado}>
                      <Envelope />
                      <a href={`mailto:${site.contato.email}`}>{site.contato.email}</a>
                    </li>
                  ) : null}

                  {site.redes.map((rede) => (
                    <li key={rede.url} className={estilos.dado}>
                      <Instagram />
                      <a href={rede.url} target="_blank" rel="noopener noreferrer">
                        {rede.nome}
                      </a>
                    </li>
                  ))}
                </ul>

                <p className={estilos.lgpd}>
                  <Escudo />
                  <span>
                    Seus dados estão seguros com a gente. Tratamos todas as informações
                    em conformidade com a Lei Geral de Proteção de Dados (LGPD).
                  </span>
                </p>
              </div>

              <Pendente compacto titulo="Mapa de localização" className={estilos.pendenteMapa}>
                O briefing pede um mapa. Recomendo o embed do Google Maps carregado
                apenas após clique — um iframe do Maps carregado direto grava cookies
                de terceiros antes do consentimento, o que conflita com a LGPD.
                Preciso do CEP para fechar o endereço exato.
              </Pendente>
            </aside>
          </div>
        </Container>
      </section>

      <Section fundo="papel2" largura="estreito">
        <h2>Dúvidas comuns</h2>
        <dl className={p.faq}>
          {faq.map((item) => (
            <div key={item.pergunta} className={p.faqItem}>
              <dt className={p.faqPergunta}>{item.pergunta}</dt>
              <dd className={p.faqResposta}>{item.resposta}</dd>
            </div>
          ))}
        </dl>
        <p className={p.nota}>
          Estas respostas foram redigidas como ponto de partida, vale a Greentax
          revisar os prazos e o processo de migração antes de publicar.
        </p>
      </Section>
    </>
  );
}
