import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { CabecalhoSecao, Section } from "@/components/ui/Section";
import { Revelar } from "@/components/ui/Revelar";
import { Botao } from "@/components/ui/Button";
import { FAQ } from "@/components/sections/FAQ";
import { Ponto, Whatsapp } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/site";
import p from "@/app/paginas.module.css";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Da escrituração e dos tributos no prazo ao planejamento tributário e à recuperação de créditos: soluções contábeis, fiscais, trabalhistas e de consultoria para a sua empresa.",
  alternates: { canonical: "/solucoes" },
};

const servicos = [
  {
    tag: "A rotina da empresa",
    titulo: "Contábil, Fiscal e Trabalhista",
    texto:
      "A rotina mensal em ordem: escrituração, tributos no prazo, folha de pagamento e obrigações acessórias, sem multa, sem atraso e sem pagar imposto a mais.",
    destaques: [
      "Escrituração e demonstrações dentro da lei",
      "Apuração de tributos pela operação real",
      "Folha, eSocial e EFD-Reinf processados no prazo",
    ],
    imagem: "/marca/contabil-fiscal-trabalhista.jpg",
    alt: "Equipe da Greentax em reunião com cliente",
    href: "/solucoes/contabil-fiscal-trabalhista",
    ctaPrincipal: "Conhecer a rotina",
    ctaMensagem:
      "Olá! Quero entender como funciona a contabilidade recorrente da Greentax.",
  },
  {
    tag: "Sob demanda",
    titulo: "Consultoria Estratégica",
    texto:
      "Para as situações que pedem um olhar dedicado: planejamento tributário, recuperação de créditos, transação de débitos e defesa em fiscalizações.",
    destaques: [
      "Planejamento tributário para pagar menos, dentro da lei",
      "Levantamento e recuperação de créditos",
      "Transação, parcelamento e defesa em fiscalizações",
    ],
    imagem: "/marca/consultoria-estrategica.jpg",
    alt: "Análise de documentos para planejamento tributário",
    href: "/solucoes/consultoria-estrategica",
    ctaPrincipal: "Conhecer a consultoria",
    ctaMensagem:
      "Olá! Tenho uma situação tributária e quero entender como a consultoria da Greentax pode ajudar.",
  },
];

const faq = [
  {
    pergunta: "Como sei se preciso da rotina ou da consultoria?",
    resposta:
      "A rotina cuida do que acontece todos os meses: escrituração, tributos, folha e obrigações no prazo. A consultoria entra quando surge uma questão específica, como uma fiscalização, um plano tributário ou créditos a recuperar. Se a empresa ainda não tem a parte contábil organizada, o caminho natural é começar pela rotina.",
  },
  {
    pergunta: "E se eu precisar das duas ao mesmo tempo?",
    resposta:
      "É mais comum do que parece. Uma fiscalização, por exemplo, pode chegar num momento em que a rotina também precisa continuar. Nesses casos as duas frentes andam juntas, com a mesma equipe e sem abrir mão de prazos.",
  },
  {
    pergunta: "Como começa o trabalho?",
    resposta:
      "Com uma conversa para entender a empresa: atividade, porte, regime tributário e o momento atual. A partir dela montamos o plano, seja para assumir a rotina, seja para desenhar um trabalho de consultoria específico.",
  },
  {
    pergunta: "Ficar sem contador durante a troca é um risco?",
    resposta:
      "Não. A transição é conduzida para que nenhuma obrigação fique descoberta: pedimos os arquivos ao contador anterior, conferimos a situação fiscal e societária e assumimos a partir da competência combinada.",
  },
];

export default function Solucoes() {
  return (
    <>
      <PageHero
        rotulo="Soluções"
        titulo="Contabilidade para o dia a dia e para a estratégia do seu negócio."
        lead=""
        imagem={{
          src: "/marca/hero-solucoes.jpg",
          alt: "",
        }}
      >
        <div className={estilos.heroAcoes}>
          <Botao
            href={whatsappLink("Olá! Quero entender qual solução a Greentax recomenda para a minha empresa.")}
            externo
            porte="lg"
          >
            <Whatsapp className={p.iconeBotao} />
            Quero conversar
          </Botao>
        </div>
      </PageHero>

      <Revelar>
        <Section className={estilos.surgirTexto}>
          <CabecalhoSecao
            rotulo="Nossos serviços"
            titulo="Duas frentes para cuidar da sua empresa"
            lead="A rotina mensal e as situações que pedem um olhar dedicado. Escolha a frente que atende ao momento do seu negócio."
          />
          <div className={estilos.servicos}>
            {servicos.map((servico, indice) => (
              <article
                key={servico.titulo}
                className={`${estilos.servico} ${indice % 2 === 1 ? estilos.servicoInvertido : ""}`}
              >
                <div className={estilos.servicoImagem}>
                  <Image
                    src={servico.imagem}
                    alt={servico.alt}
                    fill
                    sizes="(max-width: 899px) 100vw, 50vw"
                  />
                </div>
                <div className={estilos.servicoConteudo}>
                  <span className={estilos.servicoTag}>{servico.tag}</span>
                  <h2 className={estilos.servicoTitulo}>{servico.titulo}</h2>
                  <p className={estilos.servicoTexto}>{servico.texto}</p>
                  <ul className={estilos.servicoLista}>
                    {servico.destaques.map((item) => (
                      <li key={item}>
                        <Ponto />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={estilos.servicoAcoes}>
                    <Botao href={servico.href} porte="md">
                      {servico.ctaPrincipal}
                    </Botao>
                    <Botao
                      href={whatsappLink(servico.ctaMensagem)}
                      externo
                      variante="contorno"
                      porte="md"
                    >
                      <Whatsapp className={p.iconeBotao} />
                      Conversar no WhatsApp
                    </Botao>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </Revelar>

      <Revelar>
        <Section fundo="papel2" className={estilos.apareceEsquerda}>
          <CabecalhoSecao
            rotulo="Perguntas frequentes"
            titulo="Dúvidas de quem está decidindo"
          />
          <FAQ itens={faq} />
        </Section>
      </Revelar>
    </>
  );
}