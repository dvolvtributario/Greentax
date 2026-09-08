import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CabecalhoSecao, Section } from "@/components/ui/Section";
import { Pendente } from "@/components/ui/Pendente";
import { diferenciais } from "@/lib/conteudo";
import p from "@/app/paginas.module.css";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: "Diferenciais",
  description:
    "Veja como a Greentax trabalha com rotina contábil, informação, tecnologia e atendimento próximo.",
  alternates: { canonical: "/diferenciais" },
};

export default function Diferenciais() {
  return (
    <>
      <PageHero
        rotulo="Diferenciais"
        titulo="O jeito de trabalhar aparece nos detalhes."
        lead="Prazo, resposta, conferência e conversa com o cliente fazem parte do serviço tanto quanto a entrega das obrigações."
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

      <Section fundo="papel2">
        <div className={p.duasColunas}>
          <CabecalhoSecao
            rotulo="Tecnologia"
            titulo="Ferramenta boa é a que deixa o trabalho mais claro."
            lead="A Greentax usa recursos digitais para acompanhar documentos, informações e prazos, mantendo o contato com a equipe por perto."
          />
          <Pendente titulo="Detalhes da plataforma do cliente">
            <p>
              Esta área será preenchida com o nome da plataforma, as funções disponíveis
              para o cliente e, se autorizado, imagens da interface.
            </p>
            <ul>
              <li>Nome da plataforma e situação atual</li>
              <li>Funções disponíveis hoje</li>
              <li>Possível link de acesso pelo menu do site</li>
              <li>Prints ou mockups autorizados para divulgação</li>
            </ul>
          </Pendente>
        </div>
      </Section>

      <Section>
        <div className={p.duasColunas}>
          <CabecalhoSecao rotulo="Prova social" titulo="O que dizem nossos clientes" />
          <Pendente titulo="Depoimentos e cases">
            O bloco entra no site quando houver depoimentos autorizados. O ideal é
            informar nome, empresa, cargo e, quando possível, um resultado que possa ser
            comprovado.
          </Pendente>
        </div>
      </Section>
    </>
  );
}
