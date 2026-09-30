import { Children } from "react";
import { Container } from "./Container";
import estilos from "./Section.module.css";

type Fundo = "papel" | "papel2" | "verde" | "nenhum";

export function Section({
  children,
  fundo = "papel",
  largura = "padrao",
  compacta = false,
  id,
  className,
  decoracao,
}: {
  children: React.ReactNode;
  fundo?: Fundo;
  largura?: "padrao" | "estreito" | "largo";
  compacta?: boolean;
  id?: string;
  className?: string;
  decoracao?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={[estilos.secao, fundo !== "nenhum" ? estilos[fundo] : "", compacta ? estilos.compacta : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {decoracao}
      <Container largura={largura}>{children}</Container>
    </section>
  );
}

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
