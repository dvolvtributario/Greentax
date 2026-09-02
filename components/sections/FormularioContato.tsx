"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { enviarContato, type DadosContato } from "@/app/contato/acoes";
import { servicosInteresse } from "@/lib/conteudo";
import { whatsappLink } from "@/lib/site";
import { BotaoAcao } from "@/components/ui/Button";
import { Whatsapp } from "@/components/ui/Icons";
import estilos from "./FormularioContato.module.css";

const juntar = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

export function FormularioContato() {
  const [enviado, setEnviado] = useState(false);
  const [erroGeral, setErroGeral] = useState<string | null>(null);

  function ajustarAltura(evento: React.FormEvent<HTMLTextAreaElement>) {
    const area = evento.currentTarget;
    area.style.height = "auto";
    area.style.height = `${area.scrollHeight}px`;
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<DadosContato>({
    mode: "onTouched",
    defaultValues: { jaCliente: "Não", servico: "" },
  });
  const mensagem = register("mensagem");

  async function aoEnviar(dados: DadosContato) {
    setErroGeral(null);
    const resultado = await enviarContato(dados);

    if (resultado.ok) {
      setEnviado(true);
      return;
    }

    if (resultado.campo) {
      setError(resultado.campo, { type: "server", message: resultado.mensagem });
    } else {
      setErroGeral(resultado.mensagem);
    }
  }

  if (enviado) {
    return (
      <div className={estilos.sucesso}>
        <p className={estilos.sucessoRotulo}>Solicitação enviada</p>
        <h2 className={estilos.sucessoTitulo}>Recebemos seu contato</h2>
        <p className={estilos.sucessoTexto}>
          Em breve retornamos com um diagnóstico inicial, sem compromisso.
        </p>
        <a
          href={whatsappLink("Olá! Acabei de enviar uma solicitação pelo site.")}
          target="_blank"
          rel="noopener noreferrer"
          className={estilos.sucessoLink}
        >
          <Whatsapp className={estilos.icone} />
          Adiantar pelo WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(aoEnviar)} noValidate className={estilos.form}>
      {erroGeral ? (
        <p role="alert" className={estilos.aviso}>
          {erroGeral}
        </p>
      ) : null}

      <div className={estilos.duplo}>
        <div className={estilos.campo}>
          <label htmlFor="nome" className={estilos.rotulo}>
            Nome completo <span className={estilos.obrigatorio}>*</span>
          </label>
          <input
            id="nome"
            type="text"
            maxLength={100}
            autoComplete="name"
            aria-invalid={!!errors.nome}
            className={juntar(estilos.entrada, !!errors.nome && estilos.invalido)}
            {...register("nome", {
              required: "Informe seu nome completo.",
              minLength: { value: 3, message: "Informe seu nome completo." },
            })}
          />
          {errors.nome ? <p className={estilos.erro}>{errors.nome.message}</p> : null}
        </div>

        <div className={estilos.campo}>
          <label htmlFor="empresa" className={estilos.rotulo}>
            Empresa
          </label>
          <input
            id="empresa"
            type="text"
            maxLength={100}
            autoComplete="organization"
            className={estilos.entrada}
            {...register("empresa")}
          />
        </div>

        <div className={estilos.campo}>
          <label htmlFor="telefone" className={estilos.rotulo}>
            Telefone / WhatsApp <span className={estilos.obrigatorio}>*</span>
          </label>
          <input
            id="telefone"
            type="tel"
            maxLength={50}
            inputMode="tel"
            autoComplete="tel"
            placeholder="(18) 99999-9999"
            aria-invalid={!!errors.telefone}
            className={juntar(estilos.entrada, !!errors.telefone && estilos.invalido)}
            onInput={(evento) => {
              evento.currentTarget.value = evento.currentTarget.value.replace(/\D/g, "");
            }}
            {...register("telefone", {
              required: "Informe um telefone com DDD.",
              validate: (v) =>
                /^\d{10,13}$/.test(v.replace(/\D/g, "")) || "Informe um telefone com DDD.",
            })}
          />
          {errors.telefone ? (
            <p className={estilos.erro}>{errors.telefone.message}</p>
          ) : null}
        </div>

        <div className={estilos.campo}>
          <label htmlFor="email" className={estilos.rotulo}>
            E-mail <span className={estilos.obrigatorio}>*</span>
          </label>
          <input
            id="email"
            type="email"
            maxLength={50}
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={juntar(estilos.entrada, !!errors.email && estilos.invalido)}
            {...register("email", {
              required: "Informe um e-mail válido.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                message: "Informe um e-mail válido.",
              },
            })}
          />
          {errors.email ? <p className={estilos.erro}>{errors.email.message}</p> : null}
        </div>
      </div>

      <fieldset className={estilos.grupo}>
        <legend className={estilos.legenda}>Já é cliente da Greentax?</legend>
        <div className={estilos.opcoes}>
          {["Não", "Sim"].map((opcao) => (
            <label key={opcao} className={estilos.opcao}>
              <input type="radio" value={opcao} {...register("jaCliente")} />
              {opcao}
            </label>
          ))}
        </div>
      </fieldset>

      <div className={estilos.campo}>
        <label htmlFor="servico" className={estilos.rotulo}>
          Serviço de interesse <span className={estilos.obrigatorio}>*</span>
        </label>
        <select
          id="servico"
          aria-invalid={!!errors.servico}
          className={juntar(estilos.selecao, !!errors.servico && estilos.invalido)}
          {...register("servico", { required: "Selecione o serviço de interesse." })}
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
        {errors.servico ? <p className={estilos.erro}>{errors.servico.message}</p> : null}
      </div>

      <div className={estilos.campo}>
        <label htmlFor="mensagem" className={estilos.rotulo}>
          Mensagem <span className={estilos.opcional}>(opcional)</span>
        </label>
        <textarea
          id="mensagem"
          rows={4}
          maxLength={1000}
          placeholder="Conte um pouco sobre sua empresa e o que você precisa."
          className={estilos.area}
          {...mensagem}
          onChange={(evento) => {
            ajustarAltura(evento);
            mensagem.onChange(evento);
          }}
        />
      </div>

      {/* Honeypot anti-spam — invisível para pessoas */}
      <div aria-hidden className={estilos.honeypot}>
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div>
        <label className={estilos.aceite}>
          <input
            type="checkbox"
            aria-invalid={!!errors.consentimento}
            {...register("consentimento", {
              required: "É preciso concordar com o tratamento dos dados para enviar.",
            })}
          />
          <span>
            Concordo que a Greentax trate meus dados para responder a esta
            solicitação, conforme a{" "}
            <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
          </span>
        </label>
        {errors.consentimento ? (
          <p className={estilos.erro}>{errors.consentimento.message}</p>
        ) : null}
      </div>

      <BotaoAcao type="submit" disabled={isSubmitting} className={estilos.envio}>
        {isSubmitting ? "Enviando…" : "Enviar solicitação"}
      </BotaoAcao>
    </form>
  );
}
