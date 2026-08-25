import type { Metadata } from "next";
import Link from "next/link";
import { Botao } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CabecalhoSecao, Grade, Section } from "@/components/ui/Section";
import { Pendente } from "@/components/ui/Pendente";
import { Marca, Seta } from "@/components/ui/Icons";
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
  "Obrigações contábeis, fiscais e trabalhistas entregues no prazo.",
  "Apuração de tributos com análise para pagar o que é justo.",
  "Acompanhamento consultivo, não apenas execução de tarefas.",
  "Planejamento tributário e recuperação de créditos quando faz sentido.",
];

export default async function Home() {
  const destaques = (await listarArtigos()).slice(0, 3);

  return (
    <>
      {/* --- HERO --- */}
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
              <h2 className={estilos.praticaTitulo}>O que muda na prática</h2>
              <ul className={estilos.praticaLista}>
                {pratica.map((item) => (
                  <li key={item} className={estilos.praticaItem}>
                    <Marca />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* --- INSTITUCIONAL --- */}
      <Section>
        <div className={estilos.institucional}>
          <CabecalhoSecao
            rotulo="Quem é a Greentax"
            titulo="Mais do que cumprir obrigações — parceria estratégica."
          />
          <div className={estilos.texto}>
            <p>
              A Greentax é uma empresa de contabilidade consultiva que vai além do
              cumprimento das obrigações fiscais e contábeis. Atuamos como parceiros
              estratégicos de empresas que buscam crescer com organização, segurança
              e inteligência na tomada de decisões.
            </p>
            <p>
              Unimos excelência técnica, tecnologia e atendimento próximo para
              transformar informações contábeis e tributárias em direcionamentos que
              fortalecem a gestão da sua empresa.
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

      {/* --- SOLUÇÕES --- */}
      <Section fundo="papel2">
        <CabecalhoSecao
          rotulo="Soluções"
          titulo="Soluções para cada fase do seu negócio"
          lead="Do que é obrigação ao que é estratégia — com a mesma consistência técnica."
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

      {/* --- DIFERENCIAIS --- */}
      <Section>
        <CabecalhoSecao
          rotulo="Diferenciais"
          titulo="Por que empresas escolhem a Greentax"
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

      {/* --- PROVA SOCIAL --- */}
      <ProvaSocial />

      {/* --- NICHOS --- */}
      <Section>
        <CabecalhoSecao
          rotulo="Nichos de atendimento"
          titulo="Especialistas no seu tipo de negócio"
          lead="Entendemos que cada setor tem suas próprias particularidades fiscais e de gestão — por isso desenvolvemos conhecimento aprofundado nos segmentos que mais atendemos."
        />
        <Pendente
          titulo="Segmentos prioritários ainda não definidos"
          className={estilos.pendenteNichos}
        >
          O briefing (item 11) pede validar de 3 a 6 nichos com base na carteira
          atual antes da redação. Assim que estiverem definidos, eles entram aqui e
          ganham a página completa em <code>/nichos</code>.
        </Pendente>
      </Section>

      {/* --- BLOG --- */}
      <Section fundo="papel2">
        <div className={estilos.blogTopo}>
          <CabecalhoSecao
            rotulo="Central de conteúdo"
            titulo="Conteúdo para quem decide"
            lead="Tributário, gestão e tecnologia explicados de forma simples, direto para o seu negócio."
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
