"use server";

import { cookies } from "next/headers";
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
    return { necessarios: true, analise: true, marketing: true };
  }

  if (operacao === "personalizar") {
    return {
      necessarios: true,
      analise: formData.get("analise") === "sim",
      marketing: formData.get("marketing") === "sim",
    };
  }

  // "recusar" e qualquer valor inesperado caem aqui: só o necessário.
  return { ...PREFERENCIAS_PADRAO };
}

async function registrarProva(registro: Record<string, unknown>): Promise<void> {
  // Prova mínima sempre disponível nas logs do servidor.
  console.log("[consentimento]", JSON.stringify(registro));

  const webhook = process.env.CONSENT_WEBHOOK_URL;
  if (!webhook) return;

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registro),
      signal: AbortSignal.timeout(5000),
    });
  } catch (erro) {
    // A prova complementar é opcional: a falha nunca bloqueia o visitante.
    console.error("[consentimento] falha ao enviar prova ao webhook:", erro);
  }
}

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

  const armario = await cookies();
  armario.set(COOKIE_CONSENTIMENTO, serializarPreferencias(preferencias), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: DURACAO_CONSENTIMENTO,
    path: "/",
  });

  await registrarProva({
    versao: VERSAO_POLITICA,
    categorias: preferencias,
    aceitoEm,
    origem,
  });

  return { ok: true, preferencias };
}
