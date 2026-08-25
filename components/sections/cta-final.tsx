import { Botao } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconeSeta, IconeWhatsapp } from "@/components/ui/icons";
import { whatsappLink } from "@/lib/site";

export function CtaFinal({
  titulo = "Pronto para ter uma contabilidade que pensa junto com você?",
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
    <section className="relative overflow-hidden bg-brand-900 py-20 sm:py-28">
      {/* Linha ascendente — conceito de evolução */}
      <svg
        aria-hidden
        viewBox="0 0 1200 400"
        className="pointer-events-none absolute inset-0 size-full opacity-25"
        preserveAspectRatio="none"
      >
        <path
          d="M0 340 C 220 340, 300 250, 480 230 S 820 150, 1200 40"
          fill="none"
          stroke="var(--color-brand-500)"
          strokeWidth="2"
        />
        <path
          d="M0 390 C 260 390, 340 310, 540 292 S 880 220, 1200 120"
          fill="none"
          stroke="var(--color-brand-500)"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
      </svg>

      <Container className="relative">
        <div className="max-w-3xl">
          <h2 className="text-3xl leading-[1.15] font-bold text-white sm:text-4xl">
            {titulo}
          </h2>
          {descricao ? (
            <p className="mt-4 text-lg leading-relaxed text-brand-100">
              {descricao}
            </p>
          ) : null}

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Botao href={href} variante="claro" tamanho="lg">
              {rotulo}
              <IconeSeta className="size-5" />
            </Botao>
            <Botao
              href={whatsappLink(
                "Olá! Vim pelo site da Greentax e gostaria de falar com um especialista.",
              )}
              externo
              tamanho="lg"
              className="border border-brand-700 bg-transparent text-white hover:bg-brand-800"
            >
              <IconeWhatsapp className="size-5" />
              Falar no WhatsApp
            </Botao>
          </div>
        </div>
      </Container>
    </section>
  );
}
