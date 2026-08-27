"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navegacao } from "@/lib/site";
import { Botao } from "@/components/ui/Button";
import { Fechar, Menu, Seta } from "@/components/ui/Icons";
import estilos from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);

  // Trava o scroll da página enquanto o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
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
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={estilos.link}
                  aria-current={ativo(item.href) ? "page" : undefined}
                >
                  {item.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={estilos.acoes}>
          <Botao href="/contato" className={estilos.cta}>
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
            href="/contato"
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
