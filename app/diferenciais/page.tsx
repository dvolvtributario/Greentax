import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { CabecalhoSecao, Section } from "@/components/ui/Section";
import { Pendente } from "@/components/ui/Pendente";
import { diferenciais } from "@/lib/conteudo";
import p from "@/app/paginas.module.css";
import estilos from "./page.module.css";

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
        rotulo="Diferenciais"
        titulo="Mais do que contabilidade em dia"
        lead="Cumprir obrigações é o mínimo esperado. O que diferencia a Greentax é o que vem depois disso."
      />

      <Section>
        <ol className={estilos.lista}>
          {diferenciais.map((item, i) => (
            <li key={item.titulo} className={estilos.item}>
              <span className={estilos.numero}>{String(i + 1).padStart(2, "0")}</span>
              <h2 className={estilos.titulo}>{item.titulo}</h2>
              <p className={estilos.descricao}>{item.descricao}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Tecnologia */}
      <Section fundo="papel2">
        <div className={p.duasColunas}>
          <CabecalhoSecao
            rotulo="Tecnologia"
            titulo="Tecnologia que aproxima"
            lead="Plataforma própria para acompanhar a empresa em tempo real — acesso digital a faturamento, certidões e impostos, e comunicação direta com o time."
          />
          <Pendente titulo="Detalhes da plataforma / aplicativo do cliente">
            <p>
              O briefing menciona um ERP/aplicativo do cliente e uma cláusula
              contratual de comunicação prioritária por plataforma própria. Para
              fechar esta seção preciso saber:
            </p>
            <ul>
              <li>Nome da plataforma e se ela já está no ar</li>
              <li>O que o cliente consegue fazer nela hoje</li>
              <li>Se haverá link de acesso (login) no menu do site</li>
              <li>Prints ou mockups da interface, se puderem ser divulgados</li>
            </ul>
            <p>
              O item 10 do briefing pede deixar a área reservada para essa integração
              mesmo que ela não entre na v1.
            </p>
          </Pendente>
        </div>
      </Section>

      {/* Depoimentos */}
      <Section>
        <div className={p.duasColunas}>
          <CabecalhoSecao rotulo="Prova social" titulo="O que dizem nossos clientes" />
          <Pendente titulo="Depoimentos e cases">
            O briefing marca este bloco como &ldquo;se houver&rdquo;. Se a Greentax
            reunir depoimentos, o ideal é nome, empresa, cargo e — quando possível —
            um resultado concreto (valor recuperado, tempo economizado). Sem
            autorização por escrito, melhor deixar a seção fora do ar do que publicar
            depoimento genérico.
          </Pendente>
        </div>
      </Section>

      <CtaFinal titulo="Fale com a Greentax" rotulo="Fale com a Greentax" />
    </>
  );
}
