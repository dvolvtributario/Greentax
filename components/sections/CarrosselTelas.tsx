"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { aplicativo } from "@/lib/conteudo";
import estilos from "./CarrosselTelas.module.css";

export function CarrosselTelas({ className }: { className?: string }) {
  const telas = aplicativo.telas;
  const total = telas.length;
  const raiz = useRef<HTMLDivElement>(null);
  const pista = useRef<HTMLDivElement>(null);
  const parado = useRef(false);
  const visivel = useRef(false);
  const [ativo, setAtivo] = useState(0);

  const passo = useCallback(() => {
    const el = pista.current;
    if (!el) return 0;
    const cartoes = el.querySelectorAll<HTMLElement>("[data-tela]");
    if (cartoes.length < 2) return cartoes[0]?.offsetWidth ?? 0;
    return cartoes[1].offsetLeft - cartoes[0].offsetLeft;
  }, []);

  const irPara = useCallback(
    (indice: number, instantaneo = false) => {
      const el = pista.current;
      if (!el) return;
      const alvo = Math.min(Math.max(indice, 0), total - 1);
      setAtivo(alvo);
      const reduzir = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      el.scrollTo({
        left: alvo * passo(),
        behavior: reduzir || instantaneo ? "auto" : "smooth",
      });
    },
    [passo, total],
  );

  useEffect(() => {
    const el = pista.current;
    if (!el) return;

    let quadro = 0;
    const aoRolar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        const cartoes = el.querySelectorAll<HTMLElement>("[data-tela]");
        if (!cartoes.length) return;
        const base = cartoes[0].offsetLeft;
        let melhor = 0;
        let menorDist = Infinity;
        cartoes.forEach((cartao, indice) => {
          const dist = Math.abs(cartao.offsetLeft - base - el.scrollLeft);
          if (dist < menorDist) {
            menorDist = dist;
            melhor = indice;
          }
        });
        setAtivo(melhor);
      });
    };

    el.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      el.removeEventListener("scroll", aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, []);

  // só roda sozinho quando o carrossel está visível na tela
  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        visivel.current = !!entrada?.isIntersecting;
      },
      { threshold: 0.25 },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  // avança automático em loop contínuo, pausando no hover/foco e com movimento reduzido
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      if (document.hidden || parado.current || !visivel.current) return;

      const proximo = (ativo + 1) % total;
      irPara(proximo, proximo === 0);
    }, 4600);

    return () => window.clearInterval(timer);
  }, [ativo, total, irPara]);

  return (
    <div
      ref={raiz}
      className={[estilos.raiz, className].filter(Boolean).join(" ")}
      onMouseEnter={() => {
        parado.current = true;
      }}
      onMouseLeave={() => {
        parado.current = false;
      }}
      onFocusCapture={() => {
        parado.current = true;
      }}
      onBlurCapture={() => {
        parado.current = false;
      }}
    >
      <div className={estilos.janela}>
        <button
          type="button"
          className={`${estilos.seta} ${estilos.setaEsquerda}`}
          onClick={() => irPara(ativo - 1)}
          disabled={ativo <= 0}
          aria-label="Tela anterior"
        >
          <ChevronLeft size={22} strokeWidth={2} />
        </button>

        <div ref={pista} className={estilos.pista}>
          {telas.map((tela) => (
            <figure key={tela.src} data-tela className={estilos.tela}>
              <Image
                src={tela.src}
                alt={tela.alt}
                width={738}
                height={1600}
                sizes="240px"
              />
            </figure>
          ))}
        </div>

        <button
          type="button"
          className={`${estilos.seta} ${estilos.setaDireita}`}
          onClick={() => irPara(ativo + 1)}
          disabled={ativo >= total - 1}
          aria-label="Próxima tela"
        >
          <ChevronRight size={22} strokeWidth={2} />
        </button>
      </div>

      <div className={estilos.pontos} aria-label="Telas do aplicativo">
        {telas.map((tela, indice) => (
          <button
            key={tela.src}
            type="button"
            className={estilos.ponto}
            aria-current={indice === ativo}
            aria-label={`Ir para a tela ${indice + 1}`}
            onClick={() => irPara(indice)}
          />
        ))}
      </div>
    </div>
  );
}
