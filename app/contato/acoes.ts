"use server";

import { servicosInteresse } from "@/lib/conteudo";

export type DadosContato = {
  nome: string;
  empresa?: string;
  telefone: string;
  email: string;
  jaCliente: string;
  servico: string;
  mensagem?: string;
  consentimento: boolean;
  /** Honeypot: campo invisível que só um robô preenche. */
  website?: string;
};

export type Resultado =
  | { ok: true }
  | { ok: false; mensagem: string; campo?: keyof DadosContato };

const soDigitos = (v: string) => v.replace(/\D/g, "");

export async function enviarContato(dados: DadosContato): Promise<Resultado> {
  if (dados.website) return { ok: true }; // robô: finge sucesso e descarta

  // Revalidação no servidor — o React Hook Form já validou no cliente, mas
  // nunca se confia só nisso.
  if (!dados.nome || dados.nome.trim().length < 3)
    return { ok: false, mensagem: "Informe seu nome completo.", campo: "nome" };

  if (!/^\d{10,13}$/.test(soDigitos(dados.telefone ?? "")))
    return { ok: false, mensagem: "Informe um telefone com DDD.", campo: "telefone" };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(dados.email ?? ""))
    return { ok: false, mensagem: "Informe um e-mail válido.", campo: "email" };

  if (!servicosInteresse.includes(dados.servico as never))
    return { ok: false, mensagem: "Selecione o serviço de interesse.", campo: "servico" };

  if (!dados.consentimento)
    return {
      ok: false,
      mensagem: "É preciso concordar com o tratamento dos dados.",
      campo: "consentimento",
    };

  const lead = {
    nome: dados.nome.trim(),
    empresa: dados.empresa?.trim() ?? "",
    telefone: dados.telefone.trim(),
    email: dados.email.trim(),
    jaCliente: dados.jaCliente,
    servico: dados.servico,
    mensagem: dados.mensagem?.trim() ?? "",
    recebidoEm: new Date().toISOString(),
  };

  // ---------------------------------------------------------------------
  // ENTREGA DO LEAD — pendente de decisão da Greentax.
  //
  // Enquanto o CRM não for escolhido, defina CONTATO_WEBHOOK_URL no
  // .env.local apontando para um webhook (Zapier, Make, n8n, WhatsApp
  // Business API ou endpoint próprio) e o lead é entregue lá.
  //
  // Sem essa variável, o lead É APENAS REGISTRADO NO LOG DO SERVIDOR — na
  // prática, ele se perde. NÃO PUBLIQUE em produção sem configurar isso.
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
