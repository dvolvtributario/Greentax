import { Section } from "@/components/ui/section";
import { Pendente } from "@/components/ui/pendente";
import { site } from "@/lib/site";

const formatar = (n: number) => new Intl.NumberFormat("pt-BR").format(n);

/**
 * Indicadores numéricos + logos de clientes.
 *
 * O briefing é explícito: "os números precisam ser fornecidos/validados pela
 * Greentax antes da publicação — não usar dados fictícios". Portanto, enquanto
 * `site.indicadores` estiver com `null`, esta seção renderiza a lacuna em vez
 * de inventar números.
 */
export function ProvaSocial() {
  const { empresasAtendidas, anosDeMercado, obrigacoesNoPrazo } =
    site.indicadores;

  const temIndicadores =
    empresasAtendidas !== null ||
    anosDeMercado !== null ||
    obrigacoesNoPrazo !== null;

  const indicadores = [
    { valor: empresasAtendidas, sufixo: "+", rotulo: "Empresas atendidas" },
    { valor: anosDeMercado, sufixo: "", rotulo: "Anos de mercado" },
    {
      valor: obrigacoesNoPrazo,
      sufixo: "%",
      rotulo: "Obrigações entregues no prazo",
    },
  ];

  return (
    <Section>
      {temIndicadores ? (
        <dl className="grid gap-10 sm:grid-cols-3">
          {indicadores.map((item) =>
            item.valor === null ? null : (
              <div key={item.rotulo}>
                <dt className="sr-only">{item.rotulo}</dt>
                <dd>
                  <span className="block text-5xl font-bold tracking-tight text-brand-800 sm:text-6xl">
                    {formatar(item.valor)}
                    <span className="text-brand-500">{item.sufixo}</span>
                  </span>
                  <span className="mt-2 block text-sm font-medium text-ink-500">
                    {item.rotulo}
                  </span>
                </dd>
              </div>
            ),
          )}
        </dl>
      ) : (
        <Pendente titulo="Indicadores numéricos (prova social)">
          <p>
            Faltam três números que o briefing pede em destaque na Home:{" "}
            <strong>empresas atendidas</strong>, <strong>anos de mercado</strong> e{" "}
            <strong>% de obrigações entregues no prazo</strong>.
          </p>
          <p className="mt-2">
            Assim que a Greentax validar os valores, preencha{" "}
            <code className="font-mono">site.indicadores</code> em{" "}
            <code className="font-mono">lib/site.ts</code> — a seção passa a
            renderizar sozinha. O briefing proíbe expressamente números fictícios,
            então nada foi inventado aqui.
          </p>
        </Pendente>
      )}

      <div className="mt-14">
        <p className="text-center text-sm font-semibold tracking-[0.14em] text-ink-500 uppercase">
          Empresas que confiam na Greentax
        </p>
        <Pendente
          titulo="Logos de clientes"
          className="mt-6"
          compacto
        >
          Reunir as logos autorizadas e colocá-las em{" "}
          <code className="font-mono">public/clientes/</code>. Recomendo pedir
          autorização por escrito antes de publicar a marca de cada cliente.
        </Pendente>
      </div>
    </Section>
  );
}
