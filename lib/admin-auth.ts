import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const COOKIE_ADMIN = "greentax_admin";

const DURACAO = 8 * 60 * 60;

function segredo(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SENHA || null;
}

function comparacao(valor: string): Buffer {
  return createHmac("sha256", "greentax-comparacao").update(valor).digest();
}

export function senhaConfigurada(): boolean {
  return Boolean(process.env.ADMIN_SENHA);
}

export function senhaCorreta(informada: string): boolean {
  const esperada = process.env.ADMIN_SENHA;
  if (!esperada) return false;
  return timingSafeEqual(comparacao(informada), comparacao(esperada));
}

function assinar(expiracao: string): string | null {
  const chave = segredo();
  if (!chave) return null;
  return createHmac("sha256", chave)
    .update(`greentax-admin:${expiracao}`)
    .digest("hex");
}

function gerarToken(): string | null {
  const expiracao = String(Math.floor(Date.now() / 1000) + DURACAO);
  const assinatura = assinar(expiracao);
  return assinatura ? `${expiracao}.${assinatura}` : null;
}

export function sessaoValida(token: string | null | undefined): boolean {
  if (!token) return false;

  const partes = token.split(".");
  if (partes.length !== 2) return false;

  const [expiracao, assinatura] = partes;
  const esperada = assinar(expiracao);
  if (!esperada || !assinatura) return false;

  const a = Buffer.from(assinatura, "utf8");
  const b = Buffer.from(esperada, "utf8");
  if (a.length !== b.length) return false;
  if (!timingSafeEqual(a, b)) return false;

  return Number(expiracao) * 1000 > Date.now();
}

export async function criarSessao(): Promise<boolean> {
  const token = gerarToken();
  if (!token) return false;

  const armario = await cookies();
  armario.set(COOKIE_ADMIN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: DURACAO,
    path: "/",
  });
  return true;
}

export async function encerrarSessao(): Promise<void> {
  const armario = await cookies();
  armario.delete(COOKIE_ADMIN);
}

export async function sessaoAtiva(): Promise<boolean> {
  const armario = await cookies();
  return sessaoValida(armario.get(COOKIE_ADMIN)?.value);
}

export async function exigirSessao(): Promise<void> {
  if (!(await sessaoAtiva())) redirect("/admin/login");
}
