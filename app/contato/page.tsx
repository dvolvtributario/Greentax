import type { Metadata } from "next";
import { FormularioContato } from "@/components/sections/FormularioContato";
import { Container } from "@/components/ui/Container";
import { Envelope, Escudo, Instagram, Local, Whatsapp } from "@/components/ui/Icons";
import { PageHero } from "@/components/sections/PageHero";
import { site, whatsappLink } from "@/lib/site";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Conte o que sua empresa precisa. A Greentax avalia o cenário e retorna com um diagnóstico inicial.",
  alternates: { canonical: "/contato" },
};

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

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.091425208732!2d-50.437224799999996!3d-21.228222899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9496435a5c7055b3%3A0xf0a7ee7a90e78908!2sDvolv%20Intelig%C3%AAncia%20tribut%C3%A1ria!5e0!3m2!1spt-BR!2sbr!4v1787861041430!5m2!1spt-BR!2sbr"
                className={estilos.pendenteMapa}
                width="500"
                height="450"
                style={{ border: 0 }}
                title="Mapa de localização da Greentax"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
