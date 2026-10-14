"use client";

import { useEffect, useRef, useState } from "react";
import { Calculator, TrendingUp, Users } from "lucide-react";
import { servicosRecorrentes } from "@/lib/conteudo";
import estilos from "./CarrosselInclusos.module.css";

const icones = [Calculator, TrendingUp, Users];

const INTERVALO = 4500;

export function CarrosselInclusos() {
  const total = servicosRecorrentes.length;
  const raiz = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let naTela = true;
    const observador =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entrada]) => {
            naTela = entrada.isIntersecting;
          }, { threshold: 0.25 })
        : null;
    const elemento = raiz.current;
    if (observador && elemento) observador.observe(elemento);

    const intervalo = window.setInterval(() => {
      if (naTela && !document.hidden) {
        setAtivo((atual) => (atual + 1) % total);
      }
    }, INTERVALO);

    return () => {
      window.clearInterval(intervalo);
      observador?.disconnect();
    };
  }, [total]);

  return (
    <div
      ref={raiz}
      className={estilos.area}
      role="group"
      aria-roledescription="carrossel"
      aria-label="O que está incluso na rotina"
    >
      {servicosRecorrentes.map((bloco, indice) => {
        const Icone = icones[indice];
        const distancia = (indice - ativo + total) % total;
        const classes = [
          estilos.slide,
          distancia === 0
            ? estilos.slideAtivo
            : distancia === total - 1
              ? estilos.slideAntes
              : estilos.slideDepois,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div
            key={bloco.titulo}
            className={classes}
            role="group"
            aria-roledescription="slide"
            aria-label={bloco.titulo}
            aria-hidden={distancia !== 0}
          >
            <div className={estilos.frenteTopo}>
              <span className={estilos.frenteSelo} aria-hidden="true">
                <Icone size={22} strokeWidth={1.5} />
              </span>
              <h3 className={estilos.frenteTitulo}>{bloco.titulo}</h3>
            </div>
            <ul className={estilos.frases}>
              {bloco.itens.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
