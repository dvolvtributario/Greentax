import { FormularioContato } from "@/components/sections/FormularioContato";
import { Container } from "@/components/ui/Container";
import { Envelope, Escudo, Instagram, Local, Whatsapp } from "@/components/ui/Icons";
import { PageHero } from "@/components/sections/PageHero";
import { MapaGoogle } from "@/components/sections/MapaGoogle";
import { site, whatsappLink } from "@/lib/site";
import { metadadosPagina } from "@/lib/seo";
import estilos from "./page.module.css";

export const metadata = metadadosPagina({
  titulo: "Contato: Contabilidade em Araçatuba/SP",
  descricao:
    "Conte o que sua empresa precisa. A Greentax avalia o cenário e retorna com um diagnóstico inicial.",
  rota: "/contato",
});

export default function Contato() {
  return (
    <>
      <PageHero
        rotulo="Contato"
        titulo="Conte o que está acontecendo na sua empresa."
        lead=""
        cobertura
        imagem={{
          src: "/marca/hero-contato.jpg",
          alt: "",
        }}
      />

      <section className={estilos.secao}>
        <Container>
          <div className={estilos.grade}>
            <div>
              <h2 className={estilos.tituloForm}>Vamos conversar</h2>
              <p className={estilos.aviso}>
                Campos marcados com <span className={estilos.obrigatorio}>*</span> são
                obrigatórios.
              </p>
              <div className={estilos.form}>
                <FormularioContato />
              </div>
            </div>

            <aside>
              <div className={estilos.painel}>
                <h2 className={estilos.painelTitulo}>{site.razaoSocial}</h2>

                <ul className={estilos.dados}>
                  <li className={estilos.dado}>
                    <Local />
                    <span>
                      {site.endereco.logradouro}
                      <br />
                      {site.endereco.complemento}
                      <br />
                      {site.endereco.bairro} — {site.endereco.cidade}/
                      {site.endereco.estado}
                    </span>
                  </li>

                  <li className={estilos.dado}>
                    <Whatsapp />
                    <a
                      href={whatsappLink(
                        "Olá! Vim pelo site e gostaria de falar com um especialista da Greentax.",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {site.contato.whatsappExibicao}
                    </a>
                  </li>

                  {site.contato.email ? (
                    <li className={estilos.dado}>
                      <Envelope />
                      <a href={`mailto:${site.contato.email}`}>{site.contato.email}</a>
                    </li>
                  ) : null}

                  {site.redes.map((rede) => (
                    <li key={rede.url} className={estilos.dado}>
                      <Instagram />
                      <a href={rede.url} target="_blank" rel="noopener noreferrer">
                        {rede.nome}
                      </a>
                    </li>
                  ))}
                </ul>

                <p className={estilos.lgpd}>
                  <Escudo />
                  <span>
                    Os dados enviados pelo formulário são tratados conforme a Lei Geral
                    de Proteção de Dados (LGPD).
                  </span>
                </p>
              </div>

              <MapaGoogle />
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
