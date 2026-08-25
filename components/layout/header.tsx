"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navegacao } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Botao } from "@/components/ui/button";
import { IconeFechar, IconeMenu } from "@/components/ui/icons";

export function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

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
    <header
      className={cn(
        "sticky top-0 z-50 bg-surface/90 backdrop-blur-md transition-shadow duration-200",
        rolou ? "shadow-[0_1px_0_0_var(--color-ink-200),0_8px_24px_-20px_rgba(16,21,18,0.5)]" : "shadow-[0_1px_0_0_transparent]",
      )}
    >
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="shrink-0" aria-label="Greentax — página inicial">
          {/* Só o wordmark no header: na altura da barra a assinatura
              "Contabilidade e Assessoria Empresarial" ficaria ilegível. */}
          <Image
            src="/marca/greentax-wordmark.png"
            alt="Greentax — Contabilidade e Assessoria Empresarial"
            width={846}
            height={162}
            className="h-7 w-auto sm:h-8"
            fetchPriority="high"
            loading="eager"
          />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={ativo(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    ativo(item.href)
                      ? "bg-brand-50 text-brand-800"
                      : "text-ink-700 hover:bg-ink-100 hover:text-ink-900",
                  )}
                >
                  {item.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* O wrapper controla a visibilidade: aplicar `hidden` direto no botão
              conflita com o `inline-flex` da própria variante. */}
          <span className="hidden md:block">
            <Botao href="/contato">Solicitar proposta</Botao>
          </span>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className="inline-flex size-11 items-center justify-center rounded-full text-ink-900 hover:bg-ink-100 lg:hidden"
          >
            {aberto ? <IconeFechar className="size-6" /> : <IconeMenu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        hidden={!aberto}
        className="border-t border-ink-200 bg-surface lg:hidden"
      >
        <nav aria-label="Principal (mobile)" className="px-5 py-4 sm:px-8">
          <ul className="flex flex-col">
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setAberto(false)}
                  aria-current={ativo(item.href) ? "page" : undefined}
                  className={cn(
                    "block border-b border-ink-100 py-3.5 text-base font-medium",
                    ativo(item.href) ? "text-brand-800" : "text-ink-700",
                  )}
                >
                  {item.titulo}
                </Link>
              </li>
            ))}
          </ul>
          <Botao
            href="/contato"
            tamanho="lg"
            className="mt-5 w-full"
            onClick={() => setAberto(false)}
          >
            Solicitar proposta
          </Botao>
        </nav>
      </div>
    </header>
  );
}
