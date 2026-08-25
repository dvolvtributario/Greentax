import { Container } from "@/components/ui/container";

export function PageHero({
  sobretitulo,
  titulo,
  descricao,
  children,
}: {
  sobretitulo: string;
  titulo: React.ReactNode;
  descricao?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink-200 bg-surface-2 py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(48rem_24rem_at_80%_-20%,var(--color-brand-50),transparent)]"
      />
      <Container>
        <p className="text-sm font-semibold tracking-[0.14em] text-brand-600 uppercase">
          {sobretitulo}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.1] font-bold sm:text-5xl">
          {titulo}
        </h1>
        {descricao ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">
            {descricao}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </section>
  );
}
