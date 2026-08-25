"use client";

import { useActionState, useId } from "react";
import Link from "next/link";
import { enviarContato, estadoInicial } from "@/app/contato/acoes";
import { servicosInteresse } from "@/lib/conteudo";
import { whatsappLink } from "@/lib/site";
import { BotaoSubmit } from "@/components/ui/button";
import { IconeCheck, IconeWhatsapp } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const rotuloClasse = "block text-sm font-semibold text-ink-900";
const campoClasse =
  "mt-2 block w-full rounded-xl border border-ink-200 bg-surface px-4 py-3 text-base text-ink-900 placeholder:text-ink-300 focus:border-brand-800 focus:ring-0 focus:outline-none";

function Erro({ id, mensagem }: { id: string; mensagem?: string }) {
  if (!mensagem) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-red-700">
      {mensagem}
    </p>
  );
}

export function FormularioContato() {
  const [estado, acao, enviando] = useActionState(enviarContato, estadoInicial);
  const id = useId();
  const erros = estado.erros ?? {};

  if (estado.status === "sucesso") {
    return (
      <div className="rounded-card border border-brand-200 bg-brand-50 p-8 text-center sm:p-10">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-800">
          <IconeCheck className="size-7 text-white" />
        </span>
        <h2 className="mt-6 text-2xl font-bold text-brand-950">
          Solicitação enviada
        </h2>
        <p className="mt-3 leading-relaxed text-brand-900">{estado.mensagem}</p>
        <a
          href={whatsappLink("Olá! Acabei de enviar uma solicitação pelo site.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-800 px-6 font-semibold text-white transition-colors hover:bg-brand-900"
        >
          <IconeWhatsapp className="size-5" />
          Adiantar pelo WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form action={acao} noValidate className="space-y-6">
      {estado.status === "erro" && estado.mensagem ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-800"
        >
          {estado.mensagem}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-nome`} className={rotuloClasse}>
            Nome completo <span className="text-brand-600">*</span>
          </label>
          <input
            id={`${id}-nome`}
            name="nome"
            type="text"
            autoComplete="name"
            required
            aria-invalid={!!erros.nome}
            aria-describedby={erros.nome ? `${id}-nome-erro` : undefined}
            className={cn(campoClasse, erros.nome && "border-red-400")}
          />
          <Erro id={`${id}-nome-erro`} mensagem={erros.nome} />
        </div>

        <div>
          <label htmlFor={`${id}-empresa`} className={rotuloClasse}>
            Empresa
          </label>
          <input
            id={`${id}-empresa`}
            name="empresa"
            type="text"
            autoComplete="organization"
            className={campoClasse}
          />
        </div>

        <div>
          <label htmlFor={`${id}-telefone`} className={rotuloClasse}>
            Telefone / WhatsApp <span className="text-brand-600">*</span>
          </label>
          <input
            id={`${id}-telefone`}
            name="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(18) 99999-9999"
            required
            aria-invalid={!!erros.telefone}
            aria-describedby={erros.telefone ? `${id}-telefone-erro` : undefined}
            className={cn(campoClasse, erros.telefone && "border-red-400")}
          />
          <Erro id={`${id}-telefone-erro`} mensagem={erros.telefone} />
        </div>

        <div>
          <label htmlFor={`${id}-email`} className={rotuloClasse}>
            E-mail <span className="text-brand-600">*</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={!!erros.email}
            aria-describedby={erros.email ? `${id}-email-erro` : undefined}
            className={cn(campoClasse, erros.email && "border-red-400")}
          />
          <Erro id={`${id}-email-erro`} mensagem={erros.email} />
        </div>
      </div>

      <fieldset>
        <legend className={rotuloClasse}>Já é cliente da Greentax?</legend>
        <div className="mt-3 flex gap-6">
          {["Não", "Sim"].map((opcao) => (
            <label
              key={opcao}
              className="flex cursor-pointer items-center gap-2.5 text-ink-700"
            >
              <input
                type="radio"
                name="jaCliente"
                value={opcao}
                defaultChecked={opcao === "Não"}
                className="size-4 accent-[var(--color-brand-800)]"
              />
              {opcao}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${id}-servico`} className={rotuloClasse}>
          Serviço de interesse <span className="text-brand-600">*</span>
        </label>
        <select
          id={`${id}-servico`}
          name="servico"
          required
          defaultValue=""
          aria-invalid={!!erros.servico}
          aria-describedby={erros.servico ? `${id}-servico-erro` : undefined}
          className={cn(campoClasse, erros.servico && "border-red-400")}
        >
          <option value="" disabled>
            Selecione uma opção
          </option>
          {servicosInteresse.map((servico) => (
            <option key={servico} value={servico}>
              {servico}
            </option>
          ))}
        </select>
        <Erro id={`${id}-servico-erro`} mensagem={erros.servico} />
      </div>

      <div>
        <label htmlFor={`${id}-mensagem`} className={rotuloClasse}>
          Mensagem <span className="font-normal text-ink-500">(opcional)</span>
        </label>
        <textarea
          id={`${id}-mensagem`}
          name="mensagem"
          rows={4}
          placeholder="Conte um pouco sobre sua empresa e o que você precisa."
          className={cn(campoClasse, "resize-y")}
        />
      </div>

      {/* Honeypot anti-spam — invisível para pessoas */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-website`}>Não preencha este campo</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consentimento"
            required
            aria-invalid={!!erros.consentimento}
            className="mt-1 size-4 shrink-0 accent-[var(--color-brand-800)]"
          />
          <span className="text-sm leading-relaxed text-ink-500">
            Concordo que a Greentax trate meus dados para responder a esta
            solicitação, conforme a{" "}
            <Link
              href="/politica-de-privacidade"
              className="font-semibold text-brand-800 underline underline-offset-4"
            >
              Política de Privacidade
            </Link>
            .
          </span>
        </label>
        <Erro id={`${id}-consentimento-erro`} mensagem={erros.consentimento} />
      </div>

      <BotaoSubmit type="submit" disabled={enviando} className="w-full sm:w-auto">
        {enviando ? "Enviando…" : "Enviar solicitação"}
      </BotaoSubmit>
    </form>
  );
}
