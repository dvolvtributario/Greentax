"use client";

import { Fragment } from "react";
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
        <Fragment key={script.id}>
          {script.codigo && (
            <Script id={`${script.id}-config`} strategy="afterInteractive">
              {script.codigo}
            </Script>
          )}
          {script.src && (
            <Script
              id={script.id}
              src={script.src}
              strategy="afterInteractive"
            />
          )}
        </Fragment>
      ))}
    </>
  );
}
