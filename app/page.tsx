import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Botao } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Revelar } from "@/components/ui/Revelar";
import { CabecalhoSecao, Section } from "@/components/ui/Section";
import { Seta, Whatsapp } from "@/components/ui/Icons";
import ShapeDivider from "@/components/ui/ShapeDivider";
import { ProvaSocial } from "@/components/sections/ProvaSocial";
import { CartaoArtigo } from "@/components/sections/CartaoArtigo";
import { FAQ } from "@/components/sections/FAQ";
import { listarArtigos } from "@/lib/blog";
import { solucoesResumo } from "@/lib/conteudo";
import { site, whatsappLink } from "@/lib/site";
import { listarLogosClientes } from "@/lib/clientes";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: `${site.nome} | Contabilidade consultiva em Araçatuba/SP`,
  description: site.descricao,
  alternates: { canonical: "/" },
};

const faq = [
  {
    pergunta: "Quais serviços nós oferecemos?",
    resposta:
      "A Greentax trabalha em três áreas principais: Contábil (com escrituração, balanços e demonstrações), Fiscal e Tributário (com apuração de tributos e otimização), e Trabalhista (com folha de pagamento e encargos). Além disso, oferecemos consultoria estratégica com planejamento tributário, recuperação de créditos e serviços societários como abertura e alteração de empresas.",
  },
  {
    pergunta: "Como funciona a troca de contador?",
    resposta:
      "A Greentax conduz o processo de forma tranquila. Solicitamos os arquivos ao contador anterior, conferimos a situação fiscal e societária da empresa, e assumimos as obrigações a partir da competência combinada com você. Você não fica descoberto em nenhum momento.",
  },
  {
    pergunta: "Quais formatos de empresa atendemos?",
    resposta:
      "Atendemos MEI (Microempreendedor Individual), ME (Microempresa), pequenas e médias empresas. Trabalhamos com diferentes regimes tributários: Simples Nacional, Lucro Presumido e Lucro Real. Cada estrutura tem suas particularidades, e o atendimento se adapta ao porte e à necessidade da empresa.",
  },
  {
    pergunta: "Minha empresa precisa de certificado digital?",
    resposta:
      "O certificado digital é obrigatório para algumas obrigações, como a transmissão de eSocial e EFD-Reinf. A necessidade exata depende do porte da empresa, da quantidade de funcionários e do regime tributário. Durante o primeiro contato, orientamos se é necessário na sua situação específica.",
  },
  {
    pergunta: "Como a contabilidade pode ajudar a pagar menos imposto?",
    resposta:
      "A contabilidade ajuda através da escolha correta do enquadramento tributário, da segregação de receitas, da identificação de créditos tributários e do planejamento estratégico. Quando os números estão organizados, fica mais fácil enxergar oportunidades dentro da lei para otimizar a carga tributária.",
  },
];

