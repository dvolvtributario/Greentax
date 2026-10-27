"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { enviarContato, type DadosContato } from "@/app/contato/acoes";
import { servicosInteresse } from "@/lib/conteudo";
import { ACAO_RECAPTCHA } from "@/lib/recaptcha";
import { whatsappLink } from "@/lib/site";
import { BotaoAcao } from "@/components/ui/Button";
import { Whatsapp } from "@/components/ui/Icons";
import estilos from "./FormularioContato.module.css";

type GRecaptchaEnterprise = {
  render: (container: HTMLElement, params: Record<string, unknown>) => number;
  reset: (id?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: { enterprise?: GRecaptchaEnterprise };
  }
}

const juntar = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

export function FormularioContato() {
  const [enviado, setEnviado] = useState(false);
  const [erroGeral, setErroGeral] = useState<string | null>(null);

  const [token, setToken] = useState<string | null>(null);
  const [recaptchaIndisponivel, setRecaptchaIndisponivel] = useState(false);
  const [idWidget, setIdWidget] = useState<number | null>(null);
  const caixaRecaptchaRef = useRef<HTMLDivElement>(null);
  const erroGeralRef = useRef<HTMLParagraphElement>(null);

  // O alerta fica no topo do formulário; foca para garantir que quem clicou
  // em "Enviar" (lá embaixo) veja a mensagem.
  useEffect(() => {
    if (erroGeral) erroGeralRef.current?.focus();
  }, [erroGeral]);

  function renderizarRecaptcha() {
    // O enterprise.js dispara o load antes de expor os métodos (render) no
    // objeto — então espera ficar pronto, tentando por até ~10s.
    let tentativas = 0;

    const tentar = () => {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!siteKey) {
        setRecaptchaIndisponivel(true);
        return;
      }

      const caixa = caixaRecaptchaRef.current;
      if (!caixa || caixa.children.length > 0) return; // descartado ou já renderizado

      const api = window.grecaptcha?.enterprise;
      if (api && typeof api.render === "function") {
        try {
          setIdWidget(
            api.render(caixa, {
              sitekey: siteKey,
              action: ACAO_RECAPTCHA,
              callback: (resultado: string) => setToken(resultado),
              "expired-callback": () => setToken(null),
              "error-callback": () => setToken(null),
            }),
          );
        } catch {
          setRecaptchaIndisponivel(true);
        }
        return;
      }

      tentativas += 1;
      if (tentativas > 100) {
        setRecaptchaIndisponivel(true);
        return;
      }
      window.setTimeout(tentar, 100);
    };

    tentar();
  }

  // O token é de uso único: depois de qualquer recusa do servidor é preciso
  // gerar outro (e o token expira em 2 minutos).
  function reiniciarRecaptcha() {
    setToken(null);
    const widget = window.grecaptcha?.enterprise;
    if (widget && idWidget !== null) {
      try {
        widget.reset(idWidget);
      } catch {
        // widget já descartado — o próximo render cuida disso
      }
    }
  }

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

    if (recaptchaIndisponivel) {
      setErroGeral(
        "Não foi possível carregar a proteção anti-spam. Recarregue a página e tente novamente.",
      );
      return;
    }

    if (!token) {
      setErroGeral("Marque o campo “Não sou um robô” para enviar a solicitação.");
      return;
    }

    const resultado = await enviarContato({ ...dados, recaptchaToken: token });

    if (resultado.ok) {
      setEnviado(true);
      return;
    }

    reiniciarRecaptcha();

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
        <p role="alert" tabIndex={-1} ref={erroGeralRef} className={estilos.aviso}>
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
            aria-describedby={errors.nome ? "erro-nome" : undefined}
            className={juntar(estilos.entrada, !!errors.nome && estilos.invalido)}
            {...register("nome", {
              required: "Informe seu nome completo.",
              minLength: { value: 3, message: "Informe seu nome completo." },
            })}
          />
          {errors.nome ? (
            <p id="erro-nome" role="alert" className={estilos.erro}>
              {errors.nome.message}
            </p>
          ) : null}
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
            aria-describedby={errors.telefone ? "erro-telefone" : undefined}
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
            <p id="erro-telefone" role="alert" className={estilos.erro}>
              {errors.telefone.message}
            </p>
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
            aria-describedby={errors.email ? "erro-email" : undefined}
            className={juntar(estilos.entrada, !!errors.email && estilos.invalido)}
            {...register("email", {
              required: "Informe um e-mail válido.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                message: "Informe um e-mail válido.",
              },
            })}
          />
          {errors.email ? (
            <p id="erro-email" role="alert" className={estilos.erro}>
              {errors.email.message}
            </p>
          ) : null}
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
          aria-describedby={errors.servico ? "erro-servico" : undefined}
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
        {errors.servico ? (
          <p id="erro-servico" role="alert" className={estilos.erro}>
            {errors.servico.message}
          </p>
        ) : null}
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
            aria-describedby={errors.consentimento ? "erro-consentimento" : undefined}
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
          <p id="erro-consentimento" role="alert" className={estilos.erro}>
            {errors.consentimento.message}
          </p>
        ) : null}
      </div>

      {/* reCAPTCHA Enterprise — widget checkbox renderizado explicitamente */}
      <div ref={caixaRecaptchaRef} />

      <BotaoAcao type="submit" disabled={isSubmitting} className={estilos.envio}>
        {isSubmitting ? "Enviando…" : "Enviar solicitação"}
      </BotaoAcao>

      <Script
        src="https://www.google.com/recaptcha/enterprise.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderizarRecaptcha}
        onError={() => setRecaptchaIndisponivel(true)}
      />
    </form>
  );
}
