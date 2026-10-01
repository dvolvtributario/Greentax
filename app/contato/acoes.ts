"use server";

import { headers } from "next/headers";
import { servicosInteresse } from "@/lib/conteudo";
import {
  ACAO_RECAPTCHA,
  PONTUACAO_MINIMA_RECAPTCHA,
  URL_RECAPTCHA_SITEVERIFY,
} from "@/lib/recaptcha";

export type DadosContato = {
  nome: string;
  empresa?: string;
  telefone: string;
  email: string;
  jaCliente: string;
  servico: string;
  mensagem?: string;
  consentimento: boolean;
  website?: string;
  recaptchaToken?: string;
};

export type Resultado =
  | { ok: true }
  | { ok: false; mensagem: string; campo?: keyof DadosContato };

const soDigitos = (v: string) => v.replace(/\D/g, "");

type RespostaSiteverify = {
  success?: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

// Fail-closed: sem secret, sem token, com erro de rede ou com resposta que
// não passe em success/action/score, o envio é recusado — o lead não sai.
async function verificarRecaptcha(
  token: string,
  ip?: string | null,
): Promise<{ ok: true; score?: number } | { ok: false; motivo: string }> {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) return { ok: false, motivo: "RECAPTCHA_SECRET não configurada" };
  if (!token) return { ok: false, motivo: "token ausente" };

  try {
    const corpo = new URLSearchParams({ secret, response: token });
    if (ip) corpo.set("remoteip", ip);

    const resposta = await fetch(URL_RECAPTCHA_SITEVERIFY, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: corpo,
      signal: AbortSignal.timeout(5000),
    });

    if (!resposta.ok) {
      return { ok: false, motivo: `siteverify respondeu ${resposta.status}` };
    }

    const dados = (await resposta.json()) as RespostaSiteverify;

    if (dados.success !== true) {
      const codigos = dados["error-codes"]?.join(", ") ?? "success=false";
      return { ok: false, motivo: `recusado (${codigos})` };
    }

    if (dados.action && dados.action !== ACAO_RECAPTCHA) {
      return { ok: false, motivo: `action divergente: ${dados.action}` };
    }

    if (
      typeof dados.score === "number" &&
      dados.score < PONTUACAO_MINIMA_RECAPTCHA
    ) {
      return {
        ok: false,
        motivo: `score ${dados.score} abaixo de ${PONTUACAO_MINIMA_RECAPTCHA}`,
      };
    }

    return { ok: true, score: dados.score };
  } catch (erro) {
    return {
      ok: false,
      motivo: `falha ao chamar o siteverify: ${
        erro instanceof Error ? erro.message : String(erro)
      }`,
    };
  }
}

export async function enviarContato(dados: DadosContato): Promise<Resultado> {
  // Um chamador malicioso pode invocar a action com argumentos fora do formato
  // esperado — nunca assumir tipos dos campos recebidos.
  if (!dados || typeof dados !== "object") {
    return { ok: false, mensagem: "Dados inválidos." };
  }

  if (String(dados.website ?? "")) return { ok: true }; // robô: finge sucesso e descarta

  const nome = String(dados.nome ?? "").trim();
  const empresa = String(dados.empresa ?? "").trim();
  const telefone = String(dados.telefone ?? "").trim();
  const email = String(dados.email ?? "").trim();
  const servico = String(dados.servico ?? "");
  const mensagem = String(dados.mensagem ?? "").trim();

  // Revalidação no servidor — o React Hook Form já validou no cliente, mas
  // nunca se confia só nisso.
  if (nome.length < 3)
    return { ok: false, mensagem: "Informe seu nome completo.", campo: "nome" };

  if (!/^\d{10,13}$/.test(soDigitos(telefone)))
    return { ok: false, mensagem: "Informe um telefone com DDD.", campo: "telefone" };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    return { ok: false, mensagem: "Informe um e-mail válido.", campo: "email" };

  if (!servicosInteresse.includes(servico as never))
    return { ok: false, mensagem: "Selecione o serviço de interesse.", campo: "servico" };

  if (dados.consentimento !== true)
    return {
      ok: false,
      mensagem: "É preciso concordar com o tratamento dos dados.",
      campo: "consentimento",
    };

  // Limites no servidor (o cliente já usa maxLength, mas não se confia nele).
  const limites: [keyof DadosContato, number][] = [
    ["nome", 100],
    ["empresa", 100],
    ["telefone", 50],
    ["email", 50],
    ["mensagem", 1000],
  ];
  const valores: Record<string, string> = { nome, empresa, telefone, email, mensagem };
  for (const [campo, max] of limites) {
    if (valores[campo].length > max)
      return {
        ok: false,
        mensagem: `O campo ${campo} deve ter no máximo ${max} caracteres.`,
        campo,
      };
  }

  // reCAPTCHA Enterprise — depois das validações baratas (a avaliação custa
  // dinheiro) e antes de qualquer entrega do lead.
  const cabecalhos = await headers();
  const ip =
    cabecalhos.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    cabecalhos.get("x-real-ip");

  const verificacao = await verificarRecaptcha(
    String(dados.recaptchaToken ?? "").trim(),
    ip,
  );

  if (!verificacao.ok) {
    console.warn(`[contato] reCAPTCHA recusado — ${verificacao.motivo}`);
    return {
      ok: false,
      mensagem:
        "Não foi possível confirmar que você é humano. Marque o campo “Não sou um robô” e tente novamente.",
    };
  }

  console.log("[contato] reCAPTCHA validado", { score: verificacao.score });

  const lead = {
    nome,
    empresa,
    telefone,
    email,
    jaCliente: String(dados.jaCliente ?? "") === "Sim",
    servico,
    mensagem,
    recebidoEm: new Date().toISOString(),
    // Prova do consentimento LGPD do formulário: vai junto com o lead
    // (webhook ou log do servidor), para registrar quando e que ele aceitou.
    consentimentoAceito: true,
    consentimentoEm: new Date().toISOString(),
  };

  // ---------------------------------------------------------------------
  // ENTREGA DO LEAD — via CONTATO_WEBHOOK_URL (.env.local e env do OnRender),
  // hoje apontando para o cenário do Make.com.
  //
  // Sem essa variável, o lead É APENAS REGISTRADO NO LOG DO SERVIDOR — na
  // prática, ele se perde.
  // ---------------------------------------------------------------------
  const webhook = process.env.CONTATO_WEBHOOK_URL;

  if (!webhook) {
    console.warn(
      "[contato] CONTATO_WEBHOOK_URL não configurada — lead só no log:",
      lead,
    );
    return { ok: true };
  }

  try {
    const resposta = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(10_000),
    });
    if (!resposta.ok) throw new Error(`Webhook respondeu ${resposta.status}`);
  } catch (erro) {
    console.error("[contato] falha ao entregar o lead:", erro);
    return {
      ok: false,
      mensagem:
        "Não conseguimos enviar sua solicitação agora. Tente novamente ou fale com a gente pelo WhatsApp.",
    };
  }

  return { ok: true };
}
