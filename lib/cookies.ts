export type Categoria = "necessarios" | "analise";

export type Preferencias = Record<Categoria, boolean>;

export type ScriptConsentido = {
  id: string;
  /** URL do script externo. Pode ser omitido se houver apenas código inline. */
  src?: string;
  /** Código JavaScript inline (executado depois do src, se houver). */
  codigo?: string;
  categoria: Exclude<Categoria, "necessarios">;
};

export const COOKIE_CONSENTIMENTO = "greentax_consent";

export const DURACAO_CONSENTIMENTO = 60 * 60 * 24 * 365;

export const VERSAO_POLITICA = "2026-10-1";

export const PREFERENCIAS_PADRAO: Preferencias = {
  necessarios: true,
  analise: false,
};

export type CategoriaInfo = {
  id: Categoria;
  titulo: string;
  descricao: string;
  obrigatoria: boolean;
};

export const CATEGORIAS: CategoriaInfo[] = [
  {
    id: "necessarios",
    titulo: "Necessários",
    descricao:
      "Essenciais para o site funcionar: registro da sua escolha de cookies e proteção anti-spam do formulário de contato. Sempre ativos, não pedem consentimento.",
    obrigatoria: true,
  },
  {
    id: "analise",
    titulo: "Análise",
    descricao:
      "Medem como o site é usado como páginas vistas e origem do tráfego de forma agregada. Usamos o Google Analytics, só carrega depois do seu aceite.",
    obrigatoria: false,
  },
];

export const GA_ID = "G-J0LPGRNEGG";

export const scriptsPorCategoria: Record<
  Exclude<Categoria, "necessarios">,
  ScriptConsentido[]
> = {
  analise: [
    {
      id: "ga4",
      src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
      codigo: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `,
      categoria: "analise",
    },
  ],
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
