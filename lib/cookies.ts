export type Categoria =
  | "necessarios"
  | "analise"
  | "marketing"
  | "terceiros";

export type Preferencias = Record<Categoria, boolean>;

export type ScriptConsentido = {
  id: string;
  src: string;
  categoria: Exclude<Categoria, "necessarios">;
};

export const COOKIE_CONSENTIMENTO = "greentax_consent";

export const DURACAO_CONSENTIMENTO = 60 * 60 * 24 * 365;

export const VERSAO_POLITICA = "2026-09-2";

export const PREFERENCIAS_PADRAO: Preferencias = {
  necessarios: true,
  analise: false,
  marketing: false,
  terceiros: false,
};

export type CategoriaInfo = {
  id: Categoria;
  titulo: string;
  descricao: string;
  cookies: string[];
  obrigatoria: boolean;
};

export const CATEGORIAS: CategoriaInfo[] = [
  {
    id: "necessarios",
    titulo: "Necessários",
    descricao:
      "Essenciais para o site funcionar: registro da sua escolha de cookies e proteção anti-spam do formulário de contato. Sempre ativos, não pedem consentimento.",
    cookies: ["greentax_consent", "_GRECAPTCHA (Google, no formulário de contato)"],
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
  {
    id: "terceiros",
    titulo: "Conteúdo de terceiros",
    descricao:
      "Conteúdos incorporados de outros sites, como o mapa da Google na página de contato. Sem o seu aceite, o mapa só é carregado se você clicar em carregar.",
    cookies: ["Definidos pela Google ao carregar o mapa (ex.: NID)"],
    obrigatoria: false,
  },
];

export const scriptsPorCategoria: Record<
  Exclude<Categoria, "necessarios">,
  ScriptConsentido[]
> = {
  analise: [],
  marketing: [],
  terceiros: [],
};

export function serializarPreferencias(
  preferencias: Preferencias,
  origem?: string,
): string {
  return JSON.stringify({
    v: VERSAO_POLITICA,
    c: preferencias,
    t: new Date().toISOString(),
    ...(origem ? { o: origem } : {}),
  });
}

function interpretarValor(valor: string): string {

  if (valor.trimStart().startsWith("{")) return valor;

  try {
    return decodeURIComponent(valor);
  } catch {
    return valor;
  }
}

export function analisarPreferencias(
  valor: string | undefined | null,
): { preferencias: Preferencias; versao: string; origem?: string } | null {
  if (!valor) return null;

  try {
    const bruto = JSON.parse(interpretarValor(valor)) as {
      v?: unknown;
      c?: Partial<Preferencias>;
      o?: unknown;
    };

    if (bruto.v !== VERSAO_POLITICA) return null;
    if (!bruto.c || typeof bruto.c !== "object") return null;

    return {
      preferencias: {
        necessarios: true,
        analise: bruto.c.analise === true,
        marketing: bruto.c.marketing === true,
        terceiros: bruto.c.terceiros === true,
      },
      versao: String(bruto.v),
      ...(typeof bruto.o === "string" ? { origem: bruto.o } : {}),
    };
  } catch {
    return null;
  }
}

export function lerPreferenciasNoNavegador(): Preferencias | null {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((linha) => linha.startsWith(`${COOKIE_CONSENTIMENTO}=`));

  if (!cookie) return null;

  return analisarPreferencias(cookie.slice(COOKIE_CONSENTIMENTO.length + 1))
    ?.preferencias ?? null;
}

export const EVENTO_CONSENTIMENTO = "greentax:consentimento-alterado";

export const EVENTO_ABRIR_PREFERENCIAS = "greentax:abrir-preferencias";
