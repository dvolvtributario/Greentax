/**
 * Fonte única de verdade para os dados institucionais da Greentax.
 *
 * Tudo que aparece em mais de uma página do site vem daqui. Para trocar um
 * telefone, um endereço ou uma rede social, altere APENAS este arquivo.
 *
 * Campos marcados como `null` são lacunas conhecidas, ainda pendentes de
 * informação da Greentax. Os componentes tratam `null` como "não renderizar"
 * ou como bloco a preencher — nada quebra enquanto o dado não chega.
 */

export const site = {
  nome: "Greentax",
  razaoSocial: "GREENTAX CONTABILIDADE E ASSESSORIA EMPRESARIAL LTDA",
  assinatura: "Contabilidade e Assessoria Empresarial",
  cnpj: "37.026.778/0001-80",

  /** Ajuste para o domínio definitivo antes de publicar. */
  url: "https://www.greentax.com.br",

  conceito: "Contabilidade que acompanha a evolução da sua empresa.",
  promessa:
    "Você cuida do crescimento do seu negócio. Nós cuidamos da inteligência contábil, fiscal e tributária que sustenta esse crescimento.",
  descricao:
    "Contabilidade consultiva em Araçatuba/SP. Vamos além do cumprimento das obrigações fiscais e contábeis: atuamos como parceiros estratégicos de empresas que buscam crescer com organização, segurança e inteligência na tomada de decisões.",

  endereco: {
    logradouro: "Avenida Brasília, 2121",
    complemento: "Edifício New York Tower, 13º andar — Sala 1315",
    bairro: "Jardim Nova Yorque",
    cidade: "Araçatuba",
    estado: "SP",
    cep: "16018-000",
    pais: "BR",
  },

  contato: {
    whatsappNumero: "5518997506584",
    whatsappExibicao: "(18) 99750-6584",
    email: null as string | null,
  },

  redes: [
    {
      nome: "Instagram",
      url: "https://www.instagram.com/grenntax.contabilidade",
    },
  ],

  /**
   * PENDENTE: números de prova social.
   * O briefing é explícito — não usar dados fictícios. Enquanto forem `null`,
   * a seção de indicadores da Home renderiza um bloco "a preencher".
   */
  indicadores: {
    empresasAtendidas: null as number | null,
    anosDeMercado: null as number | null,
    obrigacoesNoPrazo: null as number | null,
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
