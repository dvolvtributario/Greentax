import {
  COOKIE_CONSENTIMENTO,
  DURACAO_CONSENTIMENTO,
  PREFERENCIAS_PADRAO,
  VERSAO_POLITICA,
  serializarPreferencias,
  type Preferencias,
} from "@/lib/cookies";

export type EstadoConsentimento = {
  ok: boolean;
  preferencias?: Preferencias;
  erro?: string;
};

const ORIGENS = ["banner", "rodape"] as const;

type Origem = (typeof ORIGENS)[number];

function interpretar(formData: FormData): Preferencias {
  const operacao = String(formData.get("operacao") ?? "");

  if (operacao === "aceitar") {
    return { necessarios: true, analise: true, marketing: true, terceiros: true };
  }

  if (operacao === "personalizar") {
    return {
      necessarios: true,
      analise: formData.get("analise") === "sim",
      marketing: formData.get("marketing") === "sim",
      terceiros: formData.get("terceiros") === "sim",
    };
  }

  return { ...PREFERENCIAS_PADRAO };
}

async function registrarProva(registro: Record<string, unknown>): Promise<void> {
  console.log("[consentimento]", JSON.stringify(registro));

  const webhook = process.env.NEXT_PUBLIC_CONSENT_WEBHOOK_URL;
  if (!webhook) return;

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registro),
      signal: AbortSignal.timeout(5000),
    });
  } catch (erro) {
    console.error("[consentimento] falha ao enviar prova ao webhook:", erro);
  }
}

// O site é estático (GitHub Pages): o cookie é gravado no próprio navegador
// (a versão de servidor usava o mesmo valor, httpOnly: false) e a prova vai
// para o webhook definido em NEXT_PUBLIC_CONSENT_WEBHOOK_URL.
export async function salvarPreferencias(
  _estadoAnterior: EstadoConsentimento,
  formData: FormData,
): Promise<EstadoConsentimento> {
  const preferencias = interpretar(formData);

  const origemBruto = String(formData.get("origem") ?? "banner");
  const origem: Origem = ORIGENS.includes(origemBruto as Origem)
    ? (origemBruto as Origem)
    : "banner";

  const aceitoEm = new Date().toISOString();

  document.cookie = [
    `${COOKIE_CONSENTIMENTO}=${encodeURIComponent(serializarPreferencias(preferencias, origem))}`,
    "path=/",
    `max-age=${DURACAO_CONSENTIMENTO}`,
    "SameSite=Lax",
    ...(location.protocol === "https:" ? ["Secure"] : []),
  ].join("; ");

  await registrarProva({
    versao: VERSAO_POLITICA,
    categorias: preferencias,
    aceitoEm,
    origem,
  });

  return { ok: true, preferencias };
}
