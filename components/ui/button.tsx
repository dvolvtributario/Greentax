import Link from "next/link";
import estilos from "./Button.module.css";

type Variante = "solido" | "contorno" | "claro" | "contornoClaro" | "texto";
type Porte = "md" | "lg";

function classes(variante: Variante, porte: Porte, extra?: string) {
  return [
    estilos.base,
    estilos[variante],
    variante === "texto" ? "" : estilos[porte],
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Botao({
  href,
  children,
  variante = "solido",
  porte = "md",
  externo = false,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variante?: Variante;
  porte?: Porte;
  externo?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const cls = classes(variante, porte, className);

  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}

export function BotaoAcao({
  children,
  variante = "solido",
  porte = "lg",
  className,
  ...props
}: {
  children: React.ReactNode;
  variante?: Variante;
  porte?: Porte;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes(variante, porte, className)} {...props}>
      {children}
    </button>
  );
}
