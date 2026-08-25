import { Container } from "@/components/ui/Container";
import estilos from "./PageHero.module.css";

export function PageHero({
  rotulo,
  titulo,
  lead,
  children,
}: {
  rotulo: string;
  titulo: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className={estilos.hero}>
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
