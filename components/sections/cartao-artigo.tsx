import Link from "next/link";
import { formatarData, type ArtigoComSlug } from "@/lib/blog";
import { IconeSeta } from "@/components/ui/icons";

export function CartaoArtigo({ artigo }: { artigo: ArtigoComSlug }) {
  return (
    <Link
      href={`/blog/${artigo.slug}`}
      className="group flex h-full flex-col rounded-card border border-ink-200 bg-surface p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover"
    >
      <div className="flex items-center gap-3 text-xs">
        <span className="rounded-full bg-brand-50 px-3 py-1 font-semibold text-brand-800">
          {artigo.categoria}
        </span>
        <time dateTime={artigo.data} className="text-ink-500">
          {formatarData(artigo.data)}
        </time>
      </div>

      <h3 className="mt-4 text-lg leading-snug font-semibold text-ink-900">
        {artigo.titulo}
      </h3>
      <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-500">
        {artigo.resumo}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-800">
        Ler artigo
        <IconeSeta className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
