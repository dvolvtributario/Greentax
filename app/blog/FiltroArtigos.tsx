"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { MouseEvent } from "react";
import { CartaoArtigo } from "@/components/sections/CartaoArtigo";
import { CATEGORIAS, type ArtigoComSlug } from "@/lib/blog-tipos";
import estilos from "./page.module.css";


function trocarCategoria(evento: MouseEvent<HTMLAnchorElement>, categoria: string | null) {
  if (
    evento.button !== 0 ||
    evento.metaKey ||
    evento.ctrlKey ||
    evento.shiftKey ||
    evento.altKey
  ) {
    return;
  }
  evento.preventDefault();
  const parametros = new URLSearchParams(window.location.search);
  if (categoria) parametros.set("categoria", categoria);
  else parametros.delete("categoria");
  const consulta = parametros.toString();
  window.history.pushState(
    null,
    "",
    `${window.location.pathname}${consulta ? `?${consulta}` : ""}`,
  );
}

export function ListaArtigos({
  artigos,
  filtro,
}: {
  artigos: ArtigoComSlug[];
  filtro: string | null;
}) {
  const visiveis = filtro ? artigos.filter((a) => a.categoria === filtro) : artigos;

  return (
    <>
      <nav aria-label="Filtrar por categoria" className={estilos.filtros}>
        <Link
          href="/blog"
          onClick={(e) => trocarCategoria(e, null)}
          className={`${estilos.filtro} ${!filtro ? estilos.ativo : ""}`}
          aria-current={!filtro ? "true" : undefined}
        >
          Todos
        </Link>
        {CATEGORIAS.map((cat) => (
          <Link
            key={cat}
            href={`/blog?categoria=${encodeURIComponent(cat)}`}
            onClick={(e) => trocarCategoria(e, cat)}
            className={`${estilos.filtro} ${filtro === cat ? estilos.ativo : ""}`}
            aria-current={filtro === cat ? "true" : undefined}
          >
            {cat}
          </Link>
        ))}
      </nav>

      {visiveis.length > 0 ? (
        <div className={estilos.grade}>
          {visiveis.map((artigo) => (
            <CartaoArtigo key={artigo.slug} artigo={artigo} />
          ))}
        </div>
      ) : (
        <p className={estilos.vazio}>Nenhum artigo nesta categoria ainda.</p>
      )}
    </>
  );
}

export function FiltroArtigos({ artigos }: { artigos: ArtigoComSlug[] }) {
  const parametros = useSearchParams();
  const bruto = parametros.get("categoria");
  const filtro =
    typeof bruto === "string" && (CATEGORIAS as readonly string[]).includes(bruto)
      ? bruto
      : null;

  return <ListaArtigos artigos={artigos} filtro={filtro} />;
}
