import type { Metadata } from "next";
import { FormularioContato } from "@/components/sections/FormularioContato";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Pendente } from "@/components/ui/Pendente";
import { Envelope, Escudo, Instagram, Local, Whatsapp } from "@/components/ui/Icons";
import { PageHero } from "@/components/sections/PageHero";
import { site, whatsappLink } from "@/lib/site";
import p from "@/app/paginas.module.css";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Conte o que sua empresa precisa. A Greentax avalia o cenário e retorna com um diagnóstico inicial.",
  alternates: { canonical: "/contato" },
};

const faq = [
  {
    pergunta: "Trocar de contabilidade dá trabalho?",
    resposta:
      "A Greentax conduz a mudança. Primeiro solicita os arquivos ao escritório anterior e confere a situação fiscal e societária. Depois, assume as obrigações a partir da competência combinada com a empresa.",
  },
  {
    pergunta: "Quais documentos preciso separar?",
    resposta:
      "Para iniciar a conversa, nenhum documento específico. Para montar a proposta, ajuda ter o faturamento aproximado, o regime tributário, o número de funcionários e o ramo de atividade.",
  },
  {
    pergunta: "Quando recebo o retorno?",
    resposta:
      "O primeiro contato serve para entender a empresa e a necessidade apresentada. O prazo da proposta depende das informações necessárias para avaliar o porte e o enquadramento.",
  },
];

export default function Contato() {
  return (
    <>
      <PageHero
        rotulo="Contato"
        titulo="Conte o que está acontecendo na sua empresa."
        lead="Explique sua necessidade pelo formulário. A primeira conversa serve para entender o caso e indicar o próximo passo."
      />

      <section className={estilos.secao}>
        <Container>
          <div className={estilos.grade}>
            <div>
              <h2 className={estilos.tituloForm}>Vamos conversar</h2>
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
                    Os dados enviados pelo formulário são tratados conforme a Lei Geral
                    de Proteção de Dados (LGPD).
                  </span>
                </p>
              </div>

              <Pendente compacto titulo="Mapa de localização" className={estilos.pendenteMapa}>
                Adicionar o mapa depois de definir a ferramenta de mapas e a regra de
                consentimento para cookies de terceiros.
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
      </Section>
    </>
  );
}
