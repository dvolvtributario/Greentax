import type { Metadata } from "next";
import Link from "next/link";
import {Calculator, CalendarCheck, MessagesSquare, Timer, TrendingUp, Users,} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CabecalhoSecao, Section } from "@/components/ui/Section";
import { Revelar } from "@/components/ui/Revelar";
import { Botao } from "@/components/ui/Button";
import { FAQ } from "@/components/sections/FAQ";
import { CarrosselInclusos } from "@/components/sections/CarrosselInclusos";
import { Whatsapp } from "@/components/ui/Icons";
import { Contador } from "@/components/ui/Contador";
import { site, whatsappLink } from "@/lib/site";
import p from "@/app/paginas.module.css";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: "Contábil, Fiscal e Trabalhista",
  description:
    "A rotina contábil, fiscal e trabalhista da sua empresa em ordem: escrituração, tributos, folha e obrigações no prazo, com alguém para conversar.",
  alternates: { canonical: "/solucoes/contabil-fiscal-trabalhista" },
};

const beneficios = [
  {
    icone: CalendarCheck,
    titulo: "Obrigações no prazo",
    texto: "Multas e penalidades evitadas, porque nada sai do prazo ou da lei.",
  },
  {
    icone: Calculator,
    titulo: "Imposto sem excesso",
    texto:
      "Apuração pela operação real, com segregação de receitas para não pagar a mais no PGDAS-D.",
  },
  {
    icone: Users,
    titulo: "Folha tranquila",
    texto: "Folha, encargos, admissões e rescisões calculados e transmitidos corretamente.",
  },
  {
    icone: TrendingUp,
    titulo: "Informação para decidir",
    texto: "Relatórios e conversas que traduzem números em leitura de gestão.",
  },
  {
    icone: Timer,
    titulo: "Tempo para o seu negócio",
    texto: "Menos burocracia na sua rotina e mais foco na operação.",
  },
  {
    icone: MessagesSquare,
    titulo: "Atendimento próximo",
    texto: "Dúvidas respondidas com contexto, por quem conhece a sua empresa.",
  },
];

const passos = [
  {
    numero: "01",
    titulo: "Conversa inicial",
    texto: "Entendemos a empresa, a atividade, o porte e o momento atual.",
  },
  {
    numero: "02",
    titulo: "Análise da documentação",
    texto:
      "Conferimos a situação fiscal, trabalhista e societária e os arquivos com o contador anterior.",
  },
  {
    numero: "03",
    titulo: "Proposta no escopo certo",
    texto: "Definimos o que será feito e o valor, sem surpresa e sem pacote engessado.",
  },
  {
    numero: "04",
    titulo: "Rotina acompanhada",
    texto: "Assumimos as obrigações e seguimos próximos, competência a competência.",
  },
];

const faq = [
  {
    pergunta: "Como funciona a troca de contador?",
    resposta:
      "Conduzimos a transição para que nenhuma obrigação fique descoberta: pedimos os arquivos ao contador anterior, conferimos a situação fiscal, trabalhista e societária e assumimos a partir da competência combinada com você.",
  },
  {
    pergunta: "O que preciso enviar para a equipe todos os meses?",
    resposta:
      "Mandamos uma lista simples com o que costuma ser suficiente: notas fiscais, extratos bancários, movimentação de folha e documentos de admissão ou rescisão. O que faltar, combinamos no primeiro contato, porque cada empresa tem uma operação diferente.",
  },
  {
    pergunta: "Como o serviço trata o regime tributário da minha empresa?",
    resposta:
      "A apuração considera o enquadramento (Simples Nacional, Lucro Presumido ou Lucro Real). Analisamos a atividade e as receitas para avisar se o enquadramento atual continua sendo o melhor caminho dentro da lei.",
  },
  {
    pergunta: "Preciso de certificado digital?",
    resposta:
      "Depende do porte da empresa e do número de funcionários. Algumas obrigações, como eSocial e EFD-Reinf, exigem o certificado. Durante o primeiro contato, orientamos se a sua situação específica precisa.",
  },
  {
    pergunta: "Como recebo as informações da minha empresa?",
    resposta:
      "Além das entregas obrigatórias, você acompanha a situação por relatórios e conversas com a equipe, sem depender de termos técnicos a cada fechamento para entender o que está acontecendo.",
  },
  {
    pergunta: "O valor do serviço varia todo mês?",
    resposta:
      "O escopo depende do porte, da atividade e do enquadramento da empresa. A proposta é montada depois de conhecermos a realidade do negócio, e eventuais ajustes são conversados com antecedência.",
  },
];

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

const mensagemRotina =
  "Olá! Quero entender como funciona a contabilidade recorrente da Greentax.";

