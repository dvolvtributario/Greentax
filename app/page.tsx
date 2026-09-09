import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Botao } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Revelar } from "@/components/ui/Revelar";
import { CabecalhoSecao, Grade, Section } from "@/components/ui/Section";
import { Pendente } from "@/components/ui/Pendente";
import { Seta, Whatsapp } from "@/components/ui/Icons";
import { ProvaSocial } from "@/components/sections/ProvaSocial";
import { CartaoArtigo } from "@/components/sections/CartaoArtigo";
import { FAQ } from "@/components/sections/FAQ";
import { listarArtigos } from "@/lib/blog";
import { diferenciais, solucoesResumo } from "@/lib/conteudo";
import { site, whatsappLink } from "@/lib/site";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: `${site.nome} | Contabilidade consultiva em Araçatuba/SP`,
  description: site.descricao,
  alternates: { canonical: "/" },
};

const pratica = [
  "Obrigações contábeis, fiscais e trabalhistas acompanhadas e entregues no prazo.",
  "Tributos apurados de acordo com o enquadramento e a operação da empresa.",
  "Atendimento próximo para dúvidas que surgem durante a rotina.",
  "Planejamento tributário e recuperação de créditos quando houver uma oportunidade concreta.",
];

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

  return (
    <>
      <link rel="preload" as="image" href="/marca/hero-gestao.jpg" />
      <Revelar>
        <section className={estilos.hero}>
          <Container>
            <p className={estilos.rotulo}>Contabilidade consultiva</p>

          <h1 className={estilos.titulo}>
            Contabilidade que acompanha a{" "}
            <span className={estilos.destaque}>evolução</span> da sua empresa.
          </h1>

          <div className={estilos.atalhos}>
            <p className={estilos.atalhosTitulo}>Como podemos ajudar?</p>
            <div className={estilos.atalhosBotoes}>
              <Botao
                href={whatsappLink("Olá! Quero trocar de contador e gostaria de entender como funciona.")}
                externo
                porte="lg"
              >
                <Whatsapp className={estilos.atalhoIcone} />
                Quero trocar de contador
              </Botao>
              <Botao
                href={whatsappLink("Olá! Quero abrir minha empresa e gostaria de receber orientação.")}
                externo
                variante="contorno"
                porte="lg"
              >
                <Whatsapp className={estilos.atalhoIcone} />
                Quero abrir minha empresa
              </Botao>
            </div>
          </div>

        </Container>

        <div className={estilos.heroFaixa}>
          <Container>
            <div className={estilos.heroBase}>
              <div>
                <p className={estilos.lead}>{site.promessa}</p>
                <div className={estilos.acoes}>
                  <Botao href="/solucoes" variante="contorno" porte="lg">
                    Conhecer as soluções
                  </Botao>
                </div>
              </div>

              <div className={estilos.pratica}>
                <h2 className={estilos.praticaTitulo}>O que você encontra aqui</h2>
                <ul className={estilos.praticaLista}>
                  {pratica.map((item) => (
                    <li key={item} className={estilos.praticaItem}>
                      <span className={estilos.praticaMarcador} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </div>
      </section>
      </Revelar>

      <Revelar>
        <Section fundo="nenhum" className={`${estilos.institucionalSecao} ${estilos.apareceEsquerda}`}>
        <div className={estilos.institucional}>
          <CabecalhoSecao
            rotulo="Quem é a Greentax"
            titulo="A contabilidade precisa conversar com o negócio."
            claro
          />
          <div className={estilos.texto}>
            <p>
              A rotina contábil gera informações que podem ajudar muito mais do que no
              fechamento do mês. Quando os números estão organizados, fica mais fácil
              entender custos, tributos, resultados e os efeitos de uma decisão.
            </p>
            <p>
              É nesse ponto que a Greentax trabalha: cuidando das obrigações e
              conversando com o empresário sobre o que os dados mostram. O atendimento
              reúne conhecimento contábil, fiscal e tributário com tecnologia e contato
              próximo.
            </p>
            <div className={estilos.textoAcao}>
              <Botao
                href="/quem-somos"
                variante="texto"
                className={estilos.linkHistoria}
              >
                Conheça nossa história
                <Seta className={estilos.icone} />
              </Botao>
            </div>
          </div>
        </div>
      </Section>
      </Revelar>

      <Revelar>
        <Section className={estilos.surgirTexto}>
          <CabecalhoSecao
            rotulo="Soluções"
            titulo="O que a Greentax pode assumir na sua empresa"
            lead="A rotina fica organizada e, quando aparece uma questão específica, você conta com uma equipe para analisar o caso."
          />

        <Grade colunas={4} className={estilos.gradeSolucoes}>
          {solucoesResumo.map((solucao, i) => (
            <Link key={solucao.slug} href={solucao.href} className={estilos.solucao}>
              <div className={estilos.solucaoIcone}>
                {solucao.imagem ? (
                  <Image
                    src={solucao.imagem.src}
                    alt={solucao.imagem.alt}
                    width={48}
                    height={48}
                  />
                ) : (
                  <solucao.icone aria-hidden="true" size={44} strokeWidth={1.5} />
                )}
              </div>
              <span className={estilos.numero}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={estilos.solucaoTitulo}>{solucao.titulo}</h3>
              <p className={estilos.solucaoResumo}>{solucao.resumo}</p>
              <span className={estilos.solucaoAcao}>
                Ver detalhes
                <Seta />
              </span>
            </Link>
          ))}
        </Grade>
      </Section>
      </Revelar>

      <Revelar>
        <Section fundo="papel2" className={estilos.apareceEsquerda}>
          <CabecalhoSecao
            rotulo="Diferenciais"
            titulo="Como a Greentax trabalha no dia a dia"
          />

        <div className={estilos.diferenciais}>
          {diferenciais.map((item, i) => (
            <div key={item.titulo} className={estilos.diferencial}>
              <span className={estilos.diferencialNumero}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{item.titulo}</h3>
                <p className={estilos.diferencialTexto}>{item.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      </Revelar>

      <Revelar>
        <ProvaSocial className={estilos.surgirTexto} />
      </Revelar>

      <Revelar>
        <Section fundo="papel2" className={estilos.apareceEsquerda}>
          <CabecalhoSecao
            rotulo="Nichos de atendimento"
            titulo="Conhecimento que começa pela realidade de cada setor"
            lead="Cada atividade tem regras, margens e problemas próprios. A página de nichos será construída a partir dos segmentos que fazem parte da carteira da Greentax."
          />
        <Pendente
          titulo="Segmentos prioritários ainda não definidos"
          className={estilos.pendenteNichos}
        >
          O briefing pede validar de 3 a 6 nichos com base na carteira atual antes da
          redação. Assim que estiverem definidos, eles entram aqui e ganham a página
          completa em <code>/nichos</code>.
        </Pendente>
      </Section>
      </Revelar>

      <Revelar>
        <Section className={estilos.surgirTexto}>
          <div className={estilos.blogTopo}>
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
          <Grade colunas={3} className={estilos.blogGrade}>
            {destaques.map((artigo) => (
              <CartaoArtigo key={artigo.slug} artigo={artigo} />
            ))}
          </Grade>
        ) : null}
      </Section>
      </Revelar>

      <Revelar>
        <Section fundo="papel2" className={estilos.apareceEsquerda}>
          <CabecalhoSecao
            rotulo="Perguntas frequentes"
            titulo="Dúvidas comuns sobre contabilidade"
          />
        <FAQ itens={faq} />
      </Section>
      </Revelar>
    </>
  );
}
