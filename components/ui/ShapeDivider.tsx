import styles from "./ShapeDivider.module.css";

type FormaProps = {
  forma?: "arco" | "onda" | "bico";
  cor?: string;
  fundo?: string;
  altura?: string;
  espelhado?: boolean;
};

const caminhos: Record<NonNullable<FormaProps["forma"]>, string> = {
  arco: "M0,120 L0,72 C 360,0 1080,0 1440,72 L1440,120 Z",
  onda:
    "M0,50.4 C 150,33.6 285,30 430,48 C 610,70.8 760,93.6 920,81.6 C 1080,69.6 1210,50.4 1440,50.4 L1440,120 L0,120 Z",
  bico:
    "M0,120 L0,84 L120,54 L240,84 L360,44 L480,84 L600,54 L720,84 L840,44 L960,84 L1080,54 L1200,84 L1320,44 L1440,84 L1440,120 Z",
};

export default function ShapeDivider({
  forma = "arco",
  cor = "var(--papel)",
  fundo,
  altura,
  espelhado = false,
}: FormaProps) {
  return (
    <div
      className={styles.embrulho}
      style={fundo ? { background: fundo } : undefined}
    >
      <svg
        className={`${styles.svg} ${espelhado ? styles.espelhado : ""}`}
        style={altura ? { height: altura } : undefined}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={caminhos[forma]} fill={cor} />
      </svg>
    </div>
  );
}