export default function ContabilFiscalTrabalhista() {
  return (
    <>
      <PageHero
        rotulo="Contábil, Fiscal e Trabalhista"
        titulo="A rotina da sua empresa em ordem, sem pagar imposto a mais."
        lead="Da escrituração e dos tributos no prazo à folha de pagamento e às obrigações acessórias, tudo com quem conhece o seu negócio."
        imagem={{
          src: "/marca/corporativa.jpg",
          alt: "Equipe em reunião de trabalho com clientes",
        }}
        corte="diagonal"
      >
        <div className={estilos.heroAcoes}>
          <Botao href={whatsappLink(mensagemRotina)} externo porte="lg">
            <Whatsapp className={p.iconeBotao} />
            Quero conversar sobre a rotina
          </Botao>
        </div>
      </PageHero>

      <Revelar>
        <Section className={estilos.surgirTexto}>
          <CabecalhoSecao
            rotulo="Benefícios"
            titulo="O que muda quando a Greentax cuida da sua rotina"
            className={estilos.cabecalhoCentral}
          />
          <div className={estilos.gradeBeneficios}>
            {beneficios.map((beneficio) => (
              <article key={beneficio.titulo} className={estilos.beneficio}>
                <span className={estilos.beneficioSelo} aria-hidden="true">
                  <beneficio.icone size={26} strokeWidth={1.5} />
                </span>
                <div className={estilos.beneficioTexto}>
                  <h3>{beneficio.titulo}</h3>
                  <p>{beneficio.texto}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </Revelar>

      <Revelar>
        <Section fundo="verde" className={estilos.secaoRota}>
          <div className={estilos.surgirTexto}>
            <CabecalhoSecao
              claro
              rotulo="Como funciona"
              titulo="Da conversa inicial à rotina no prazo"
              lead="Quatro passos, na mesma ordem, do primeiro contato até a rotina rodando mês a mês."
              className={estilos.cabecalhoCentral}
            />
          </div>
          <div className={estilos.rota}>
            {passos.map((passo) => (
              <article key={passo.numero} className={estilos.rotaItem}>
                <span className={estilos.rotaNo}>{passo.numero}</span>
                <h3 className={estilos.rotaTitulo}>{passo.titulo}</h3>
                <p className={estilos.rotaTexto}>{passo.texto}</p>
              </article>
            ))}
          </div>
        </Section>
      </Revelar>

      <Revelar>
        <Section fundo="papel2">
          <CabecalhoSecao
            rotulo="O que está incluso"
            titulo="A parte técnica, resumida para conferir"
            lead="Três frentes cobertas pelo trabalho de rotina: contábil, fiscal e trabalhista."
          />
          <div className={estilos.inclusos}>
            <CarrosselInclusos />
          </div>
        </Section>
      </Revelar>

      <Revelar>
        <Section className={estilos.secaoEsquerda}>
          <div className={estilos.textosEsquerda}>
            <CabecalhoSecao
              rotulo="A Greentax"
              titulo="Números que acompanham o trabalho"
              className={estilos.cabecalhoCentral}
            />
          </div>
          <div className={`${estilos.estatisticas} ${estilos.cartoesEsquerda}`}>
            {estatisticas.map((estatistica) => (
              <div key={estatistica.rotulo} className={estilos.estatistica}>
                <Contador
                  valor={estatistica.valor}
                  sufixo={estatistica.sufixo}
                  className={estilos.estatisticaValor}
                />
                <span className={estilos.estatisticaRotulo}>{estatistica.rotulo}</span>
              </div>
            ))}
          </div>
        </Section>
      </Revelar>

      <Revelar>
        <Section fundo="verde" className={estilos.apareceEsquerda}>
          <div className={estilos.cta}>
            <CabecalhoSecao
              claro
              rotulo="Próximo passo"
              titulo="Vamos colocar a rotina da sua empresa em ordem."
              lead="Converse com a equipe sobre o momento atual do seu negócio e receba uma proposta sob medida, sem compromisso."
            />
            <div className={estilos.ctaAcoes}>
              <Botao
                href={whatsappLink(
                  "Olá! Quero entender como a Greentax pode cuidar da rotina contábil, fiscal e trabalhista da minha empresa.",
                )}
                externo
                porte="lg"
                variante="claro"
              >
                <Whatsapp className={p.iconeBotao} />
                Quero conversar
              </Botao>
            </div>
            <p className={estilos.ctaNota}>
              Planejamento tributário, recuperação de créditos e outros trabalhos
              específicos ficam na página de{" "}
              <Link href="/solucoes/consultoria-estrategica">
                Consultoria Estratégica
              </Link>
              .
            </p>
          </div>
        </Section>
      </Revelar>

      <Revelar>
        <Section className={estilos.secaoFaq}>
          <div className={estilos.textosEsquerda}>
            <CabecalhoSecao
              rotulo="Perguntas frequentes"
              titulo="Dúvidas comuns sobre a rotina"
            />
          </div>
          <FAQ itens={faq} className={estilos.cartoesEsquerda} />
        </Section>
      </Revelar>
    </>
  );
}
