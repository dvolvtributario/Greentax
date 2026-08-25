import { Container } from "@/components/ui/Container";
import { Pendente } from "@/components/ui/Pendente";
import { site } from "@/lib/site";
import estilos from "./ProvaSocial.module.css";

const formatar = (n: number) => new Intl.NumberFormat("pt-BR").format(n);

/**
 * Indicadores numéricos + logos de clientes.
 *
 * O briefing é explícito: "os números precisam ser fornecidos/validados pela
 * Greentax antes da publicação — não usar dados fictícios". Enquanto
 * `site.indicadores` estiver com `null`, a seção mostra a lacuna em vez de
 * inventar números.
 */
export function ProvaSocial() {
  const { empresasAtendidas, anosDeMercado, obrigacoesNoPrazo } = site.indicadores;

  const indicadores = [
    { valor: empresasAtendidas, sufixo: "+", legenda: "Empresas atendidas" },
    { valor: anosDeMercado, sufixo: "", legenda: "Anos de mercado" },
    { valor: obrigacoesNoPrazo, sufixo: "%", legenda: "Obrigações entregues no prazo" },
  ];

  const preenchidos = indicadores.filter((i) => i.valor !== null);

  return (
    <section className={estilos.faixa}>
      <Container>
        {preenchidos.length > 0 ? (
          <dl className={estilos.indicadores}>
            {preenchidos.map((item) => (
              <div key={item.legenda} className={estilos.indicador}>
                <dt className="sr-only">{item.legenda}</dt>
                <dd>
                  <span className={estilos.valor}>
                    {formatar(item.valor as number)}
                    <span className={estilos.sufixo}>{item.sufixo}</span>
                  </span>
                  <span className={estilos.legenda}>{item.legenda}</span>
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <Pendente titulo="Indicadores numéricos (prova social)">
            <p>
              Faltam os três números que o briefing pede em destaque na Home:{" "}
              <strong>empresas atendidas</strong>, <strong>anos de mercado</strong> e{" "}
              <strong>% de obrigações entregues no prazo</strong>.
            </p>
            <p>
              Assim que a Greentax validar os valores, preencha{" "}
              <code>site.indicadores</code> em <code>lib/site.ts</code> — a faixa
              passa a renderizar sozinha. O briefing proíbe expressamente números
              fictícios, então nada foi inventado aqui.
            </p>
          </Pendente>
        )}

        <div className={estilos.clientes}>
          <h2 className={estilos.tituloClientes}>Empresas que confiam na Greentax</h2>
          <Pendente compacto titulo="Logos de clientes" className={estilos.pendenteClientes}>
            Reunir as logos autorizadas em <code>public/clientes/</code>. Vale pedir
            autorização por escrito antes de publicar a marca de cada cliente.
          </Pendente>
        </div>
      </Container>
    </section>
  );
}
