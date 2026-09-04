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
    "Conheça a forma de trabalho da Greentax e como contabilidade, atendimento e tecnologia se encontram na rotina das empresas.",
  alternates: { canonical: "/quem-somos" },
};

export default function QuemSomos() {
  return (
    <>
      <PageHero
        rotulo="Quem Somos"
        titulo="Contabilidade faz mais sentido quando você entende o que os números estão dizendo."
        lead=""
        imagem={{
          src: "/marca/reuniao.jpg",
          alt: "",
        }}
      />

      <Section>
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

      <Section fundo="papel2">
        <div className={p.meioAMeio}>
          <div>
            <h2 className={p.subtitulo}>Nosso compromisso</h2>
            <div className={p.corpo}>
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
            <div className={p.corpo}>
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

      <Section>
        <CabecalhoSecao
          rotulo="Pilares"
          titulo="Quatro ideias que orientam nosso trabalho"
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

      <Section fundo="papel2">
        <div className={p.duasColunas}>
          <CabecalhoSecao
            rotulo="Time"
            titulo="As pessoas por trás da Greentax"
            lead="Queremos mostrar quem atende você. Por isso, esta área receberá fotos e informações reais da equipe."
          />
          <Pendente titulo="Fotos e dados da equipe">
            <p>
              Para cada pessoa: foto real, nome, cargo e, quando houver, registro
              profissional (CRC).
            </p>
            <p>
              As imagens vão em <code>public/equipe/</code> e os dados em{" "}
              <code>lib/conteudo.ts</code>.
            </p>
          </Pendente>
        </div>
      </Section>

      <Section>
        <div className={p.duasColunas}>
          <CabecalhoSecao
            rotulo="Nossa origem"
            titulo="Da consultoria tributária à contabilidade completa"
            lead="A história da Greentax deve mostrar como a consultoria tributária abriu caminho para a estrutura contábil atual."
          />
          <Pendente titulo="Marcos da história">
            Datas e acontecimentos da trajetória ainda precisam ser confirmados:
            fundação da consultoria tributária, abertura do segundo CNPJ e evolução da
            carteira de clientes.
          </Pendente>
        </div>
      </Section>

      <CtaFinal
        titulo="Quer entender como a Greentax pode entrar na rotina da sua empresa?"
        rotulo="Conheça nossas soluções"
        href="/solucoes"
      />
    </>
  );
}
