import { Children } from "react";
import { Container } from "./Container";
import estilos from "./Section.module.css";

type Fundo = "papel" | "papel2" | "verde";

export function Section({
  children,
  fundo = "papel",
  largura = "padrao",
  compacta = false,
  id,
}: {
  children: React.ReactNode;
  fundo?: Fundo;
  largura?: "padrao" | "estreito" | "largo";
  compacta?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={[estilos.secao, estilos[fundo], compacta ? estilos.compacta : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <Container largura={largura}>{children}</Container>
    </section>
  );
}

/**
 * Cabeçalho padrão de seção: filete grosso, rótulo em caixa alta, título.
 * É o elemento que dá o ritmo institucional a todas as páginas.
 */
export function CabecalhoSecao({
  rotulo,
  titulo,
  lead,
  claro = false,
  largo = false,
  nivel: Tag = "h2",
}: {
  rotulo?: string;
  titulo: React.ReactNode;
  lead?: React.ReactNode;
  claro?: boolean;
  largo?: boolean;
  nivel?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={[estilos.cabecalho, claro ? estilos.claro : "", largo ? estilos.largo : ""]
        .filter(Boolean)
        .join(" ")}
    >
      {rotulo ? <span className={estilos.rotulo}>{rotulo}</span> : null}
      <Tag className={estilos.titulo}>{titulo}</Tag>
      {lead ? <p className={estilos.lead}>{lead}</p> : null}
    </div>
  );
}

/**
 * Grade com filetes de 1px entre as células — sem cards flutuantes.
 *
 * O número de colunas nunca passa da quantidade de itens: com dois artigos
 * publicados, uma grade de três colunas deixaria uma célula vazia mostrando o
 * cinza do filete.
 */
export function Grade({
  children,
  colunas = 3,
  className,
}: {
  children: React.ReactNode;
  colunas?: 2 | 3 | 4;
  className?: string;
}) {
  const total = Children.count(children);
  const efetivas = Math.min(colunas, Math.max(total, 1)) as 1 | 2 | 3 | 4;

  const mapa = {
    1: estilos.colunas1,
    2: estilos.colunas2,
    3: estilos.colunas3,
    4: estilos.colunas4,
  };

  return (
    <div className={[estilos.grade, mapa[efetivas], className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
