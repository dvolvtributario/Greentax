import Image from "next/image";
import { Container } from "@/components/ui/Container";
import estilos from "./PageHero.module.css";

export function PageHero({
  rotulo,
  titulo,
  lead,
  imagem,
  cobertura = false,
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
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`${estilos.hero} ${
        imagem
          ? cobertura
            ? estilos.heroCobertura
            : estilos.heroComImagem
          : ""
      }`}
    >
      {imagem ? (
        <div className={estilos.imagemWrap}>
          <Image
            className={estilos.imagem}
            src={imagem.src}
            alt={imagem.alt}
            fill
            priority
            sizes={cobertura ? "100vw" : "(max-width: 939px) 100vw, 58vw"}
          />
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
