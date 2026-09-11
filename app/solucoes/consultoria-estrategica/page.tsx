import type { Metadata } from "next";
import { HandCoins, Handshake, Lightbulb, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CabecalhoSecao, Grade, Section } from "@/components/ui/Section";
import { Revelar } from "@/components/ui/Revelar";
import { Botao } from "@/components/ui/Button";
import { FAQ } from "@/components/sections/FAQ";
import { Ponto, Whatsapp } from "@/components/ui/Icons";
import { servicosConsultoria } from "@/lib/conteudo";
import { whatsappLink } from "@/lib/site";
import p from "@/app/paginas.module.css";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: "Consultoria Estratégica",
  description:
    "Planejamento tributário, recuperação de créditos, transações, defesa em fiscalizações e serviços societários para situações que pedem um olhar dedicado.",
  alternates: { canonical: "/solucoes/consultoria-estrategica" },
};

const cenarios = [
  {
    icone: Lightbulb,
    titulo: "Planejamento tributário",
    texto: "Revisão do enquadramento e das receitas para reduzir a carga de impostos dentro da lei.",
  },
  {
    icone: HandCoins,
    titulo: "Recuperação de créditos",
    texto: "Pagamentos a maior identificados e devolvidos para o caixa da empresa.",
  },
  {
    icone: Handshake,
    titulo: "Transação e parcelamento",
    texto: "Débitos com a União, estado e município renegociados em condições que cabem.",
  },
  {
    icone: ShieldCheck,
    titulo: "Defesa em fiscalizações",
    texto: "Intimações respondidas com organização, fundamento e no prazo.",
  },
];

const passos = [
  {
    numero: "01",
    titulo: "Levantamento do caso",
    texto: "Entendemos a situação, os documentos disponíveis e o objetivo da empresa.",
  },
  {
    numero: "02",
    titulo: "Análise técnica",
    texto: "Estudamos o problema e as alternativas possíveis dentro da lei.",
  },
  {
    numero: "03",
    titulo: "Escopo e proposta",
    texto: "Definimos o trabalho e o valor, com transparência antes de começar.",
  },
  {
    numero: "04",
    titulo: "Execução e acompanhamento",
    texto: "Conduzimos o trabalho e acompanhamos até a conclusão.",
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
        lead=""
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
        <Section className={estilos.surgirTexto}>
          <CabecalhoSecao
            rotulo="Quando a consultoria entra"
            titulo="Situações que pedem um olhar dedicado"
          />
          <Grade colunas={2} className={`${p.gradeEspacada} ${estilos.afastarCards}`}>
            {cenarios.map((cenario) => (
              <div key={cenario.titulo} className={p.beneficio}>
                <span className={p.beneficioIcone}>
                  <cenario.icone aria-hidden="true" size={32} strokeWidth={1.5} />
                </span>
                <h3>{cenario.titulo}</h3>
                <p>{cenario.texto}</p>
              </div>
            ))}
          </Grade>
        </Section>
      </Revelar>

      <Revelar>
        <Section fundo="papel2" className={estilos.apareceEsquerda}>
          <CabecalhoSecao
            rotulo="O que a consultoria cobre"
            titulo="Trabalhos que realizamos"
            lead="Serviços contratados separadamente, para quando a situação pede um trabalho específico."
          />
          <Grade colunas={3} className={`${p.gradeEspacada} ${estilos.afastarCards}`}>
            {servicosConsultoria.map((bloco) => (
              <div key={bloco.titulo} className={p.inclusos}>
                <h3 className={p.inclusosTitulo}>{bloco.titulo}</h3>
                <ul>
                  {bloco.itens.map((item) => (
                    <li key={item}>
                      <Ponto />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Grade>
          <div className={p.aviso}>
            <p>
              Esses serviços são contratados separadamente. Primeiro entendemos o
              caso, os documentos disponíveis e o objetivo da empresa; depois
              definimos o trabalho necessário.
            </p>
          </div>
          <p className={p.nota}>
            <strong>Atendimento a pessoa física.</strong> Também fazemos a
            Declaração de Imposto de Renda para sócios e clientes das empresas
            atendidas. Os detalhes são alinhados no primeiro contato.
          </p>
        </Section>
      </Revelar>

      <Revelar>
        <Section className={estilos.surgirTexto}>
          <CabecalhoSecao
            rotulo="Como funciona"
            titulo="Do levantamento do caso à conclusão"
            lead="A experiência em consultoria tributária na origem da Greentax continua viva em cada trabalho: entender a fundo, avaliar alternativas e conduzir até o fim."
          />
          <div className={`${p.passos} ${estilos.afastarCards}`}>
            {passos.map((passo) => (
              <div key={passo.numero} className={p.passo}>
                <span className={p.passoNumero}>{passo.numero}</span>
                <h3>{passo.titulo}</h3>
                <p>{passo.texto}</p>
              </div>
            ))}
          </div>
        </Section>
      </Revelar>

      <Revelar>
        <Section fundo="papel2" className={estilos.apareceEsquerda}>
          <CabecalhoSecao
            rotulo="Perguntas frequentes"
            titulo="Dúvidas comuns sobre consultoria"
          />
          <FAQ itens={faq} />
        </Section>
      </Revelar>
    </>
  );
}