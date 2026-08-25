/**
 * Conteúdo institucional do site, transcrito do documento
 * "Briefing de Criação + Copy Institucional — Site Greentax (v1.0)".
 *
 * A copy vive aqui, separada do layout, para que ajustes de texto não exijam
 * mexer em componentes.
 */

export type Solucao = {
  slug: string;
  titulo: string;
  resumo: string;
  href: string;
};

export const solucoesResumo: Solucao[] = [
  {
    slug: "contabil",
    titulo: "Contábil",
    resumo: "Escrituração, balanços e demonstrações no prazo certo.",
    href: "/solucoes/contabil-fiscal-trabalhista",
  },
  {
    slug: "fiscal",
    titulo: "Fiscal e Tributário",
    resumo: "Apuração de tributos com inteligência para pagar o que é justo.",
    href: "/solucoes/contabil-fiscal-trabalhista",
  },
  {
    slug: "trabalhista",
    titulo: "Trabalhista e Previdenciário",
    resumo: "Folha, encargos e obrigações sem dor de cabeça.",
    href: "/solucoes/contabil-fiscal-trabalhista",
  },
  {
    slug: "consultoria",
    titulo: "Consultoria Estratégica",
    resumo:
      "Planejamento tributário e recuperação de créditos para quem quer ir além da rotina.",
    href: "/solucoes/consultoria-estrategica",
  },
];

export const diferenciais = [
  {
    titulo: "Inteligência antes da burocracia",
    descricao:
      "Cumprir obrigações é o mínimo esperado. Nosso papel é gerar informação útil para decisões melhores.",
  },
  {
    titulo: "Relacionamento próximo",
    descricao:
      "Cada cliente é acompanhado de forma consultiva e transparente, não apenas nos prazos de entrega.",
  },
  {
    titulo: "Tecnologia que aproxima",
    descricao:
      "Soluções digitais que tornam a experiência mais simples e acessível, sem perder o atendimento humano.",
  },
  {
    titulo: "Planejamento para crescer",
    descricao:
      "Empresas sólidas crescem quando unem organização, estratégia e visão de longo prazo.",
  },
  {
    titulo: "Confiança construída diariamente",
    descricao:
      "Competência técnica, ética e consistência em cada entrega.",
  },
];

export const pilares = [
  {
    titulo: "Inteligência",
    descricao:
      "Utilizamos conhecimento técnico e análise para apoiar decisões mais seguras e estratégicas.",
  },
  {
    titulo: "Tecnologia",
    descricao:
      "A tecnologia simplifica processos, aproxima o cliente da informação e torna a experiência mais eficiente.",
  },
  {
    titulo: "Relacionamento",
    descricao:
      "Construímos relações de longo prazo baseadas em proximidade, confiança e transparência.",
  },
  {
    titulo: "Evolução",
    descricao:
      "Acompanhamos o crescimento dos nossos clientes, adaptando soluções às novas fases e desafios de cada negócio.",
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
