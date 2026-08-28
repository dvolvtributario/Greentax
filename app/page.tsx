import type { Metadata } from "next";
import Link from "next/link";
import { Botao } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CabecalhoSecao, Grade, Section } from "@/components/ui/Section";
import { Pendente } from "@/components/ui/Pendente";
import { Seta } from "@/components/ui/Icons";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { ProvaSocial } from "@/components/sections/ProvaSocial";
import { CartaoArtigo } from "@/components/sections/CartaoArtigo";
import { listarArtigos } from "@/lib/blog";
import { diferenciais, solucoesResumo } from "@/lib/conteudo";
import { site } from "@/lib/site";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: `${site.nome} — Contabilidade consultiva em Araçatuba/SP`,
  description: site.descricao,
  alternates: { canonical: "/" },
};

const pratica = [
  "Obrigações contábeis, fiscais e trabalhistas acompanhadas e entregues no prazo.",
  "Tributos apurados de acordo com o enquadramento e a operação da empresa.",
  "Atendimento próximo para dúvidas que surgem durante a rotina.",
  "Planejamento tributário e recuperação de créditos quando houver uma oportunidade concreta.",
];

export default async function Home() {
  const destaques = (await listarArtigos()).slice(0, 3);

  return (
    <>
      <section className={estilos.hero}>
        <Container>
          <p className={estilos.rotulo}>Contabilidade consultiva</p>

          <h1 className={estilos.titulo}>
            Contabilidade que acompanha a{" "}
            <span className={estilos.destaque}>evolução</span> da sua empresa.
          </h1>

          <div className={estilos.heroBase}>
            <div>
              <p className={estilos.lead}>{site.promessa}</p>
              <div className={estilos.acoes}>
                <Botao href="/contato" porte="lg">
                  Solicitar proposta
                  <Seta className={estilos.icone} />
                </Botao>
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
      </section>

      <Section>
        <div className={estilos.institucional}>
          <CabecalhoSecao
            rotulo="Quem é a Greentax"
            titulo="A contabilidade precisa conversar com o negócio."
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
              <Botao href="/quem-somos" variante="texto">
                Conheça nossa história
                <Seta className={estilos.icone} />
              </Botao>
            </div>
          </div>
        </div>
      </Section>

      <Section fundo="papel2">
        <CabecalhoSecao
          rotulo="Soluções"
          titulo="O que a Greentax pode assumir na sua empresa"
          lead="A rotina fica organizada e, quando aparece uma questão específica, você conta com uma equipe para analisar o caso."
        />

        <Grade colunas={4} className={estilos.grade}>
          {solucoesResumo.map((solucao, i) => (
            <Link key={solucao.slug} href={solucao.href} className={estilos.solucao}>
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

      <Section>
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

      <ProvaSocial />

      <Section>
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

      <Section fundo="papel2">
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

      <CtaFinal />
    </>
  );
}
