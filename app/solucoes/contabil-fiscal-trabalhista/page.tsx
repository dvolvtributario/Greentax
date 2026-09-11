import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator,
  CalendarCheck,
  MessagesSquare,
  Timer,
  TrendingUp,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CabecalhoSecao, Grade, Section } from "@/components/ui/Section";
import { Revelar } from "@/components/ui/Revelar";
import { Botao } from "@/components/ui/Button";
import { FAQ } from "@/components/sections/FAQ";
import { Ponto, Whatsapp } from "@/components/ui/Icons";
import { servicosRecorrentes } from "@/lib/conteudo";
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
    texto: "Apuração pela operação real, com segregação de receitas para não pagar a mais no PGDAS-D.",
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
    texto: "Conferimos a situação fiscal, trabalhista e societária e os arquivos com o contador anterior.",
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
  { valor: `${site.indicadores.anosDeMercado}+`, rotulo: "anos de atuação" },
  { valor: `${site.indicadores.empresasAtendidas}+`, rotulo: "empresas atendidas" },
  { valor: `${site.indicadores.obrigacoesNoPrazo}%`, rotulo: "obrigações entregues no prazo" },
];

export default function ContabilFiscalTrabalhista() {
  return (
    <>
      <PageHero
        rotulo="Contábil, Fiscal e Trabalhista"
        titulo="A rotina da sua empresa em ordem, sem pagar imposto a mais."
        lead=""
      >
        <div className={estilos.heroAcoes}>
          <Botao
            href={whatsappLink("Olá! Quero entender como funciona a contabilidade recorrente da Greentax.")}
            externo
            porte="lg"
          >
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
          />
          <Grade colunas={3} className={`${p.gradeEspacada} ${p.espaco}`}>
            {beneficios.map((beneficio) => (
              <div key={beneficio.titulo} className={p.beneficio}>
                <span className={p.beneficioIcone}>
                  <beneficio.icone aria-hidden="true" size={32} strokeWidth={1.5} />
                </span>
                <h3>{beneficio.titulo}</h3>
                <p>{beneficio.texto}</p>
              </div>
            ))}
          </Grade>
        </Section>
      </Revelar>

      <Revelar>
        <Section fundo="papel2" className={estilos.apareceEsquerda}>
          <CabecalhoSecao
            rotulo="O que está incluso"
            titulo="A parte técnica, resumida para conferir"
            lead="Três frentes cobertas pelo trabalho de rotina: contábil, fiscal e trabalhista."
          />
          <Grade colunas={3} className={`${p.gradeEspacada} ${p.espaco}`}>
            {servicosRecorrentes.map((bloco) => (
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
              O escopo e o valor do serviço dependem do porte, da atividade e do
              enquadramento tributário da empresa. A proposta é montada depois de
              entendermos a realidade do negócio.
            </p>
          </div>
        </Section>
      </Revelar>

      <Revelar>
        <Section className={estilos.surgirTexto}>
          <CabecalhoSecao
            rotulo="Como funciona"
            titulo="Da conversa inicial à rotina no prazo"
          />
          <div className={p.passos}>
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
            rotulo="A Greentax"
            titulo="Números que acompanham o trabalho"
          />
          <div className={p.estatisticas}>
            {estatisticas.map((estatistica) => (
              <div key={estatistica.rotulo} className={p.estatistica}>
                <span className={p.estatisticaValor}>{estatistica.valor}</span>
                <span className={p.estatisticaRotulo}>{estatistica.rotulo}</span>
              </div>
            ))}
          </div>
          <p className={p.nota}>
            Planejamento tributário, recuperação de créditos e outros trabalhos
            específicos ficam na página de{" "}
            <Link href="/solucoes/consultoria-estrategica">
              Consultoria Estratégica
            </Link>
            .
          </p>
        </Section>
      </Revelar>

      <Revelar>
        <Section className={estilos.surgirTexto}>
          <CabecalhoSecao
            rotulo="Perguntas frequentes"
            titulo="Dúvidas comuns sobre a rotina"
          />
          <FAQ itens={faq} />
        </Section>
      </Revelar>
    </>
  );
}