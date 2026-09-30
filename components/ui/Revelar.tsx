"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

export function Revelar({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const referencia = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const elemento = referencia.current;
    if (!elemento) return;

    const limpar = () => {
      observador?.disconnect();
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };

    const marcarVisivel = () => {
      if (elemento.getAttribute("data-visivel") === "true") return;
      elemento.setAttribute("data-visivel", "true");
      limpar();
    };

    const aoRolar = () => {
      // Rede de segurança: garante visibilidade assim que o topo da seção
      // alcança (ou passou de) o viewport, mesmo quando o IntersectionObserver
      // não dispara — ex.: navegação por âncora ou scroll instantâneo.
      if (elemento.getBoundingClientRect().top < window.innerHeight - 64) {
        marcarVisivel();
      }
    };

    if (typeof IntersectionObserver === "undefined") {
      elemento.setAttribute("data-visivel", "true");
      window.addEventListener("scroll", aoRolar, { passive: true });
      return () => window.removeEventListener("scroll", aoRolar);
    }

    elemento.setAttribute("data-visivel", "false");

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting || entrada.boundingClientRect.top < 0) {
          marcarVisivel();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observador.observe(elemento);

    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar, { passive: true });

    return limpar;
  }, []);

  return (
    <div ref={referencia} className={className}>
      {children}
    </div>
  );
}