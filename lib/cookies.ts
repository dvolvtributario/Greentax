/**
 * Fonte única de verdade sobre cookies do site.
 *
 * Tudo que for adicionado no futuro (GA4, Meta Pixel…) entra em
 * `scriptsPorCategoria` e na tabela da política de privacidade.
 */

export type Categoria = "necessarios" | "analise" | "marketing";

export type Preferencias = Record<Categoria, boolean>;

export type ScriptConsentido = {
  /** Identificador único (usado como key do React). */
  id: string;
  src: string;
  categoria: Exclude<Categoria, "necessarios">;
};

/** Nome do cookie que guarda a escolha do visitante. */
export const COOKIE_CONSENTIMENTO = "greentax_consent";

/** Validade do consentimento: 12 meses. */
export const DURACAO_CONSENTIMENTO = 60 * 60 * 24 * 365;

/**
 * Versão da lista de cookies. Ao mudar qualquer coisa nesta página,
 * incremente — todo mundo é consultado de novo.
 */
export const VERSAO_POLITICA = "2026-09-1";

export const PREFERENCIAS_PADRAO: Preferencias = {
  necessarios: true,
  analise: false,
  marketing: false,
};

export type CategoriaInfo = {
  id: Categoria;
  titulo: string;
  descricao: string;
  cookies: string[];
  /** Necessários são sempre ativos e não podem ser desligados. */
  obrigatoria: boolean;
};

export const CATEGORIAS: CategoriaInfo[] = [
  {
    id: "necessarios",
    titulo: "Necessários",
    descricao:
      "Essenciais para o site funcionar: registro da sua escolha de cookies. Sempre ativos, não pedem consentimento.",
    cookies: ["greentax_consent"],
    obrigatoria: true,
  },
  {
    id: "analise",
    titulo: "Análise",
    descricao:
      "Medem como o site é usado — páginas vistas, origem do tráfego — de forma agregada. Nenhuma ferramenta está ativa hoje; quando houver, só carrega depois do seu aceite.",
    cookies: [],
    obrigatoria: false,
  },
  {
    id: "marketing",
    titulo: "Marketing",
    descricao:
      "Publicidade e remarketing, como o Meta Pixel. Nenhuma ferramenta está ativa hoje; quando houver, só carrega depois do seu aceite.",
    cookies: [],
    obrigatoria: false,
  },
];

/**
 * Scripts de terceiros por categoria. Enquanto as listas estiverem
 * vazias, nenhum script externo é injetado — o gate já está pronto.
 *
 * Exemplo ao ativar o GA4:
 *   { id: "ga4", src: "https://www.googletagmanager.com/gtag/js?id=G-XXXX", categoria: "analise" }
 */
export const scriptsPorCategoria: Record<
  Exclude<Categoria, "necessarios">,
  ScriptConsentido[]
> = {
  analise: [],
  marketing: [],
};

/**
 * Serializa as preferências para o cookie.
 *
 * O `cookies().set()` do Next já aplica `encodeURIComponent` na gravação e
 * `decodeURIComponent` na leitura — por isso aqui vai o JSON puro: codificar
 * duas vezes faria o banner reaparecer a cada visita.
 */
export function serializarPreferencias(preferencias: Preferencias): string {
  return JSON.stringify({
    v: VERSAO_POLITICA,
    c: preferencias,
    t: new Date().toISOString(),
  });
}

function interpretarValor(valor: string): string {
  // No servidor o valor chega decodificado; no navegador, via document.cookie,
  // ele vem codificado. Nos dois casos o parse abaixo precisa encontrar JSON.
  if (valor.trimStart().startsWith("{")) return valor;

  try {
    return decodeURIComponent(valor);
  } catch {
    return valor;
  }
}

/**
 * Lê o cookie de consentimento. Retorna `null` quando não existe,
 * está corrompido ou foi emitido para uma versão antiga da política —
 * nesses casos o banner volta a aparecer.
 */
export function analisarPreferencias(
  valor: string | undefined | null,
): { preferencias: Preferencias; versao: string } | null {
  if (!valor) return null;

  try {
    const bruto = JSON.parse(interpretarValor(valor)) as {
      v?: unknown;
      c?: Partial<Preferencias>;
    };

    if (bruto.v !== VERSAO_POLITICA) return null;
    if (!bruto.c || typeof bruto.c !== "object") return null;

    return {
      preferencias: {
        necessarios: true,
        analise: bruto.c.analise === true,
        marketing: bruto.c.marketing === true,
      },
      versao: String(bruto.v),
    };
  } catch {
    return null;
  }
}

/** Lê o cookie direto no navegador (client components). */
export function lerPreferenciasNoNavegador(): Preferencias | null {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((linha) => linha.startsWith(`${COOKIE_CONSENTIMENTO}=`));

  if (!cookie) return null;

  return analisarPreferencias(cookie.slice(COOKIE_CONSENTIMENTO.length + 1))
    ?.preferencias ?? null;
}

/** Evento disparado quando as preferências mudam (banner → demais componentes). */
export const EVENTO_CONSENTIMENTO = "greentax:consentimento-alterado";

/** Evento disparado pelo rodapé para reabrir o centro de preferências. */
export const EVENTO_ABRIR_PREFERENCIAS = "greentax:abrir-preferencias";
