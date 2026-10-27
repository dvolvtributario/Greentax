export const site = {
  nome: "Greentax",
  razaoSocial: "GREENTAX CONTABILIDADE E ASSESSORIA EMPRESARIAL LTDA",
  assinatura: "Contabilidade e Assessoria Empresarial",
  cnpj: "37.026.778/0001-80",

  url: "https://greentaxcontabilidade.com.br",

  conceito: "Contabilidade para quem precisa entender o próprio negócio.",
  promessa:
    "Você cuida da operação. A Greentax acompanha os números, os tributos e as obrigações para que as decisões do dia a dia tenham informação confiável por trás.",
  descricao:
    "A Greentax presta serviços contábeis, fiscais e trabalhistas em Araçatuba/SP, com atendimento próximo e foco em informação útil para a gestão. O trabalho combina rotina, análise tributária e orientação para as decisões da empresa.",

  endereco: {
    logradouro: "Avenida Brasília, 2121",
    complemento: "Edifício New York Tower, 13º andar — Sala 1314",
    bairro: "Jardim Nova Yorque",
    cidade: "Araçatuba",
    estado: "SP",
    cep: "16018-000",
    pais: "BR",
  },

  contato: {
    whatsappNumero: "5518997506584",
    whatsappExibicao: "(18) 99750-6584",
    email: "comercial@greentaxcontabilidade.com.br",
  },

  redes: [
    {
      nome: "Instagram",
      url: "https://www.instagram.com/grenntax.contabilidade",
    },
  ],

  indicadores: {
    empresasAtendidas: 50,
    anosDeMercado: 5,
    obrigacoesNoPrazo: 100,
  },
} as const;

export const navegacao = [
  { titulo: "Quem Somos", href: "/quem-somos" },
  { titulo: "Soluções", href: "/solucoes" },
  { titulo: "Diferenciais", href: "/diferenciais" },
  { titulo: "Nichos", href: "/nichos" },
  { titulo: "Blog", href: "/blog" },
  { titulo: "Contato", href: "/contato" },
  { titulo: "Área do Cliente", href: "/area-do-cliente" },
] as const;

export const whatsappLink = (mensagem?: string) => {
  const base = `https://wa.me/${site.contato.whatsappNumero}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
};

export const enderecoLinhaUnica = [
  site.endereco.logradouro,
  site.endereco.complemento,
  site.endereco.bairro,
  `${site.endereco.cidade}/${site.endereco.estado}`,
]
  .filter(Boolean)
  .join(" — ");
