"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  EVENTO_ABRIR_PREFERENCIAS,
  EVENTO_CONSENTIMENTO,
  CATEGORIAS,
} from "@/lib/cookies";
import { salvarPreferencias } from "@/app/consentimento/actions";
import { useConsentimento } from "./useConsentimento";
import estilos from "./BannerCookies.module.css";

export function BannerCookies() {
  const { preferencias } = useConsentimento();
  const [estado, setEstado] = useState<
    Awaited<ReturnType<typeof salvarPreferencias>>
  >({ ok: false });
  const [pendente, setPendente] = useState(false);

  const [aberto, setAberto] = useState(false);
  const [origem, setOrigem] = useState<"banner" | "rodape">("banner");
  const caixaRef = useRef<HTMLDivElement>(null);

  // O rodapé pede para reabrir o centro de preferências.
  useEffect(() => {
    const abrir = () => {
      setEstado({ ok: false });
      setOrigem("rodape");
      setAberto(true);
    };
    window.addEventListener(EVENTO_ABRIR_PREFERENCIAS, abrir);
    return () => window.removeEventListener(EVENTO_ABRIR_PREFERENCIAS, abrir);
  }, []);

  // Esc fecha sem mudar nada (não é consentimento).
  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setAberto(false);
    };
    document.addEventListener("keydown", aoTeclar);
    caixaRef.current?.focus();
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  // Salva, divulga a escolha para o store e fecha a segunda camada.
  async function aoEnviar(formData: FormData) {
    setPendente(true);
    try {
      const resultado = await salvarPreferencias({ ok: false }, formData);
      setEstado(resultado);

      if (resultado.ok && resultado.preferencias) {
        window.dispatchEvent(
          new CustomEvent(EVENTO_CONSENTIMENTO, {
            detail: resultado.preferencias,
          }),
        );
        setAberto(false);
      }
    } catch {
      setEstado({
        ok: false,
        erro: "Não foi possível salvar suas preferências.",
      });
    } finally {
      setPendente(false);
    }
  }

  if (preferencias === undefined) return null;

  const decidido = preferencias !== null;

  return (
    <>
      {!decidido && (
        <section
          className={estilos.banner}
          role="region"
          aria-label="Aviso de cookies"
        >
          <div className={estilos.conteudo}>
            <p className={estilos.texto}>
              Usamos cookies. Os necessários mantêm o site funcionando; os de
              análise, publicidade e conteúdo de terceiros só são ativados se
              você permitir. Você pode mudar de ideia quando quiser pelo
              rodapé.{" "}
              <Link
                href="/politica-de-privacidade#cookies"
                className={estilos.link}
              >
                Saiba mais
              </Link>
            </p>

            <form action={aoEnviar} className={estilos.acoes}>
              <input type="hidden" name="origem" value="banner" />
              <button
                type="submit"
                name="operacao"
                value="aceitar"
                className={estilos.botaoPrimario}
                disabled={pendente}
              >
                Aceitar todos
              </button>
              <button
                type="submit"
                name="operacao"
                value="recusar"
                className={estilos.botaoSecundario}
                disabled={pendente}
              >
                Rejeitar não necessários
              </button>
              <button
                type="button"
                onClick={() => {
                  setEstado({ ok: false });
                  setOrigem("banner");
                  setAberto(true);
                }}
                className={estilos.botaoTexto}
              >
                Personalizar
              </button>
            </form>
          </div>
        </section>
      )}

      {aberto && (
        <div
          className={estilos.fundo}
          onClick={() => setAberto(false)}
          role="presentation"
        >
          <div
            className={estilos.caixa}
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-preferencias"
            tabIndex={-1}
            ref={caixaRef}
            onClick={(evento) => evento.stopPropagation()}
          >
            <h2 id="titulo-preferencias" className={estilos.titulo}>
              Preferências de cookies
            </h2>
            <p className={estilos.subtitulo}>
              Escolha o que você autoriza. Os cookies necessários ficam sempre
              ativos, porque sem eles o site não funciona.
            </p>

            <form action={aoEnviar} className={estilos.formulario}>
              <input type="hidden" name="origem" value={origem} />
              <ul className={estilos.categorias}>
                {CATEGORIAS.map((categoria) => {
                  const id = `categoria-${categoria.id}`;
                  return (
                    <li key={categoria.id} className={estilos.categoria}>
                      <div className={estilos.linhaCategoria}>
                        <label htmlFor={id} className={estilos.nome}>
                          {categoria.titulo}
                        </label>

                        {categoria.obrigatoria ? (
                          <span className={estilos.selo}>Sempre ativo</span>
                        ) : (
                          <input
                            type="checkbox"
                            id={id}
                            name={categoria.id}
                            value="sim"
                            defaultChecked={preferencias?.[categoria.id]}
                            className={estilos.interruptor}
                          />
                        )}
                      </div>

                      <p className={estilos.descricao}>{categoria.descricao}</p>

                      <p className={estilos.listaCookies}>
                        {categoria.cookies.length > 0
                          ? `Cookies: ${categoria.cookies.join(", ")}`
                          : "Cookies desta categoria: nenhum no momento."}
                      </p>
                    </li>
                  );
                })}
              </ul>

              {estado.erro && (
                <p className={estilos.erro} role="alert">
                  {estado.erro}
                </p>
              )}

              <div className={estilos.acoes}>
                <button
                  type="submit"
                  name="operacao"
                  value="personalizar"
                  className={estilos.botaoPrimario}
                  disabled={pendente}
                >
                  {pendente ? "Salvando..." : "Salvar preferências"}
                </button>
                <button
                  type="button"
                  onClick={() => setAberto(false)}
                  className={estilos.botaoTexto}
                >
                  Fechar
                </button>
              </div>
            </form>

            <p className={estilos.rodape}>
              <Link href="/politica-de-privacidade#cookies">
                Ver a política de privacidade
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
