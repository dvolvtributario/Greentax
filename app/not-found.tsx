import Link from "next/link";
import { Container } from "@/components/ui/Container";
import estilos from "./not-found.module.css";

export default function NaoEncontrada() {
  return (
    <section className={estilos.wrap}>
      <Container>
        <p className={estilos.codigo} aria-hidden>
          404
        </p>
        <h1 className={estilos.titulo}>Página não encontrada</h1>
        <p className={estilos.texto}>
          O endereço que você abriu não existe mais ou nunca existiu. Que tal
          voltar para o início ou falar com a gente?
        </p>
        <div className={estilos.acoes}>
          <Link href="/" className={estilos.botao}>
            Voltar para o início
          </Link>
          <Link href="/contato" className={estilos.botaoContorno}>
            Falar com a Greentax
          </Link>
        </div>
      </Container>
    </section>
  );
}
