"use client";

import Script from "next/script";
import { scriptsPorCategoria } from "@/lib/cookies";
import { useConsentimento } from "./useConsentimento";


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
