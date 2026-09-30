import estilos from "./Pendente.module.css";


export function Pendente({
  titulo,
  children,
  compacto = false,
  tema = "claro",
  className,
}: {
  titulo: string;
  children?: React.ReactNode;
  compacto?: boolean;
  tema?: "claro" | "escuro";
  className?: string;
}) {
  return (
    <div
      role="note"
      data-pendente
      className={[
        estilos.pendente,
        compacto ? estilos.compacto : "",
        tema === "escuro" ? estilos.escuro : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={estilos.rotulo}>A preencher</span>
      <p className={estilos.titulo}>{titulo}</p>
      {children ? <div className={estilos.corpo}>{children}</div> : null}
    </div>
  );
}
