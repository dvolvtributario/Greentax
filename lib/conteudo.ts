import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  Calculator,
  Cpu,
  Factory,
  Handshake,
  Lightbulb,
  Megaphone,
  ShoppingCart,
  Store,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";

export type Solucao = {
  slug: string;
  titulo: string;
  resumo: string;
  href: string;
  icone: LucideIcon;
  imagem?: {
    src: string;
    alt: string;
  };
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
    icone: Calculator,
    // IMAGEM PENDENTE - ainda em estado provisório. Trocar por uma foto
    // própria (ex.: demonstrações contábeis organizadas sobre a mesa).
    imagem: {
      src: "/marca/contabil-fiscal-trabalhista.jpg",
      alt: "Documentos contábeis em cima de uma mesa de trabalho",
    },
  },
  {
    slug: "fiscal",
    titulo: "Fiscal e Tributário",
    resumo: "Apuração de tributos com atenção ao enquadramento e às receitas da empresa.",
    href: "/solucoes/contabil-fiscal-trabalhista",
    icone: BookOpenCheck,
    // IMAGEM PENDENTE - ainda em estado provisório. Trocar por uma foto
    // própria (ex.: análise de documentos e guias de tributos).
    imagem: {
      src: "/marca/consultoria-planejamento.jpg",
      alt: "Análise de documentos e números para apuração de tributos",
    },
  },
  {
    slug: "trabalhista",
    titulo: "Trabalhista e Previdenciário",
    resumo: "Folha, encargos e obrigações com acompanhamento da rotina.",
    href: "/solucoes/contabil-fiscal-trabalhista",
    icone: BriefcaseBusiness,
    // IMAGEM PENDENTE - ainda em estado provisório. Trocar por uma foto
    // própria (ex.: folha de pagamento e processos de admissão).
    imagem: {
      src: "/marca/consultoria-transacao.jpg",
      alt: "Documentos trabalhistas e de pagamento de equipe",
    },
  },
  {
    slug: "consultoria",
    titulo: "Consultoria Estratégica",
    resumo:
      "Planejamento tributário e recuperação de créditos para situações que pedem uma análise específica.",
    href: "/solucoes/consultoria-estrategica",
    icone: Lightbulb,
    // IMAGEM PENDENTE - ainda em estado provisório. Trocar por uma foto
    // própria (ex.: reunião de definição de estratégia tributária).
    imagem: {
      src: "/marca/consultoria-estrategica.jpg",
      alt: "Reunião de consultoria estratégica com cliente",
    },
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
];

export type Nicho = {
  slug: string;
  titulo: string;
  tag: string;
  problema: string;
  atendimento: string;
  pontos: string[];
  icone: LucideIcon;
};

