import type { LucideIcon } from "lucide-react";
import { BrainCircuit, Cpu, Handshake, TrendingUp } from "lucide-react";

export type Solucao = {
  slug: string;
  titulo: string;
  resumo: string;
  href: string;
};

export type Pilar = {
  titulo: string;
  descricao: string;
  icone: LucideIcon;
  imagem?: {
    src: string;
    alt: string;
  };
};

export const solucoesResumo: Solucao[] = [
  {
    slug: "contabil",
    titulo: "Contábil",
    resumo: "Escrituração, balanços e demonstrações acompanhados de perto.",
    href: "/solucoes/contabil-fiscal-trabalhista",
  },
  {
    slug: "fiscal",
    titulo: "Fiscal e Tributário",
    resumo: "Apuração de tributos com atenção ao enquadramento e às receitas da empresa.",
    href: "/solucoes/contabil-fiscal-trabalhista",
  },
  {
    slug: "trabalhista",
    titulo: "Trabalhista e Previdenciário",
    resumo: "Folha, encargos e obrigações com acompanhamento da rotina.",
    href: "/solucoes/contabil-fiscal-trabalhista",
  },
  {
    slug: "consultoria",
    titulo: "Consultoria Estratégica",
    resumo:
      "Planejamento tributário e recuperação de créditos para situações que pedem uma análise específica.",
    href: "/solucoes/consultoria-estrategica",
  },
];

export const diferenciais = [
  {
    titulo: "Informação antes da burocracia",
    descricao:
      "A rotina precisa estar em ordem. A partir dela, organizamos os números para que você consiga enxergar o que está acontecendo na empresa.",
  },
  {
    titulo: "Conversa que acompanha a rotina",
    descricao:
      "Você fala com quem conhece o trabalho da sua empresa e entende o contexto antes de responder uma dúvida ou orientar uma decisão.",
  },
  {
    titulo: "Tecnologia no lugar certo",
    descricao:
      "Ferramentas digitais ajudam a acompanhar documentos, prazos e informações sem transformar o atendimento em uma sequência de telas e senhas.",
  },
  {
    titulo: "Tributos tratados como parte da gestão",
    descricao:
      "O enquadramento tributário, as receitas e a operação precisam conversar. A análise serve para encontrar alternativas dentro da lei.",
  },
  {
    titulo: "Confiança construída no trabalho diário",
    descricao:
      "Prazo cumprido, informação conferida e resposta clara. É assim que uma relação profissional ganha consistência.",
  },
];

export const pilares: Pilar[] = [
  {
    titulo: "Inteligência",
    icone: BrainCircuit,
    descricao:
      "Conhecimento técnico e leitura dos números para apoiar decisões com informação que faça sentido para a empresa.",
  },
  {
    titulo: "Tecnologia",
    icone: Cpu,
    descricao:
      "Recursos digitais para reduzir tarefas manuais, facilitar o acesso aos dados e deixar a comunicação mais simples.",
  },
  {
    titulo: "Relacionamento",
    icone: Handshake,
    descricao:
      "Atendimento próximo, com espaço para entender o negócio, explicar os caminhos e acompanhar o que foi combinado.",
  },
  {
    titulo: "Evolução",
    icone: TrendingUp,
    descricao:
      "A estrutura da empresa muda com o tempo. O atendimento acompanha essas mudanças e revê as necessidades de cada fase.",
  },
];

export const servicosRecorrentes = [
  {
    titulo: "Área Contábil",
    itens: [
      "Escrituração contábil regular, conforme a legislação vigente",
      "Balancetes, balanço patrimonial e demonstrações contábeis obrigatórias",
      "Apuração de resultados e encerramento de exercícios",
      "Atendimento a fiscalizações e intimações contábeis, quando previamente comunicadas",
      "Entrega das obrigações acessórias contábeis (DEFIS anual)",
    ],
  },
  {
    titulo: "Área Fiscal e Tributária",
    itens: [
      "Escrituração dos livros fiscais exigidos por lei",
      "Apuração de tributos federais, estaduais e municipais, com análise de segregação de receitas para otimização do PGDAS-D",
      "Emissão de guias de recolhimento de impostos e taxas",
      "Entrega das obrigações acessórias fiscais (PGDAS-D e DCTFWeb)",
      "Orientação tributária de rotina para empresas do Simples Nacional",
      "Declaração de faturamento, com atualização trimestral",
    ],
  },
  {
    titulo: "Área Trabalhista e Previdenciária",
    itens: [
      "Folha de pagamento e recibos de pró-labore",
      "Cálculo de encargos sociais, trabalhistas e provisões",
      "Transmissão de obrigações acessórias (eSocial e EFD-Reinf)",
      "Processamento de admissões, rescisões e férias",
    ],
  },
];

export const servicosConsultoria = [
  {
    titulo: "Societário",
    itens: [
      "Abertura de empresa",
      "Alteração contratual e consolidação",
      "Distrato social e encerramento",
      "Inscrição e alteração em órgãos de classe (CRM, CREA, OAB e outros)",
      "Transformação de MEI para ME",
    ],
  },
  {
    titulo: "Fiscal e Tributário estratégico",
    itens: [
      "Planejamento e estratégias tributárias sob medida",
      "Levantamento e recuperação de créditos tributários",
      "Adesão a transações tributárias federais, estaduais e municipais",
      "Parcelamento de débitos",
      "Elaboração de PER/DCOMP",
      "Suporte em fiscalizações e perícias",
      "Declaração de Imposto de Renda (pessoa física), para clientes e sócios das empresas atendidas",
    ],
  },
  {
    titulo: "Recursos Humanos",
    itens: [
      "Cadastro de empregado doméstico",
      "Suporte no preenchimento de cadastros bancários para captação de recursos e abertura de contas",
    ],
  },
];

export const servicosInteresse = [
  "Contábil, Fiscal e Trabalhista",
  "Consultoria Estratégica",
  "Pessoa Física (Imposto de Renda)",
  "Ainda não sei",
] as const;
