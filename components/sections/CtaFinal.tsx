import { Botao } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Seta, Whatsapp } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/site";
import estilos from "./CtaFinal.module.css";

export function CtaFinal({
  titulo = "Quer conversar sobre a contabilidade da sua empresa?",
  descricao,
  rotulo = "Solicitar proposta",
  href = "/contato",
}: {
  titulo?: string;
  descricao?: string;
  rotulo?: string;
  href?: string;
}) {
  return (
    <section className={estilos.cta}>
      <Container>
        <div className={estilos.grade}>
          <div>
            <h2 className={estilos.titulo}>{titulo}</h2>
            {descricao ? <p className={estilos.descricao}>{descricao}</p> : null}
          </div>

          <div className={estilos.acoes}>
            <Botao href={href} variante="claro" porte="lg">
              {rotulo}
              <Seta className={estilos.icone} />
            </Botao>
            <Botao
              href={whatsappLink(
                "Olá! Vim pelo site da Greentax e gostaria de falar com um especialista.",
              )}
              externo
              variante="contornoClaro"
              porte="lg"
            >
              <Whatsapp className={estilos.icone} />
              Falar no WhatsApp
            </Botao>
          </div>
        </div>
      </Container>
    </section>
  );
}
