import type { Metadata } from "next";
import Image from "next/image";
import { Botao } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CabecalhoSecao, Grade, Section } from "@/components/ui/Section";
import { Revelar } from "@/components/ui/Revelar";
import ShapeDivider from "@/components/ui/ShapeDivider";
import { Contador } from "@/components/ui/Contador";
import { Whatsapp } from "@/components/ui/Icons";
import { pilares } from "@/lib/conteudo";
import { site, whatsappLink } from "@/lib/site";
import p from "@/app/paginas.module.css";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça a forma de trabalho da Greentax e como contabilidade, atendimento e tecnologia se encontram na rotina das empresas.",
  alternates: { canonical: "/quem-somos" },
};

const estatisticas = [
  {
    valor: site.indicadores.anosDeMercado,
    sufixo: "+",
    rotulo: "anos de atuação",
  },
  {
    valor: site.indicadores.empresasAtendidas,
    sufixo: "+",
    rotulo: "empresas atendidas",
  },
  {
    valor: site.indicadores.obrigacoesNoPrazo,
    sufixo: "%",
    rotulo: "obrigações entregues no prazo",
  },
];

const mensagemQuemSomos =
  "Olá! Vim pela página Quem Somos e gostaria de conversar com a equipe da Greentax.";

export default function QuemSomos() {
  return (
    <>
      <section className={estilos.hero}>
        <div className={estilos.heroImagem}>
          <Image
            src="/marca/reuniao.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className={estilos.heroFaixa} aria-hidden="true" />
        <div className={estilos.heroFaixaFina} aria-hidden="true" />
        <Container>
          <p className={estilos.heroRotulo}>Quem Somos</p>
          <h1 className={estilos.heroTitulo}>
            Contabilidade faz mais sentido quando você entende o que os números
            estão dizendo.
          </h1>
          <div className={estilos.heroAcoes}>
            <Botao href="/contato" variante="claro" porte="lg">
              Falar com a equipe
            </Botao>
          </div>
        </Container>
      </section>

      <Revelar>
        <Section className={estilos.apareceEsquerda}>
          <div className={p.duasColunas}>
            <CabecalhoSecao rotulo="Por que existimos" titulo="A ideia que deu origem à Greentax" />
            <div className={`${p.texto} ${p.textoGrande}`}>
              <p className={p.abertura}>
                Uma obrigação entregue no prazo resolve uma parte do trabalho. A informação
                que vem dela pode ajudar a resolver decisões bem maiores.
              </p>
              <p>
                Faturamento, custos, impostos, folha e resultado contam uma história sobre
                o negócio. Se esses dados chegam tarde ou sem contexto, o empresário perde
                tempo tentando descobrir o que já poderia estar claro.
              </p>
              <p>
                A Greentax foi construída para aproximar a contabilidade dessa rotina.
                Cuidamos do que precisa ser entregue, mas também abrimos espaço para
                explicar os números, discutir alternativas e entender o momento da empresa.
              </p>
            </div>
          </div>
        </Section>
      </Revelar>

      {/* As ondas passam a fazer parte da própria foto: o recorte do
          compromisso ganha a onda em cima e embaixo, no lugar do verde chapado. */}
      <svg aria-hidden="true" focusable="false" className={estilos.recorteOnda}>
        <defs>
          <clipPath id="onda-compromisso" clipPathUnits="objectBoundingBox">
            <path d="M0,0.042 C0.104,0.028 0.198,0.025 0.299,0.04 C0.424,0.059 0.528,0.078 0.639,0.068 C0.75,0.058 0.840,0.042 1,0.042 L1,0.958 C0.896,0.972 0.802,0.975 0.701,0.96 C0.576,0.941 0.472,0.922 0.361,0.932 C0.25,0.942 0.160,0.958 0,0.958 Z" />
          </clipPath>
        </defs>
      </svg>

      <Revelar>
        <Section
          fundo="verde"
          className={`${estilos.compromisso} ${estilos.surgirTexto}`}
          decoracao={
            <div className={estilos.compromissoImagem}>
              <Image src="/marca/nosso-compromisso.jpg" alt="" fill sizes="100vw" />
            </div>
          }
        >
          <div className={p.meioAMeio}>
            <div>
              <h2 className={p.subtitulo}>Nosso compromisso</h2>
              <div className={`${p.corpo} ${estilos.corpoFundoEscuro}`}>
                <p>
                  Trabalhamos com clareza sobre prazos, documentos, responsabilidades e
                  decisões que dependem de informação contábil ou tributária.
                </p>
                <p>
                  Cada empresa tem uma operação diferente. O atendimento começa por
                  entender essa operação e segue acompanhando as mudanças que aparecem
                  durante o ano.
                </p>
                <p>
                  A meta é simples: deixar a rotina organizada e fazer com que o empresário
                  saiba o que está acontecendo antes de precisar correr atrás da resposta.
                </p>
              </div>
            </div>

            <div>
              <h2 className={p.subtitulo}>Onde queremos chegar</h2>
              <div className={`${p.corpo} ${estilos.corpoFundoEscuro}`}>
                <p>
                  Queremos construir relações de longo prazo com empresas que valorizam
                  informação bem tratada, conversa direta e acompanhamento próximo.
                </p>
                <p>
                  Para isso, a tecnologia entra como ferramenta de trabalho e não como
                  substituta do contato entre pessoas.
                </p>
                <p>
                  Informação contábil só ganha valor quando ajuda alguém a tomar uma decisão.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </Revelar>

      <Revelar>
        <Section className={`${estilos.surgirTexto} ${estilos.deslizaEsquerda}`}>
          <CabecalhoSecao
            rotulo="Pilares"
            titulo="Quatro ideias que orientam nosso trabalho"
          />
          <Grade colunas={4} className={p.espacoG}>
            {pilares.map((pilar, i) => (
              <div key={pilar.titulo} className={estilos.pilar}>
                <div className={estilos.pilarIcone}>
                  {pilar.imagem ? (
                    <Image
                      src={pilar.imagem.src}
                      alt={pilar.imagem.alt}
                      width={48}
                      height={48}
                    />
                  ) : (
                    <pilar.icone aria-hidden="true" size={44} strokeWidth={1.5} />
                  )}
                </div>
                <span className={estilos.pilarNumero}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={estilos.pilarTitulo}>{pilar.titulo}</h3>
                <p className={estilos.pilarTexto}>{pilar.descricao}</p>
              </div>
            ))}
          </Grade>
        </Section>
      </Revelar>

      {/* Arco cinza sobe no branco e entra na faixa dos números. */}
      <Revelar>
        <ShapeDivider forma="arco" cor="var(--papel-2)" />
      </Revelar>

      <Revelar>
        <Section
          fundo="nenhum"
          className={`${estilos.secaoEsquerda} ${estilos.numeros}`}
        >
          <CabecalhoSecao
            rotulo="Em números"
            titulo="O trabalho de todo dia, em números"
            className={estilos.cabecalhoCentral}
          />
          <Grade colunas={3} className={estilos.gradeNumeros}>
            {estatisticas.map((estatistica) => (
              <div key={estatistica.rotulo} className={estilos.estatistica}>
                <Contador
                  valor={estatistica.valor}
                  sufixo={estatistica.sufixo}
                  className={estilos.estatisticaValor}
                />
                <span className={estilos.estatisticaRotulo}>
                  {estatistica.rotulo}
                </span>
              </div>
            ))}
          </Grade>
        </Section>
      </Revelar>

      {/* Arco cinza espelha a curva de entrada: o domo desce para fora, fechando a faixa. */}
      <Revelar>
        <ShapeDivider
          forma="arco"
          cor="var(--papel-2)"
          fundo="var(--papel)"
          espelhado
        />
      </Revelar>

      <Revelar>
        <Section className={estilos.apareceEsquerda}>
          <div className={estilos.cta}>
            <CabecalhoSecao
              rotulo="Próximo passo"
              titulo="Vamos conversar sobre a sua empresa?"
              lead="Conte como é a operação da sua empresa e entenda como fica a parte contábil, fiscal e trabalhista no seu dia a dia."
            />
            <div className={estilos.ctaAcoes}>
              <Botao
                href={whatsappLink(mensagemQuemSomos)}
                externo
                porte="lg"
              >
                <Whatsapp className={p.iconeBotao} />
                Falar com a Greentax
              </Botao>
            </div>
          </div>
        </Section>
      </Revelar>
    </>
  );
}
