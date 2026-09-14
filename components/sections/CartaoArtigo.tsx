import Image from "next/image";
import Link from "next/link";
import { formatarData, type ArtigoComSlug } from "@/lib/blog";
import { Seta } from "@/components/ui/Icons";
import estilos from "./CartaoArtigo.module.css";

export function CartaoArtigo({ artigo }: { artigo: ArtigoComSlug }) {
  return (
    <Link href={`/blog/${artigo.slug}`} className={estilos.cartao}>
      <div className={estilos.midia}>
        {artigo.imagem ? (
          <Image
            src={artigo.imagem.src}
            alt={artigo.imagem.alt}
            fill
            sizes="(max-width: 939px) 100vw, 33vw"
          />
        ) : (
          /* IMAGEM PENDENTE - adicionar "imagem" no frontmatter do
             arquivo content/blog/<slug>.mdx para o cartão mostrar a foto. */
          <span className={estilos.midiaPendente}>Imagem em breve</span>
        )}
      </div>

      <div className={estilos.corpo}>
        <div className={estilos.meta}>
          <span className={estilos.categoria}>{artigo.categoria}</span>
          <span aria-hidden className={estilos.separador} />
          <time dateTime={artigo.data}>{formatarData(artigo.data)}</time>
        </div>

        <h3 className={estilos.titulo}>{artigo.titulo}</h3>
        <p className={estilos.resumo}>{artigo.resumo}</p>

        <span className={estilos.acao}>
          Ler artigo
          <Seta />
        </span>
      </div>
    </Link>
  );
}