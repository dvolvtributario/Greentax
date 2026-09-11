import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  Calculator,
  HandCoins,
  Handshake,
  Lightbulb,
  MessagesSquare,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CabecalhoSecao, Grade, Section } from "@/components/ui/Section";
import { Revelar } from "@/components/ui/Revelar";
import { Botao } from "@/components/ui/Button";
import { FAQ } from "@/components/sections/FAQ";
import { Seta, Whatsapp } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/site";
import p from "@/app/paginas.module.css";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Da escrituração e dos tributos no prazo ao planejamento tributário e à recuperação de créditos: soluções contábeis, fiscais, trabalhistas e de consultoria para a sua empresa.",
  alternates: { canonical: "/solucoes" },
};

const rotina = [
  {
    icone: BookOpenCheck,
    titulo: "Escrituração sempre em dia",
    texto: "Balancetes, balanço e demonstrações na lei, sem atraso nem surpresa.",
  },
  {
    icone: Calculator,
    titulo: "Impostos no valor certo",
    texto: "Apuração com o enquadramento e as receitas reais, sem pagar a mais no PGDAS-D.",
  },
  {
    icone: BriefcaseBusiness,
    titulo: "Folha de pagamento sem susto",
    texto: "Folha, pró-labore, eSocial e EFD-Reinf processados e transmitidos no prazo.",
  },
  {
    icone: TrendingUp,
    titulo: "Relatórios que você entende",
    texto: "Informações mensais em linguagem comum, para acompanhar o resultado sem termos técnicos.",
  },
  {
    icone: MessagesSquare,
    titulo: "Dúvidas respondidas no dia a dia",
    texto: "Alguém que conhece a sua empresa para conversar antes de tomar decisão.",
  },
  {
    icone: BadgeCheck,
    titulo: "Obrigações acessórias entregues",
    texto: "DEFIS, PGDAS-D e DCTFWeb no prazo, sem multa e sem atraso.",
  },
];

const sobDemanda = [
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
    texto: "Débitos com a União, estado e município renegociados em condições que cabem no caixa.",
  },
  {
    icone: ShieldCheck,
    titulo: "Defesa em fiscalizações",
    texto: "Resposta técnica, organizada e no prazo para intimações e fiscalizações.",
  },
  {
    icone: Building2,
    titulo: "Abertura e serviços societários",
    texto: "Empresa aberta, contratos em dia e registros em órgãos de classe resolvidos.",
  },
  {
    icone: PiggyBank,
    titulo: "Imposto de Renda (pessoa física)",
    texto: "Declaração para sócios e clientes das empresas atendidas.",
  },
];

const faq = [
  {
    pergunta: "Como sei se preciso da rotina ou da consultoria?",
    resposta:
      "A rotina cuida do que acontece todos os meses: escrituração, tributos, folha e obrigações no prazo. A consultoria entra quando surge uma questão específica, como uma fiscalização, um plano tributário ou créditos a recuperar. Se a empresa ainda não tem a parte contábil organizada, o caminho natural é começar pela rotina.",
  },
  {
    pergunta: "E se eu precisar das duas ao mesmo tempo?",
    resposta:
      "É mais comum do que parece. Uma fiscalização, por exemplo, pode chegar num momento em que a rotina também precisa continuar. Nesses casos as duas frentes andam juntas, com a mesma equipe e sem abrir mão de prazos.",
  },
  {
    pergunta: "Como começa o trabalho?",
    resposta:
      "Com uma conversa para entender a empresa: atividade, porte, regime tributário e o momento atual. A partir dela montamos o plano, seja para assumir a rotina, seja para desenhar um trabalho de consultoria específico.",
  },
  {
    pergunta: "Ficar sem contador durante a troca é um risco?",
    resposta:
      "Não. A transição é conduzida para que nenhuma obrigação fique descoberta: pedimos os arquivos ao contador anterior, conferimos a situação fiscal e societária e assumimos a partir da competência combinada.",
  },
];

export default function Solucoes() {
  return (
    <>
      <PageHero
        rotulo="Soluções"
        titulo="Contabilidade para o dia a dia e para a estratégia do seu negócio."
        lead=""
        imagem={{
          src: "/marca/hero-solucoes.jpg",
          alt: "",
        }}
      >
        <div className={estilos.heroAcoes}>
          <Botao
            href={whatsappLink("Olá! Quero entender qual solução a Greentax recomenda para a minha empresa.")}
            externo
            porte="lg"
          >
            <Whatsapp className={p.iconeBotao} />
            Quero conversar
          </Botao>
          <Botao href="#solucoes" variante="contorno" porte="lg">
            Ver todas as soluções
          </Botao>
        </div>
      </PageHero>

      <Revelar>
        <Section id="solucoes" className={estilos.surgirTexto}>
          <CabecalhoSecao
            rotulo="Nossas soluções"
            titulo="Tudo o que fazemos pelo seu negócio, em um só lugar"
            lead="Da rotina mensal às situações específicas, você encontra aqui o serviço certo para cada momento da empresa."
          />

          <h3 className={`${p.subtitulo} ${p.grupoTitulo}`}>Rotina da empresa</h3>
          <Grade colunas={3} className={p.gradeEspacada}>
            {rotina.map((item) => (
              <Link key={item.titulo} href="/solucoes/contabil-fiscal-trabalhista" className={p.beneficio}>
                <span className={p.beneficioIcone}>
                  <item.icone aria-hidden="true" size={32} strokeWidth={1.5} />
                </span>
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
                <span className={p.beneficioAcao}>
                  Ver detalhes
                  <Seta />
                </span>
              </Link>
            ))}
          </Grade>

          <h3 className={`${p.subtitulo} ${p.grupoTitulo}`}>Sob demanda</h3>
          <Grade colunas={3} className={p.gradeEspacada}>
            {sobDemanda.map((item) => (
              <Link key={item.titulo} href="/solucoes/consultoria-estrategica" className={p.beneficio}>
                <span className={p.beneficioIcone}>
                  <item.icone aria-hidden="true" size={32} strokeWidth={1.5} />
                </span>
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
                <span className={p.beneficioAcao}>
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
            rotulo="Perguntas frequentes"
            titulo="Dúvidas de quem está decidindo"
          />
          <FAQ itens={faq} />
        </Section>
      </Revelar>
    </>
  );
}