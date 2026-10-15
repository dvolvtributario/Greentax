import type { Metadata } from "next";
import Image from "next/image";
import { Files, MessagesSquare, Receipt, RefreshCw } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CarrosselTelas } from "@/components/sections/CarrosselTelas";
import { CabecalhoSecao, Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Revelar } from "@/components/ui/Revelar";
import { aplicativo, diferenciais } from "@/lib/conteudo";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: "Diferenciais",
  description:
    "Veja como a Greentax trabalha com rotina contábil, informação, tecnologia e atendimento próximo.",
  alternates: { canonical: "/diferenciais" },
};

const recursosApp = [
  {
    icone: Receipt,
    titulo: "Pagamentos pendentes",
    texto:
      "Acompanhe os processos com pagamento pendente e se mantenha em dia.",
  },
  {
    icone: Files,
    titulo: "Documentos de qualquer lugar",
    texto:
      "Envie e acompanhe os documentos com a contabilidade de onde estiver.",
  },
  {
    icone: MessagesSquare,
    titulo: "Conversa direta",
    texto:
      "Converse direto com a contabilidade pelo aplicativo, sem intermediários.",
  },
  {
    icone: RefreshCw,
    titulo: "Guias em poucos toques",
    texto: "Atualize guias de pagamento de forma prática e rápida.",
  },
];

export default function Diferenciais() {
  return (
    <>
      <PageHero
        rotulo="Diferenciais"
        titulo="O jeito de trabalhar aparece nos detalhes."
        lead="Prazo, resposta, conferência e conversa com o cliente fazem parte do serviço tanto quanto a entrega das obrigações."
      />

      <div className={estilos.ondaInvertida} aria-hidden="true">
        <svg
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 135 C 280 230, 650 220, 930 140 C 1130 90, 1300 20, 1440 10 L 1440 600 L 0 600 Z"
            fill="var(--verde-500)"
          />
          <path
            d="M 0 160 C 280 255, 650 245, 930 165 C 1130 115, 1300 45, 1440 40 L 1440 600 L 0 600 Z"
            fill="var(--verde-700)"
          />
          <path
            d="M 0 185 C 280 280, 650 270, 930 190 C 1130 140, 1300 70, 1440 70 L 1440 600 L 0 600 Z"
            fill="var(--verde-900)"
          />
        </svg>
      </div>

      <section className={estilos.principal}>
        <Revelar className={estilos.deslizaGrade}>
          <Container>
            <ol className={estilos.grade}>
              {diferenciais.map((item, i) => (
                <li key={item.titulo} className={estilos.diferencial}>
                  <span className={estilos.numero}>{String(i + 1).padStart(2, "0")}</span>
                  <h2 className={estilos.titulo}>{item.titulo}</h2>
                  <p className={estilos.descricao}>{item.descricao}</p>
                </li>
              ))}
            </ol>
          </Container>
        </Revelar>
      </section>

      <div className={estilos.onda} aria-hidden="true">
        <svg
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 135 C 280 230, 650 220, 930 140 C 1130 90, 1300 20, 1440 10 L 1440 600 L 0 600 Z"
            fill="var(--verde-500)"
          />
          <path
            d="M 0 160 C 280 255, 650 245, 930 165 C 1130 115, 1300 45, 1440 40 L 1440 600 L 0 600 Z"
            fill="var(--verde-700)"
          />
          <path
            d="M 0 185 C 280 280, 650 270, 930 190 C 1130 140, 1300 70, 1440 70 L 1440 600 L 0 600 Z"
            fill="var(--verde-900)"
          />
        </svg>
      </div>

      <Section fundo="papel2">
        <div className={estilos.appGrade}>
          <div>
            <CabecalhoSecao
              rotulo="Aplicativo Greentax"
              titulo="A sua contabilidade no bolso"
              lead="Processos, documentos, conversas e guias em um aplicativo só. O cliente acompanha o que importa de qualquer lugar e resolve o pendente em poucos toques."
            />
            <ul className={estilos.appRecursos}>
              {recursosApp.map((recurso) => (
                <li key={recurso.titulo} className={estilos.appRecurso}>
                  <span
                    className={estilos.appRecursoIcone}
                    aria-hidden="true"
                  >
                    <recurso.icone size={22} strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3>{recurso.titulo}</h3>
                    <p>{recurso.texto}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={estilos.appVisual}>
            <div className={estilos.appPrincipal}>
              <Image
                src={aplicativo.principal.src}
                alt={aplicativo.principal.alt}
                width={738}
                height={1600}
                sizes="240px"
              />
            </div>
            <CarrosselTelas className={estilos.appCarrossel} />
          </div>
        </div>
      </Section>
    </>
  );
}
