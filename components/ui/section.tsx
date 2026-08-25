import { cn } from "@/lib/utils";
import { Container } from "./container";

export function Section({
  children,
  className,
  containerClassName,
  size = "default",
  fundo = "branco",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  size?: "default" | "narrow" | "wide";
  fundo?: "branco" | "claro" | "verde";
  id?: string;
}) {
  const fundos = {
    branco: "bg-surface",
    claro: "bg-surface-2",
    verde: "bg-brand-900 text-brand-100",
  };

  return (
    <section id={id} className={cn("py-16 sm:py-24", fundos[fundo], className)}>
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}

/** Cabeçalho padrão de seção: sobretítulo, título e linha de apoio. */
export function TituloSecao({
  sobretitulo,
  titulo,
  descricao,
  alinhamento = "esquerda",
  claro = false,
}: {
  sobretitulo?: string;
  titulo: React.ReactNode;
  descricao?: React.ReactNode;
  alinhamento?: "esquerda" | "centro";
  claro?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        alinhamento === "centro" && "mx-auto text-center",
      )}
    >
      {sobretitulo ? (
        <p
          className={cn(
            "mb-3 text-sm font-semibold tracking-[0.14em] uppercase",
            claro ? "text-brand-200" : "text-brand-600",
          )}
        >
          {sobretitulo}
        </p>
      ) : null}

      <h2
        className={cn(
          "text-3xl leading-[1.15] font-bold sm:text-4xl",
          claro && "text-white",
        )}
      >
        {titulo}
      </h2>

      {descricao ? (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            claro ? "text-brand-100" : "text-ink-500",
          )}
        >
          {descricao}
        </p>
      ) : null}
    </div>
  );
}
