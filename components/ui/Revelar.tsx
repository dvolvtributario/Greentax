"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Dispara a animação de entrada quando o bloco entra no viewport.
 * Marca o container com `data-visivel="true"` para que o CSS da página
 * decida o que animar (surgir no fundo branco, deslizar no fundo cinza).
 */
export function Revelar({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const referencia = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elemento = referencia.current;
    if (!elemento) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        elemento.setAttribute("data-visivel", "true");
        observador.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <div ref={referencia} data-visivel="false" className={className}>
      {children}
    </div>
  );
}