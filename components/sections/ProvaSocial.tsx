"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Pendente } from "@/components/ui/Pendente";
import { site } from "@/lib/site";
import estilos from "./ProvaSocial.module.css";

const formatar = (n: number) => new Intl.NumberFormat("pt-BR").format(n);

function Contador({ valor, atraso = 0 }: { valor: number; atraso?: number }) {
  const referencia = useRef<HTMLSpanElement>(null);
  const [visivel, setVisivel] = useState(false);
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    const elemento = referencia.current;

    if (!elemento) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true);
          observador.unobserve(elemento);
        }
      },
      { threshold: 0.35 },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    if (!visivel) return;

    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId = 0;

    if (reduzirMovimento) {
      frameId = requestAnimationFrame(() => setAtual(valor));
      return () => cancelAnimationFrame(frameId);
    }

    const duracao = 2400;
    let inicio = 0;

    function animar(agora: number) {
      const progresso = Math.min((agora - inicio) / duracao, 1);
      const suavizado = 1 - Math.pow(1 - progresso, 3);
      setAtual(Math.round(valor * suavizado));

      if (progresso < 1) {
        frameId = requestAnimationFrame(animar);
      }
    }

    const timeoutId = window.setTimeout(() => {
      inicio = performance.now();
      frameId = requestAnimationFrame(animar);
    }, atraso);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [atraso, valor, visivel]);

  return (
    <span
      ref={referencia}
      className={`${estilos.valor} ${visivel ? estilos.valorVisivel : ""}`}
    >
      {formatar(atual)}
    </span>
  );
}

export function ProvaSocial({
  logos = [],
  className,
  mostrarIndicadores = true,
}: {
  logos?: { src: string; alt: string }[];
  className?: string;
  mostrarIndicadores?: boolean;
}) {
  const { empresasAtendidas, anosDeMercado, obrigacoesNoPrazo } = site.indicadores;

  const indicadores = [
    { valor: empresasAtendidas, sufixo: "+", legenda: "Empresas atendidas" },
    { valor: anosDeMercado, sufixo: "", legenda: "Anos de mercado" },
    { valor: obrigacoesNoPrazo, sufixo: "%", legenda: "Obrigações entregues no prazo" },
  ];

  const preenchidos = indicadores.filter((i) => i.valor !== null);

  return (
    <section
      className={[
        estilos.faixa,
        mostrarIndicadores ? "" : estilos.semIndicadores,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container>
        {mostrarIndicadores ? (
          preenchidos.length > 0 ? (
          <dl className={estilos.indicadores}>
              {preenchidos.map((item, index) => (
              <div key={item.legenda} className={estilos.indicador}>
                <dt className="sr-only">{item.legenda}</dt>
                <dd>
                  <span className={estilos.valorWrapper}>
                    <Contador valor={item.valor as number} atraso={index * 250} />
                    <span className={estilos.sufixo}>{item.sufixo}</span>
                  </span>
                  <span className={estilos.legenda}>{item.legenda}</span>
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <Pendente titulo="Indicadores numéricos (prova social)">
            <p>
              Faltam os três números que o briefing pede em destaque na Home:{" "}
              <strong>empresas atendidas</strong>, <strong>anos de mercado</strong> e{" "}
              <strong>% de obrigações entregues no prazo</strong>.
            </p>
            <p>
              Assim que a Greentax validar os valores, preencha{" "}
              <code>site.indicadores</code> em <code>lib/site.ts</code> — a faixa
              passa a renderizar sozinha. O briefing proíbe expressamente números
              fictícios, então nada foi inventado aqui.
            </p>
          </Pendente>
        )
        ) : null}

        <div className={estilos.clientes}>
          <h2 className={estilos.tituloClientes}>Empresas que confiam na Greentax</h2>
          {logos.length > 0 ? (
            <div className={estilos.carrossel}>
              <div className={estilos.carrosselCena}>
                <div className={estilos.carrosselRastro}>
                  {[...logos, ...logos].map((logo, i) => {
                    return (
                      <div key={`${logo.src}-${i}`} className={estilos.cliente}>
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={280}
                          height={160}
                          loading="eager"
                          className={estilos.clienteLogo}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <Pendente compacto titulo="Logos de clientes" className={estilos.pendenteClientes}>
              Reunir as logos autorizadas em <code>public/clientes/</code>. Vale pedir
              autorização por escrito antes de publicar a marca de cada cliente.
            </Pendente>
          )}
        </div>
      </Container>
    </section>
  );
}