export default async function Home() {
  const destaques = (await listarArtigos()).slice(0, 3);
  const logosClientes = listarLogosClientes();

  return (
    <>
      <Revelar>
        <section className={estilos.hero}>
          <Container className={estilos.heroConteudo}>
            <p className={estilos.rotulo}>Contabilidade consultiva em Araçatuba/SP</p>
            <h1 className={estilos.titulo}>
              Contabilidade em Araçatuba que acompanha a{" "}
              <span className={estilos.destaque}>evolução</span> da sua empresa.
            </h1>
            <p className={estilos.lead}>{site.promessa}</p>
            <div className={estilos.acoes}>
              <Botao
                href={whatsappLink("Olá! Quero trocar de contador e gostaria de entender como funciona.")}
                externo
                porte="lg"
              >
                <Whatsapp className={estilos.icone} />
                Quero trocar de contador
              </Botao>
              <Botao
                href="/solucoes"
                variante="contorno"
                porte="lg"
                className={estilos.botaoHeroContorno}
              >
                Conhecer as soluções
              </Botao>
            </div>
          </Container>
        </section>
      </Revelar>

      <Revelar>
        <Section className={`${estilos.surgirTexto} ${estilos.deslizaEsquerda}`}>
          <CabecalhoSecao
            rotulo="Soluções"
            titulo="O que a Greentax pode assumir na sua empresa"
            lead="A rotina fica organizada e, quando aparece uma questão específica, você conta com uma equipe para analisar o caso."
          />

          <div className={estilos.gradeServicos}>
            {solucoesResumo.map((solucao, i) => (
              <Link key={solucao.slug} href={solucao.href} className={estilos.servico}>
                <span className={estilos.servicoNumero}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={estilos.servicoImagem}>
                  {solucao.imagem ? (
                    <Image
                      src={solucao.imagem.src}
                      alt={solucao.imagem.alt}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 999px) 50vw, 25vw"
                    />
                  ) : (
                    <solucao.icone aria-hidden="true" size={44} strokeWidth={1.5} />
                  )}
                </div>
                <div className={estilos.servicoCorpo}>
                  <h3 className={estilos.servicoTitulo}>{solucao.titulo}</h3>
                  <p className={estilos.servicoResumo}>{solucao.resumo}</p>
                  <span className={estilos.servicoAcao}>
                    Ver detalhes
                    <Seta />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className={estilos.gradeAcoes}>
            <Botao href="/solucoes" variante="contorno">
              Conhecer todas as soluções
            </Botao>
          </div>
        </Section>
      </Revelar>

      <Revelar>
        <ProvaSocial
          logos={logosClientes}
          mostrarIndicadores={false}
          className={estilos.surgirTexto}
        />
      </Revelar>

      {/* Arco cinza sobe sobre o branco dos logos, antes da Central de conteúdo. */}
      <Revelar>
        <ShapeDivider forma="arco" cor="var(--papel-2)" />
      </Revelar>

      <Revelar>
        <Section
          fundo="nenhum"
          className={`${estilos.secaoEsquerda} ${estilos.blog}`}
        >
          <div className={`${estilos.blogTopo} ${estilos.textosEsquerda}`}>
            <CabecalhoSecao
              rotulo="Central de conteúdo"
              titulo="Informação para quem precisa decidir"
              lead="Tributário, gestão e tecnologia explicados sem transformar uma dúvida prática em um texto cheio de termos técnicos."
            />
            <Botao href="/blog" variante="contorno">
              Ver todos os artigos
            </Botao>
          </div>

          {destaques.length > 0 ? (
            <div className={`${estilos.blogGrade} ${estilos.cartoesEsquerda}`}>
              {destaques.map((artigo) => (
                <CartaoArtigo key={artigo.slug} artigo={artigo} />
              ))}
            </div>
          ) : null}
        </Section>
      </Revelar>

      {/* Onda suave: começa alta à esquerda, faz uma crista, desce devagar e termina alta. */}
      <Revelar>
        <ShapeDivider
          forma="onda"
          cor="var(--verde-900)"
          fundo="var(--papel-2)"
          altura="clamp(75px, 9vw, 125px)"
        />
      </Revelar>

      <Revelar>
        <section className={estilos.faixaCta}>
          <Container>
            <p className={estilos.faixaCtaRotulo}>Atendimento próximo</p>
            <h2 className={estilos.faixaCtaTitulo}>
              Você cuida da operação. A Greentax acompanha os números, os tributos e
              as obrigações.
            </h2>
            <p className={estilos.faixaCtaTexto}>
              A conversa começa simples, com uma mensagem de WhatsApp. Contamos como
              o trabalho funciona e avaliamos o que faz sentido para a sua empresa.
            </p>
            <div className={estilos.faixaCtaAcoes}>
              <Botao
                href={whatsappLink("Olá! Quero conversar com a Greentax sobre contabilidade.")}
                externo
                variante="claro"
                porte="lg"
              >
                <Whatsapp className={estilos.icone} />
                Falar com a Greentax
              </Botao>
            </div>
          </Container>
        </section>
      </Revelar>

      {/* Arco branco sobe no verde do CTA, antes do FAQ. */}
      <Revelar>
        <ShapeDivider forma="arco" cor="var(--papel)" />
      </Revelar>

      <Revelar>
        <Section className={estilos.secaoFaq}>
          <div className={estilos.textosEsquerda}>
            <CabecalhoSecao
              rotulo="Perguntas frequentes"
              titulo="Dúvidas comuns sobre contabilidade"
            />
          </div>
          <FAQ itens={faq} className={estilos.cartoesEsquerda} />
        </Section>
      </Revelar>
    </>
  );
}