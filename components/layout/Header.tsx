"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navegacao, whatsappLink } from "@/lib/site";
import { Botao } from "@/components/ui/Button";
import { Fechar, Menu, Seta } from "@/components/ui/Icons";
import { ChevronDown } from "lucide-react";
import estilos from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);

  // Trava a rolagem da página enquanto o menu mobile está aberto. A trava vai
  // no <html> (documentElement) e não no <body>: o globals.css usa
  // `html { overflow-x: clip }`, o que impede a propagação do overflow do body
  // para a viewport — com `overflow: hidden` no body ele viraria um scroll
  // container próprio e o header sticky reancoraria nele (pulando para o topo
  // do documento quando o menu abre longe do topo, "escondendo" o menu).
  useEffect(() => {
    const raiz = document.documentElement;
    raiz.style.overflow = aberto ? "hidden" : "";
    return () => {
      raiz.style.overflow = "";
    };
  }, [aberto]);

  const ativo = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={estilos.cabecalho}>
      <div className={estilos.barra}>
        <Link href="/" className={estilos.marca} aria-label="Greentax — página inicial">
          {/* Só o wordmark: na altura da barra a assinatura ficaria ilegível. */}
          <Image
            src="/marca/greentax-wordmark.png"
            alt="Greentax — Contabilidade e Assessoria Empresarial"
            width={846}
            height={162}
            className={estilos.logo}
            fetchPriority="high"
            loading="eager"
          />
        </Link>

        <nav aria-label="Principal" className={estilos.nav}>
          <ul className={estilos.lista}>
            {navegacao.map((item) => {
              if (item.href === "/solucoes") {
                return (
                  <li key={item.href} className={estilos.itemDropdown}>
                    <Link
                      href={item.href}
                      className={`${estilos.link} ${estilos.linkComSeta}`}
                      aria-current={ativo(item.href) ? "page" : undefined}
                      onClick={(e) => e.currentTarget.blur()}
                    >
                      {item.titulo}
                      <ChevronDown size={14} className={estilos.seta} aria-hidden="true" />
                    </Link>
                    <div className={estilos.dropdown}>
                      <Link
                        href="/solucoes/contabil-fiscal-trabalhista"
                        className={estilos.dropdownItem}
                        onClick={(e) => e.currentTarget.blur()}
                      >
                        <span className={estilos.dropdownTag}>A rotina da empresa</span>
                        <span className={estilos.dropdownTitulo}>
                          Contábil, Fiscal e Trabalhista
                        </span>
                      </Link>
                      <Link
                        href="/solucoes/consultoria-estrategica"
                        className={estilos.dropdownItem}
                        onClick={(e) => e.currentTarget.blur()}
                      >
                        <span className={estilos.dropdownTag}>Sob demanda</span>
                        <span className={estilos.dropdownTitulo}>
                          Consultoria Estratégica
                        </span>
                      </Link>
                    </div>
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={estilos.link}
                    aria-current={ativo(item.href) ? "page" : undefined}
                  >
                    {item.titulo}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={estilos.acoes}>
          <Botao href={whatsappLink()} externo className={estilos.cta}>
            Falar com a Greentax
          </Botao>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className={estilos.alternador}
          >
            {aberto ? <Fechar /> : <Menu />}
          </button>
        </div>
      </div>

      <div id="menu-mobile" hidden={!aberto} className={estilos.painel}>
        <nav aria-label="Principal (mobile)" className={estilos.painelInterno}>
          <ul>
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setAberto(false)}
                  className={estilos.linkMobile}
                  aria-current={ativo(item.href) ? "page" : undefined}
                >
                  {item.titulo}
                  <Seta />
                </Link>
              </li>
            ))}
          </ul>

          <Botao
            href={whatsappLink()}
            externo
            porte="lg"
            className={estilos.ctaMobile}
            onClick={() => setAberto(false)}
          >
            Falar com a Greentax
          </Botao>
        </nav>
      </div>
    </header>
  );
}
