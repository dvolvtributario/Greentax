import Image from "next/image";
import { Container } from "@/components/ui/Container";
import estilos from "./PageHero.module.css";

export function PageHero({
  rotulo,
  titulo,
  lead,
  imagem,
  cobertura = false,
  corte,
  decoracao,
  children,
}: {
  rotulo: string;
  titulo: React.ReactNode;
  lead?: React.ReactNode;
  imagem?: {
    src: string;
    alt: string;
  };
  cobertura?: boolean;
  corte?: "diagonal";
  decoracao?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={[
        estilos.hero,
        imagem ? (cobertura ? estilos.heroCobertura : estilos.heroComImagem) : "",
        corte === "diagonal" ? estilos.heroCorteDiagonal : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {imagem ? (
        <div className={estilos.imagemWrap}>
          <Image
            className={estilos.imagem}
            src={imagem.src}
            alt={imagem.alt}
            fill
            priority
            sizes={
              cobertura
                ? "100vw"
                : corte === "diagonal"
                  ? "(max-width: 939px) 100vw, 50vw"
                  : "(max-width: 939px) 100vw, 58vw"
            }
          />
        </div>
      ) : null}
      {corte === "diagonal" ? (
        <svg aria-hidden="true" focusable="false" className={estilos.corteSvg}>
          <defs>
            <clipPath id="pagehero-corte-diagonal" clipPathUnits="objectBoundingBox">
              <path d="M0,0 L1,0 L1,0.716 C0.62,0.775 0.42,0.8 0.3,0.822 C0.22,0.838 0.17,0.847 0.118,0.847 Z" />
            </clipPath>
          </defs>
        </svg>
      ) : null}
      {decoracao ? (
        <div className={estilos.decoracao} aria-hidden="true">
          {decoracao}
        </div>
      ) : null}
      <Container>
        <p className={estilos.rotulo}>{rotulo}</p>
        <div className={estilos.grade}>
          <h1 className={estilos.titulo}>{titulo}</h1>
          {lead ? <p className={estilos.lead}>{lead}</p> : null}
        </div>
        {children ? <div className={estilos.extra}>{children}</div> : null}
      </Container>
    </section>
  );
}
