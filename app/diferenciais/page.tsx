import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CtaFinal } from "@/components/sections/cta-final";
import { Section, TituloSecao } from "@/components/ui/section";
import { Pendente } from "@/components/ui/pendente";
import { IconeTecnologia } from "@/components/ui/icons";
import { diferenciais } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Diferenciais",
  description:
    "Inteligência antes da burocracia, relacionamento próximo, tecnologia que aproxima e planejamento para crescer — por que empresas escolhem a Greentax.",
  alternates: { canonical: "/diferenciais" },
};

export default function Diferenciais() {
  return (
    <>
      <PageHero
        sobretitulo="Diferenciais"
        titulo="Mais do que contabilidade em dia"
        descricao="Cumprir obrigações é o mínimo esperado. O que diferencia a Greentax é o que vem depois disso."
      />

      <Section>
        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {diferenciais.map((item, i) => (
            <div key={item.titulo} className="flex gap-5">
              <span className="text-2xl font-bold text-brand-500 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-xl font-semibold text-ink-900">
                  {item.titulo}
                </h2>
                <p className="mt-2 leading-relaxed text-ink-500">
                  {item.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Tecnologia / plataforma */}
      <Section fundo="claro">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="flex size-12 items-center justify-center rounded-full bg-brand-100">
              <IconeTecnologia className="size-6 text-brand-800" />
            </span>
            <TituloSecao
              titulo="Tecnologia que aproxima"
              descricao="Plataforma própria para você acompanhar sua empresa em tempo real — acesso digital a faturamento, certidões e impostos, e comunicação direta com o time."
            />
          </div>

          <div className="lg:col-span-7">
            <Pendente titulo="Detalhes da plataforma / aplicativo do cliente">
              <p>
                O briefing menciona um ERP/aplicativo do cliente e uma cláusula
                contratual de comunicação prioritária por plataforma própria. Para
                fechar esta seção preciso saber:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Nome da plataforma e se ela já está no ar</li>
                <li>O que o cliente consegue fazer nela hoje</li>
                <li>Se haverá link de acesso (login) no header do site</li>
                <li>Prints ou mockups da interface, se puderem ser divulgados</li>
              </ul>
              <p className="mt-3">
                O item 10 do briefing pede deixar a área reservada para essa
                integração mesmo que não entre na v1 — a rota já pode ser criada
                depois sem refazer o layout.
              </p>
            </Pendente>
          </div>
        </div>
      </Section>

      {/* Depoimentos */}
      <Section>
        <TituloSecao
          sobretitulo="Prova social"
          titulo="O que dizem nossos clientes"
        />
        <Pendente titulo="Depoimentos e cases" className="mt-10">
          O briefing marca este bloco como &ldquo;se houver&rdquo;. Se a Greentax
          reunir depoimentos, o ideal é nome, empresa, cargo e — quando possível —
          um resultado concreto (valor recuperado, tempo economizado). Sem
          autorização por escrito, melhor deixar a seção fora do ar do que publicar
          depoimento genérico.
        </Pendente>
      </Section>

      <CtaFinal titulo="Fale com a Greentax" rotulo="Fale com a Greentax" />
    </>
  );
}
