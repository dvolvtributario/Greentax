import { cn } from "@/lib/utils";

/**
 * Marca visualmente uma lacuna de conteúdo ainda não fornecida pela Greentax.
 *
 * Todas as pendências do site usam este componente — para listar o que falta,
 * basta procurar por `<Pendente` no projeto.
 *
 * Antes de publicar, cada ocorrência deve ser substituída pelo conteúdo real.
 * Se alguma sobrar, ela aparece de forma evidente na página (é intencional:
 * uma lacuna esquecida tem que incomodar).
 */
export function Pendente({
  titulo,
  children,
  className,
  compacto = false,
  tema = "claro",
}: {
  titulo: string;
  children?: React.ReactNode;
  className?: string;
  compacto?: boolean;
  /** Use "escuro" quando o bloco estiver sobre fundo verde (rodapé). */
  tema?: "claro" | "escuro";
}) {
  const escuro = tema === "escuro";

  return (
    <div
      role="note"
      data-pendente
      className={cn(
        "rounded-card border-2 border-dashed",
        escuro
          ? "border-amber-300/50 bg-amber-200/10"
          : "border-amber-300 bg-amber-50/70",
        compacto ? "p-4" : "p-6 sm:p-8",
        className,
      )}
    >
      <p
        className={cn(
          "flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase",
          escuro ? "text-amber-200" : "text-amber-700",
        )}
      >
        <span
          aria-hidden
          className="inline-block size-1.5 rounded-full bg-amber-400"
        />
        A preencher
      </p>
      <p
        className={cn(
          "mt-2 font-semibold",
          escuro ? "text-amber-50" : "text-amber-900",
        )}
      >
        {titulo}
      </p>
      {children ? (
        <div
          className={cn(
            "mt-2 text-sm leading-relaxed",
            escuro ? "text-amber-100/90" : "text-amber-800",
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
