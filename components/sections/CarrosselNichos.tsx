"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Ponto, Seta } from "@/components/ui/Icons";
import { nichos } from "@/lib/conteudo";
import { whatsappLink } from "@/lib/site";
import estilos from "./CarrosselNichos.module.css";

function useHash() {
  return useSyncExternalStore(
    (aoMudar) => {
      window.addEventListener("hashchange", aoMudar);
      return () => window.removeEventListener("hashchange", aoMudar);
    },
    () => window.location.hash,
    () => "",
  );
}

const mensagemNicho = (titulo: string) =>
  `Olá! Quero entender como a Greentax atende o segmento ${titulo}.`;

export function CarrosselNichos({ className }: { className?: string }) {
  const total = nichos.length;
  const hash = useHash();
  const indiceHash = nichos.findIndex((nicho) => nicho.slug === hash.slice(1));
  const [escolhaManual, setEscolhaManual] = useState<number | null>(null);
  const ativo = escolhaManual ?? (indiceHash >= 0 ? indiceHash : 0);

  const raiz = useRef<HTMLDivElement>(null);
  const travaRolar = useRef(false);
  const acumulado = useRef(0);

  const irPara = useCallback(
    (indice: number) => {
      const alvo = Math.min(Math.max(indice, 0), total - 1);
      setEscolhaManual(alvo);
      window.history.replaceState(null, "", `#${nichos[alvo].slug}`);
    },
    [total],
  );

  useEffect(() => {
    const elemento = raiz.current;
    if (!elemento) return;

    const aoRolar = (evento: WheelEvent) => {
      // normaliza modos de linha/página (ex.: Firefox)
      const delta =
        evento.deltaMode === 1
          ? evento.deltaY * 16
          : evento.deltaMode === 2
            ? evento.deltaY * 100
            : evento.deltaY;
      if (delta === 0) return;

      const descendo = delta > 0;
      const semMargem =
        (descendo && ativo >= total - 1) || (!descendo && ativo <= 0);
      if (semMargem) {
        // sem nicho nessa direção: deixa a página rolar normalmente
        acumulado.current = 0;
        return;
      }

      evento.preventDefault();
      if (travaRolar.current) return;

      acumulado.current += delta;
      if (Math.abs(acumulado.current) >= 30) {
        const proximo = acumulado.current > 0 ? ativo + 1 : ativo - 1;
        acumulado.current = 0;
        travaRolar.current = true;
        irPara(proximo);
        window.setTimeout(() => {
          travaRolar.current = false;
        }, 800);
      }
    };

    elemento.addEventListener("wheel", aoRolar, { passive: false });
    return () => elemento.removeEventListener("wheel", aoRolar);
  }, [ativo, total, irPara]);

  const aoTeclar = (evento: React.KeyboardEvent) => {
    if (evento.key === "ArrowDown" || evento.key === "ArrowRight") {
      evento.preventDefault();
      irPara(ativo + 1);
    } else if (evento.key === "ArrowUp" || evento.key === "ArrowLeft") {
      evento.preventDefault();
      irPara(ativo - 1);
    } else if (evento.key === "Home") {
      evento.preventDefault();
      irPara(0);
    } else if (evento.key === "End") {
      evento.preventDefault();
      irPara(total - 1);
    }
  };

  return (
    <div
      ref={raiz}
      className={[estilos.lab, className].filter(Boolean).join(" ")}
      onKeyDown={aoTeclar}
      role="group"
      aria-roledescription="carrossel"
      aria-label="Nichos de atendimento"
    >
      <span className={estilos.blob} aria-hidden="true" />

      <div className={estilos.menu} role="tablist" aria-label="Índice de nichos">
        <span className={estilos.menuRotulo}>Nichos</span>
        <div className={estilos.menuItens}>
          {nichos.map((nicho, indice) => (
            <button
              key={nicho.slug}
              type="button"
              role="tab"
              id={`aba-nicho-${indice}`}
              aria-selected={indice === ativo}
              aria-controls="painel-nicho"
              onClick={() => irPara(indice)}
              className={[
                estilos.menuItem,
                indice === ativo ? estilos.menuAtivo : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className={estilos.menuTitulo}>
                {indice === ativo && (
                  <span className={estilos.menuMarca} aria-hidden="true" />
                )}
                {nicho.titulo}
              </span>
              <span className={estilos.menuSub}>{nicho.tag}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        className={estilos.estagio}
        id="painel-nicho"
        role="tabpanel"
        aria-labelledby={`aba-nicho-${ativo}`}
      >
        <div className={estilos.pilha}>
          {nichos.map((nicho, indice) => {
            const ativoAqui = indice === ativo;
            return (
              <article
                key={nicho.slug}
                className={[
                  estilos.slide,
                  ativoAqui
                    ? estilos.slideAtivo
                    : indice < ativo
                      ? estilos.slideAntes
                      : estilos.slideDepois,
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden={!ativoAqui}
                inert={!ativoAqui}
              >
                <div className={estilos.tituloCamada}>
                  <h3 className={estilos.titulo}>{nicho.titulo}</h3>
                  <a
                    className={estilos.cta}
                    href={whatsappLink(mensagemNicho(nicho.titulo))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Saiba mais
                    <Seta className={estilos.ctaSeta} />
                  </a>
                </div>

                <div className={estilos.cartao}>
                  <p className={estilos.texto}>{nicho.problema}</p>
                  <p className={`${estilos.texto} ${estilos.atendimento}`}>
                    <strong>Como a Greentax trabalha:</strong>{" "}
                    {nicho.atendimento}
                  </p>

                  <div className={estilos.painel}>
                    <p className={estilos.painelTitulo}>
                      <nicho.icone size={18} strokeWidth={1.6} />
                      Questões que merecem atenção
                    </p>
                    <ul className={estilos.lista}>
                      {nicho.pontos.map((ponto) => (
                        <li key={ponto}>
                          <Ponto />
                          <span>{ponto}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className={estilos.trilho}>
        <span className={estilos.trilhoLinha} aria-hidden="true" />
        <button
          type="button"
          className={estilos.trilhoThumb}
          onClick={() => irPara((ativo + 1) % total)}
          aria-label="Ir para o próximo nicho"
          style={{
            top: `calc(${(((ativo + 0.5) / total) * 100).toFixed(4)}% - 22px)`,
          }}
        >
          <Ponto className={estilos.trilhoPonto} />
          <ChevronsUpDown
            className={estilos.trilhoSetas}
            size={16}
            strokeWidth={1.8}
          />
        </button>
      </div>
    </div>
  );
}