export const nichos: Nicho[] = [
  {
    slug: "prestador-de-servicos",
    titulo: "Prestador de Serviços",
    tag: "Serviços",
    icone: Handshake,
    problema:
      "Quem presta serviço emite nota, recebe com retenção e precisa provar o que fez. Sem controle por competência, o mês fecha com imposto a mais ou com guia esquecida.",
    atendimento:
      "Acompanhamos a emissão, as retenções e a escrituração mês a mês, para que o serviço prestado vire receita conferida e prazo cumprido.",
    pontos: [
      "Retenções de IRRF, ISS e INSS na fonte: quanto foi retido e onde compensar",
      "Classificação do serviço por CNAE e alíquota do ISS de cada município",
      "Regime tributário escolhido pelo faturamento real, não por estimativa",
    ],
  },
  {
    slug: "industria",
    titulo: "Indústria",
    tag: "Produção",
    icone: Factory,
    problema:
      "Estoque, insumos e tributos indiretos andam juntos. Um cálculo fora do lugar atrasa a apuração e come a margem sem que a operação perceba.",
    atendimento:
      "Conferimos a apuração com atenção ao estoque, aos créditos e às operações com substituição tributária, sempre pela escrituração real.",
    pontos: [
      "Substituição tributária e antecipação de ICMS nas entradas e saídas",
      "Créditos de PIS/COFINS sobre insumos, embalagens e frete",
      "Escrituração fiscal eletrônica e controle de estoque em dia",
    ],
  },
  {
    slug: "comercio",
    titulo: "Comércio",
    tag: "Vendas",
    icone: Store,
    problema:
      "Produto com NCM diferente, alíquota diferente e promoção o mês inteiro. O erro de classificação passa despercebido e aparece na fiscalização.",
    atendimento:
      "Separamos as receitas por operação e conferimos a classificação fiscal dos produtos antes que a pendência apareça.",
    pontos: [
      "Classificação fiscal do produto (NCM e CEST) e alíquota correta",
      "Produtos monofásicos e regras de substituição tributária",
      "ICMS-ST, DIFAL nas vendas para fora do estado e obrigações do SPED",
    ],
  },
  {
    slug: "e-commerces",
    titulo: "E-commerces",
    tag: "Vendas online",
    icone: ShoppingCart,
    problema:
      "Venda pelo site, marketplace e gateway: cada canal emite, retém e reporta de um jeito. O faturamento quase nunca chega como um número só.",
    atendimento:
      "Conciliamos os canais por competência e tratamos cada operação pelo destino da venda, com a nota emitida no momento certo.",
    pontos: [
      "ICMS nas vendas interestaduais para o consumidor final e o DIFAL",
      "Taxas e retenções de marketplace e gateway conciliadas com a nota",
      "Obrigações acessórias digitais entregues no prazo",
    ],
  },
  {
    slug: "gestor-de-trafego",
    titulo: "Gestor de Tráfego",
    tag: "Marketing digital",
    icone: Target,
    problema:
      "A agência atende cliente de outro estado ou do exterior, recebe por plataforma e assina contrato digital. Sem entender a operação, o enquadramento sai errado.",
    atendimento:
      "Organizamos contratos, notas e recebimentos por cliente para que cada pagamento seja entendido antes de apurar.",
    pontos: [
      "ISS e retenções conforme o município do cliente e o tipo de serviço",
      "Receita de clientes fora do país: câmbio, documentação e apuração",
      "Pró-labore, distribuição de lucros e obrigações da folha",
    ],
  },
  {
    slug: "mei",
    titulo: "MEI",
    tag: "Pequeno negócio",
    icone: Wallet,
    problema:
      "O MEI é simples até o faturamento crescer, chegar um empregado ou a atividade não estar entre as permitidas. Aí a guia mensal deixa de ser a certa.",
    atendimento:
      "Acompanhamos o limite e o momento de migrar para ME, sem perder prazo nem descobrir a situação quando a fiscalização chegar.",
    pontos: [
      "Limite de faturamento do MEI e o que fazer em caso de excesso",
      "Atividades permitidas e vedadas, e a regra do MEI com empregado",
      "Migração de MEI para ME no Simples: prazos e comunicações aos órgãos",
    ],
  },
  {
    slug: "criador-de-conteudo",
    titulo: "Criador(a) de Conteúdo",
    tag: "Criadores",
    icone: Megaphone,
    problema:
      "Publicidade, marca, publi e plataforma pagam de formas diferentes, e quase nada chega como salário. Sem nota e sem controle, a receita vira confusão no fechamento.",
    atendimento:
      "Mapeamos cada fonte de receita, emitimos as notas e mostramos quanto entrou, quanto foi retido e quanto sobra.",
    pontos: [
      "Retenções de IRRF e ISS por cliente, plataforma e verba de publicidade",
      "Relação entre PJ e contrato com marca ou agência, sem risco trabalhista",
      "Receita vinda do exterior e o que declarar em cada competência",
    ],
  },
];

export const servicosInteresse = [
  "Contábil, Fiscal e Trabalhista",
  "Consultoria Estratégica",
  "Pessoa Física (Imposto de Renda)",
  "Ainda não sei",
] as const;
