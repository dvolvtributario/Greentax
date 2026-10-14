"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  valor: number;
  sufixo?: string;
  className?: string;
};

export function Contador({ valor, sufixo = "", className }: Props) {
  const alvo = useRef<HTMLSpanElement>(null);
  const [texto, setTexto] = useState(() => String(valor));

  useEffect(() => {
    const elemento = alvo.current;
    if (!elemento) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animacao = 0;
    let iniciado = false;

    const observador = new IntersectionObserver(
      (entradas) => {
        const [entrada] = entradas;
        if (!entrada?.isIntersecting || iniciado) return;
        iniciado = true;
        observador.disconnect();

        const inicio = performance.now();
        const duracao = 1500;

        const passo = (agora: number) => {
          const t = Math.min((agora - inicio) / duracao, 1);
          const suave = 1 - (1 - t) ** 3;
          setTexto(String(Math.round(suave * valor)));
          if (t < 1) animacao = requestAnimationFrame(passo);
        };
        animacao = requestAnimationFrame(passo);
      },
      { threshold: 0, rootMargin: "0px 0px 8% 0px" },
    );

    observador.observe(elemento);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(animacao);
    };
  }, [valor]);

  return (
    <span ref={alvo} className={className}>
      {texto}
      {sufixo}
    </span>
  );
}
