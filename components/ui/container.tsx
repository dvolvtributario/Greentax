import estilos from "./Container.module.css";

export function Container({
  children,
  largura = "padrao",
  className,
}: {
  children: React.ReactNode;
  largura?: "padrao" | "estreito" | "largo";
  className?: string;
}) {
  const variante =
    largura === "estreito"
      ? estilos.estreito
      : largura === "largo"
        ? estilos.largo
        : "";

  return (
    <div className={[estilos.container, variante, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
