import Image from "next/image";
import Link from "next/link";
import { enderecoLinhaUnica, navegacao, site, whatsappLink } from "@/lib/site";
import { Botao } from "@/components/ui/Button";
import { Envelope, Escudo, Instagram, Local, Seta, Whatsapp } from "@/components/ui/Icons";
import { Pendente } from "@/components/ui/Pendente";
import { BotaoPreferencias } from "@/components/cookies/BotaoPreferencias";
import estilos from "./Footer.module.css";

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className={estilos.rodape}>
      <div className={estilos.interno}>
        <div className={estilos.topo}>
          {/* Marca e endereço */}
          <div>
            <Image
              src="/marca/greentax-logo-branco.png"
              alt="Greentax — Contabilidade e Assessoria Empresarial"
              width={846}
              height={223}
              className={estilos.logo}
            />
            <p className={estilos.conceito}>{site.conceito}</p>

            <address className={estilos.endereco}>
              <Local />
              <span>
                {site.endereco.logradouro}
                <br />
                {site.endereco.complemento}
                <br />
                {site.endereco.bairro} — {site.endereco.cidade}/{site.endereco.estado}
                {site.endereco.cep ? (
                  <>
                    <br />
                    CEP {site.endereco.cep}
                  </>
                ) : null}
              </span>
            </address>
          </div>

          {/* Navegação */}
          <nav aria-label="Rodapé">
            <h2 className={estilos.tituloColuna}>Navegação</h2>
            <ul className={estilos.itens}>
              {navegacao.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.titulo}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <h2 className={estilos.tituloColuna}>Contato</h2>
            <ul className={estilos.itens}>
              <li>
                <a
                  href={whatsappLink(
                    "Olá! Vim pelo site e gostaria de falar com um especialista da Greentax.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Whatsapp />
                  {site.contato.whatsappExibicao}
                </a>
              </li>

              {site.contato.email ? (
                <li>
                  <a href={`mailto:${site.contato.email}`}>
                    <Envelope />
                    {site.contato.email}
                  </a>
                </li>
              ) : null}

              {site.redes.map((rede) => (
                <li key={rede.url}>
                  <a href={rede.url} target="_blank" rel="noopener noreferrer">
                    <Instagram />
                    {rede.nome}
                  </a>
                </li>
              ))}
            </ul>

            {!site.contato.email ? (
              <Pendente
                compacto
                tema="escuro"
                titulo="E-mail institucional"
                className={estilos.pendente}
              >
                Informe o e-mail da Greentax em <code>lib/site.ts</code> e ele
                aparece aqui automaticamente.
              </Pendente>
            ) : null}

            <div className={estilos.acoes}>
              <Botao href="/contato" variante="claro" porte="md">
                Solicitar proposta
                <Seta className={estilos.icone} />
              </Botao>
              <Botao
                href={whatsappLink(
                  "Olá! Vim pelo site da Greentax e gostaria de falar com um especialista.",
                )}
                externo
                variante="contornoClaro"
                porte="md"
              >
                <Whatsapp className={estilos.icone} />
                Falar no WhatsApp
              </Botao>
            </div>
          </div>
        </div>

        <div className={estilos.lgpd}>
          <Escudo />
          <p>
            Seus dados estão seguros com a gente. Tratamos todas as informações em
            conformidade com a Lei Geral de Proteção de Dados — Lei nº 13.709/2018.
          </p>
        </div>

        <div className={estilos.legal}>
          <p>
            {site.nome} · Contabilidade em {site.endereco.cidade}/{site.endereco.estado}
            <br />
            {site.razaoSocial}
            <br />
            CNPJ {site.cnpj} — {enderecoLinhaUnica}
          </p>
          <div className={estilos.legalLinks}>
            <Link href="/politica-de-privacidade">Política de Privacidade</Link>
            <BotaoPreferencias />
            <span>© {ano}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}