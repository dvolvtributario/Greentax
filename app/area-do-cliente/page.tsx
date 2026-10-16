import type { Metadata } from "next";
import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { LogIn } from "lucide-react";
import { CabecalhoSecao, Section } from "@/components/ui/Section";
import { Revelar } from "@/components/ui/Revelar";
import { Botao } from "@/components/ui/Button";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: "Área do Cliente",
  description:
    "Passo a passo para entrar no portal da Greentax: nome da contabilidade, CPF ou CNPJ, senha e acesso ao painel do cliente.",
  alternates: { canonical: "/area-do-cliente" },
};

const portal = "https://portal.hubstrom.com/";

type Passo = {
  numero: string;
  titulo: string;
  texto: React.ReactNode;
  imagem: {
    src: string;
    alt: string;
    legenda: string;
    placeholder: string;
  };
};

const passos: Passo[] = [
  {
    numero: "01",
    titulo: "Informe o nome da contabilidade",
    texto: (
      <>
        Ao acessar o portal, digite no campo o nome da contabilidade{" "}
        <code className={estilos.codigo}>@greentaxcontabilidade</code> e, em seguida, clique em
        Continuar.
      </>
    ),
    imagem: {
      src: "/marca/area-do-cliente-passo-1.png",
      alt: "Tela inicial do portal com o nome da contabilidade preenchido",
      legenda: "Tela 1: preencha o campo com o nome da contabilidade e clique em Continuar.",
      placeholder: "Captura da tela em que o cliente digita greentaxcontabilidade",
    },
  },
  {
    numero: "02",
    titulo: "Entre com CPF ou CNPJ e senha",
    texto:
      "No primeiro campo informe o seu CPF ou CNPJ, no campo de baixo digite a sua senha e, por último, clique no botão Entrar.",
    imagem: {
      src: "/marca/area-do-cliente-passo-2.png",
      alt: "Tela de login do portal com CPF ou CNPJ, senha e botão Entrar",
      legenda: "Tela 2: CPF ou CNPJ, senha e clique em Entrar para abrir o painel.",
      placeholder: "Captura da tela de login com CPF ou CNPJ e senha",
    },
  },
];

function imagemExiste(src: string) {
  return existsSync(join(process.cwd(), "public", src.replace(/^\//, "")));
}

function Janela({ passo }: { passo: Passo }) {
  const existe = imagemExiste(passo.imagem.src);

  return (
    <div className={estilos.janela}>
      <div className={estilos.janelaBarra} aria-hidden="true">
        <span className={estilos.janelaPonto} />
        <span className={estilos.janelaPonto} />
        <span className={estilos.janelaPonto} />
        <span className={estilos.janelaUrl}>portal.hubstrom.com</span>
      </div>

      {existe ? (
        <div className={estilos.area}>
          <Image
            src={passo.imagem.src}
            alt={passo.imagem.alt}
            fill
            sizes="(max-width: 899px) 100vw, 46vw"
          />
        </div>
      ) : (
        <div className={estilos.placeholder}>
          <span className={estilos.placeholderRotulo}>Imagem pendente</span>
          <p className={estilos.placeholderTitulo}>{passo.imagem.placeholder}</p>
          <p className={estilos.placeholderTexto}>
            Salve a captura desta etapa em <code>public{passo.imagem.src}</code> e ela aparece
            aqui sozinha.
          </p>
        </div>
      )}
    </div>
  );
}

export default function AreaDoCliente() {
  return (
    <>
      <Revelar className={estilos.revelar}>
        <Section>
          <CabecalhoSecao
            nivel="h1"
            rotulo="Como funciona"
            titulo="Entre no portal da Greentax em dois passos"
            lead="O portal reúne documentos, declarações e informações da sua empresa. São duas telas até chegar ao painel: o nome da contabilidade e os seus dados de acesso."
            className={estilos.cabecalhoCentral}
          />

          <ol className={estilos.passos}>
            {passos.map((passo) => (
              <li key={passo.numero} className={estilos.passo}>
                <span className={estilos.passoNo} aria-hidden="true">
                  {passo.numero}
                </span>

                <div className={estilos.passoLado}>
                  <h2 className={estilos.passoTitulo}>{passo.titulo}</h2>
                  <p className={estilos.passoDescricao}>{passo.texto}</p>

                  <figure className={estilos.passoImagem}>
                    <Janela passo={passo} />
                    <figcaption className={estilos.legenda}>
                      {passo.imagem.legenda}
                    </figcaption>
                  </figure>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      </Revelar>

      <Section>
        <div className={estilos.cta}>
          <CabecalhoSecao
            rotulo="Portal Hubstrom"
            titulo="Pronto para entrar?"
            lead="O acesso é pelo portal da Greentax: abra em uma nova aba, repita os dois passos acima e você chega ao painel."
            className={estilos.cabecalhoCentral}
          />
          <div className={estilos.ctaAcoes}>
            <Botao
              href={portal}
              externo
              porte="lg"
              variante="solido"
              className={estilos.botaoPortal}
            >
              <LogIn size={18} strokeWidth={1.8} />
              Entrar no portal
            </Botao>
          </div>
        </div>
      </Section>
    </>
  );
}
