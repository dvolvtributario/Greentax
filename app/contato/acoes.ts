"use server";

import { servicosInteresse } from "@/lib/conteudo";

export type EstadoFormulario = {
  status: "inicial" | "sucesso" | "erro";
  mensagem: string;
  erros?: Record<string, string>;
};

export const estadoInicial: EstadoFormulario = {
  status: "inicial",
  mensagem: "",
};

const texto = (dados: FormData, campo: string) =>
  String(dados.get(campo) ?? "").trim();

export async function enviarContato(
  _anterior: EstadoFormulario,
  dados: FormData,
): Promise<EstadoFormulario> {
  // Honeypot: campo invisível que só um robô preenche.
  if (texto(dados, "website")) {
    return { status: "sucesso", mensagem: "Solicitação enviada." };
  }

  const lead = {
    nome: texto(dados, "nome"),
    empresa: texto(dados, "empresa"),
    telefone: texto(dados, "telefone"),
    email: texto(dados, "email"),
    jaCliente: texto(dados, "jaCliente"),
    servico: texto(dados, "servico"),
    mensagem: texto(dados, "mensagem"),
    consentimento: dados.get("consentimento") === "on",
    recebidoEm: new Date().toISOString(),
  };

  const erros: Record<string, string> = {};

  if (lead.nome.length < 3) erros.nome = "Informe seu nome completo.";
  if (!lead.telefone.replace(/\D/g, "").match(/^\d{10,13}$/))
    erros.telefone = "Informe um telefone com DDD.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email))
    erros.email = "Informe um e-mail válido.";
  if (!servicosInteresse.includes(lead.servico as never))
    erros.servico = "Selecione o serviço de interesse.";
  if (!lead.consentimento)
    erros.consentimento =
      "É preciso concordar com o tratamento dos dados para enviar.";

  if (Object.keys(erros).length > 0) {
    return {
      status: "erro",
      mensagem: "Confira os campos destacados e tente novamente.",
      erros,
    };
  }

  // ---------------------------------------------------------------------
  // ENTREGA DO LEAD — pendente de decisão da Greentax.
  //
  // Enquanto o CRM não for escolhido, basta definir CONTATO_WEBHOOK_URL no
  // .env.local apontando para um webhook (Zapier, Make, n8n, WhatsApp
  // Business API, ou um endpoint próprio) que o lead é entregue lá.
  //
  // Sem essa variável, o lead É APENAS REGISTRADO NO LOG DO SERVIDOR — ou
  // seja, na prática ele se perde. NÃO PUBLIQUE o site em produção sem
  // configurar esta entrega.
  // ---------------------------------------------------------------------
  const webhook = process.env.CONTATO_WEBHOOK_URL;

  if (webhook) {
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
        status: "erro",
        mensagem:
          "Não conseguimos enviar sua solicitação agora. Tente novamente ou fale com a gente pelo WhatsApp.",
      };
    }
  } else {
    console.warn(
      "[contato] CONTATO_WEBHOOK_URL não configurada — lead registrado apenas no log:",
      lead,
    );
  }

  return {
    status: "sucesso",
    mensagem:
      "Recebemos sua solicitação. Em breve entramos em contato com um diagnóstico inicial.",
  };
}
