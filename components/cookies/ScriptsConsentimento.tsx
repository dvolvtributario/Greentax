"use client";

import Script from "next/script";
import { scriptsPorCategoria } from "@/lib/cookies";
import { useConsentimento } from "./useConsentimento";

/**
 * Gate de scripts de terceiros: só injeta o que a categoria correspondente
 * autorizou. Com as listas vazias em `lib/cookies.ts`, nada é carregado —
 * ao ativar o GA4, basta lançar o script na lista certa.
 */
export function ScriptsConsentimento() {
  const { preferencias } = useConsentimento();

  if (!preferencias) return null;

  const autorizados = (
    Object.keys(scriptsPorCategoria) as Array<
      keyof typeof scriptsPorCategoria
    >
  )
    .filter((categoria) => preferencias[categoria])
    .flatMap((categoria) => scriptsPorCategoria[categoria]);

  return (
    <>
      {autorizados.map((script) => (
        <Script key={script.id} src={script.src} strategy="afterInteractive" />
      ))}
    </>
  );
}
