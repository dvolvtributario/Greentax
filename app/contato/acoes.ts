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
  website?: string;
  recaptchaToken?: string;
};

export type Resultado =
  | { ok: true }
  | { ok: false; mensagem: string; campo?: keyof DadosContato };

const soDigitos = (v: string) => v.replace(/\D/g, "");

const MENSAGEM_FALHA_ENVIO =
  "Não conseguimos enviar sua solicitação agora. Tente novamente ou fale com a gente pelo WhatsApp.";

// O site é estático (GitHub Pages): não há servidor para segurar a secret do
// reCAPTCHA. O token Enterprise vai junto com o lead e a verificação
// (siteverify — success/action/score) acontece no cenário do Make, que é
// onde a secret fica guardada. Aqui ficam as validações baratas, o honeypot
// e a entrega.
export async function enviarContato(dados: DadosContato): Promise<Resultado> {
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
  const recaptchaToken = String(dados.recaptchaToken ?? "").trim();

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
    // (webhook ou log), para registrar quando e que ele aceitou.
    consentimentoAceito: true,
    consentimentoEm: new Date().toISOString(),
    // Token Enterprise de uso único (~2 min): o Make chama o siteverify com a
    // secret antes de criar o lead (fail-closed lá).
    recaptchaToken,
  };

  const webhook = process.env.NEXT_PUBLIC_CONTATO_WEBHOOK_URL;

  if (!webhook) {
    console.error(
      "[contato] NEXT_PUBLIC_CONTATO_WEBHOOK_URL não configurada — lead descartado",
    );
    return { ok: false, mensagem: MENSAGEM_FALHA_ENVIO };
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
    // TypeError = falha de rede/CORS (um status HTTP ruim não cai aqui).
    // Repete em no-cors (content-type simples, resposta opaca) — o Make
    // recebe o corpo bruto mesmo assim.
    if (erro instanceof TypeError) {
      try {
        await fetch(webhook, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: JSON.stringify(lead),
          signal: AbortSignal.timeout(10_000),
        });
        return { ok: true };
      } catch {
        console.error("[contato] falha ao entregar o lead (no-cors):", erro);
      }
    } else {
      console.error("[contato] falha ao entregar o lead:", erro);
    }
    return { ok: false, mensagem: MENSAGEM_FALHA_ENVIO };
  }

  return { ok: true };
}
