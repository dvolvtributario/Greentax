"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CartaoArtigo } from "@/components/sections/CartaoArtigo";
import { CATEGORIAS, type ArtigoComSlug } from "@/lib/blog-tipos";
import estilos from "./page.module.css";

// Filtro por categoria no cliente: o deploy é estático (GitHub Pages) e a
// página não pode ler searchParams no servidor. O fallback da Suspense
// (usada no prerender) mostra a lista completa — o HTML estático sai com
// todos os artigos, e a filtragem acontece depois da hidratação.
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
          className={`${estilos.filtro} ${!filtro ? estilos.ativo : ""}`}
          aria-current={!filtro ? "true" : undefined}
        >
          Todos
        </Link>
        {CATEGORIAS.map((cat) => (
          <Link
            key={cat}
            href={`/blog?categoria=${encodeURIComponent(cat)}`}
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
