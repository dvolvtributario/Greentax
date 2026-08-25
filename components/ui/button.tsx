import Link from "next/link";
import { cn } from "@/lib/utils";

type Variante = "primario" | "secundario" | "fantasma" | "claro";
type Tamanho = "md" | "lg";

const variantes: Record<Variante, string> = {
  primario:
    "bg-brand-800 text-white hover:bg-brand-900 focus-visible:outline-brand-900",
  secundario:
    "border border-ink-200 bg-surface text-ink-900 hover:border-brand-800 hover:text-brand-800",
  fantasma: "text-brand-800 hover:text-brand-900 underline-offset-4 hover:underline",
  claro: "bg-white text-brand-900 hover:bg-brand-50",
};

const tamanhos: Record<Tamanho, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";

export function Botao({
  href,
  children,
  variante = "primario",
  tamanho = "md",
  className,
  externo = false,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  variante?: Variante;
  tamanho?: Tamanho;
  className?: string;
  externo?: boolean;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  const classes = cn(
    base,
    variantes[variante],
    variante === "fantasma" ? "h-auto px-0" : tamanhos[tamanho],
    className,
  );

  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

export function BotaoSubmit({
  children,
  variante = "primario",
  tamanho = "lg",
  className,
  ...props
}: {
  children: React.ReactNode;
  variante?: Variante;
  tamanho?: Tamanho;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variantes[variante], tamanhos[tamanho], className)}
      {...props}
    >
      {children}
    </button>
  );
}
