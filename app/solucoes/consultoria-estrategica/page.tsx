import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { CabecalhoSecao, Section } from "@/components/ui/Section";
import { Revelar } from "@/components/ui/Revelar";
import { Botao } from "@/components/ui/Button";
import { Abas } from "@/components/sections/Abas";
import { FAQ } from "@/components/sections/FAQ";
import { Seta, Whatsapp } from "@/components/ui/Icons";
import { servicosConsultoria } from "@/lib/conteudo";
import { whatsappLink } from "@/lib/site";
import { metadadosPagina } from "@/lib/seo";
import p from "@/app/paginas.module.css";
import estilos from "./page.module.css";

export const metadata = metadadosPagina({
  titulo: "Consultoria e Planejamento Tributário",
  descricao:
    "Planejamento tributário, recuperação de créditos, transações, defesa em fiscalizações e serviços societários para situações que pedem um olhar dedicado.",
  rota: "/solucoes/consultoria-estrategica",
});

const cenarios = [
  {
    numero: "01",
    tagline: "Reduzir a carga",
    titulo: "Planejamento tributário",
    texto:
      "Revisão do enquadramento e das receitas para reduzir a carga de impostos dentro da lei. Analisamos a operação real da empresa e apontamos o caminho com a menor tributação possível, sem risco.",
    imagem: "/marca/consultoria-planejamento.jpg",
  },
  {
    numero: "02",
    tagline: "Dinheiro de volta",
    titulo: "Recuperação de créditos",
    texto:
      "Pagamentos a maior identificados e devolvidos para o caixa da empresa. Levantamos tributos pagos a maior ou passíveis de compensação e cuidamos do pedido até a efetivação.",
    imagem: "/marca/consultoria-creditos.jpg",
  },
  {
    numero: "03",
    tagline: "Acordo com o fisco",
    titulo: "Transação e parcelamento",
    texto:
      "Débitos com a União, estado e município renegociados em condições que cabem no caixa. Avaliamos cada dívida e negociamos a modalidade mais vantajosa, sem perder prazos.",
    imagem: "/marca/consultoria-transacao.jpg",
  },
  {
    numero: "04",
    tagline: "Resposta no prazo",
    titulo: "Defesa em fiscalizações",
    texto:
      "Intimações respondidas com organização, fundamento e no prazo. Organizamos os documentos, avaliamos a situação e conduzimos a resposta até a conclusão.",
    imagem: "/marca/consultoria-defesa.jpg",
  },
];

const faq = [
  {
    pergunta: "Posso contratar a consultoria sem manter a contabilidade rotineira na Greentax?",
    resposta:
      "Sim, são serviços que podem ser contratados separadamente. Vale lembrar que uma contabilidade em dia facilita a análise: os números já estão organizados, conferidos e disponíveis.",
  },
  {
    pergunta: "Como começa um trabalho de consultoria?",
    resposta:
      "Com um levantamento do caso: documentos, prazos e objetivo. A partir dele definimos se vale a pena, qual o escopo e qual o valor. Nada começa sem que você entenda o que vai ser feito.",
  },
  {
    pergunta: "O que é recuperação de créditos tributários?",
    resposta:
      "É identificar tributos pagos a maior, ou que poderiam ter sido compensados, e pedir a devolução ou a compensação seguindo as regras da Receita. Fazemos o levantamento e o pedido.",
  },
  {
    pergunta: "O que acontece quando a empresa recebe uma intimação?",
    resposta:
      "Primeiro entendemos o que foi pedido e qual é o prazo. Organizamos os documentos, avaliamos a situação e respondemos com fundamento. O processo é acompanhado até a conclusão.",
  },
  {
    pergunta: "A Greentax atende pessoa física?",
    resposta:
      "Sim, em serviços específicos. Fazemos a Declaração de Imposto de Renda para sócios e clientes das empresas atendidas.",
  },
  {
    pergunta: "Quanto custa uma consultoria?",
    resposta:
      "Depende da complexidade e do objetivo do trabalho. O valor é definido depois do levantamento inicial, quando já sabemos o que será feito e nenhuma decisão é tomada sem que você entenda o escopo.",
  },
];

export default function ConsultoriaEstrategica() {
  return (
    <>
      <PageHero
        rotulo="Consultoria Estratégica"
        titulo="Quando surge uma questão que pede um olhar dedicado."
        lead="Cada situação tributária tem um caminho próprio. Antes de decidir qualquer coisa, entendemos o caso, os prazos e o que você espera do resultado."
        imagem={{
          src: "/marca/hero-consultoria.jpg",
          alt: "Equipe da Greentax em reunião de consultoria",
        }}
        corte="diagonal"
      >
        <div className={estilos.heroAcoes}>
          <Botao
            href={whatsappLink("Olá! Tenho uma situação tributária e quero entender como a consultoria da Greentax pode ajudar.")}
            externo
            porte="lg"
          >
            <Whatsapp className={p.iconeBotao} />
            Quero conversar sobre meu caso
          </Botao>
        </div>
      </PageHero>

      <Revelar>
        <Section fundo="nenhum" className={estilos.secaoVerdeClaro}>
          <div className={`${estilos.cabecalhoGrama} ${estilos.textosEsquerda}`}>
            <CabecalhoSecao
              rotulo="Quando a consultoria entra"
              titulo="Situações que pedem um olhar dedicado"
              lead="Quatro trabalhos comuns de consultoria. Em todos, o primeiro passo é o mesmo: entender o caso antes de decidir qualquer coisa."
            />
          </div>
          <div className={estilos.blocos}>
            {cenarios.map((cenario, indice) => (
              <article
                key={cenario.titulo}
                className={`${estilos.bloco} ${indice % 2 === 1 ? estilos.blocoInvertido : ""}`}
              >
                <div className={estilos.blocoTexto}>
                  <span className={estilos.blocoNumero}>{cenario.numero}</span>
                  <span className={estilos.blocoTag}>{cenario.tagline}</span>
                  <h2 className={estilos.blocoTitulo}>{cenario.titulo}</h2>
                  <p>{cenario.texto}</p>
                  <a
                    className={estilos.blocoLeiaMais}
                    href={whatsappLink(`Olá! Quero entender como a consultoria da Greentax pode ajudar com: ${cenario.titulo}.`)}
                  >
                    Entender o meu caso
                    <Seta />
                  </a>
                </div>
                <div className={estilos.blocoImagem}>
                  <Image
                    src={cenario.imagem}
                    alt={cenario.titulo}
                    fill
                    sizes="(max-width: 899px) 100vw, 50vw"
                  />
                </div>
              </article>
            ))}
          </div>
        </Section>
      </Revelar>

      <Section>
        <CabecalhoSecao
          rotulo="O que a consultoria cobre"
          titulo="Trabalhos que realizamos"
          lead="Serviços contratados separadamente, para quando a situação pede um trabalho específico."
        />
        <Abas abas={servicosConsultoria} tituloCard="O que a consultoria cobre" />
      </Section>

      <Revelar>
        <Section fundo="papel2" className={estilos.secaoFaq}>
          <div className={estilos.textosEsquerda}>
            <CabecalhoSecao
              rotulo="Perguntas frequentes"
              titulo="Dúvidas comuns sobre consultoria"
            />
          </div>
          <FAQ itens={faq} className={estilos.cartoesEsquerda} />
        </Section>
      </Revelar>
    </>
  );
}