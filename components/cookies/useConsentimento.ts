"use client";

import { useSyncExternalStore } from "react";
import {
  COOKIE_CONSENTIMENTO,
  EVENTO_CONSENTIMENTO,
  lerPreferenciasNoNavegador,
  type Preferencias,
} from "@/lib/cookies";

/**
 * `undefined` → ainda no servidor ou antes da hidratação (nada é renderizado).
 * `null`      → visitante ainda não escolheu.
 * objeto      → escolha gravada no cookie.
 */
export type PreferenciasOuIndefinido = Preferencias | null | undefined;

let cookieLido: string | undefined;
let preferenciasLidas: PreferenciasOuIndefinido;
let cacheValido = false;

function lerCookie(): string | undefined {
  if (typeof document === "undefined") return undefined;

  const bruto = document.cookie
    .split("; ")
    .find((linha) => linha.startsWith(`${COOKIE_CONSENTIMENTO}=`));

  return bruto ? bruto.slice(COOKIE_CONSENTIMENTO.length + 1) : undefined;
}

function obterSnapshot(): PreferenciasOuIndefinido {
  if (typeof document === "undefined") return undefined;

  const valor = lerCookie();
  if (!cacheValido || valor !== cookieLido) {
    cookieLido = valor;
    preferenciasLidas = lerPreferenciasNoNavegador();
    cacheValido = true;
  }

  return preferenciasLidas;
}

function obterSnapshotNoServidor(): PreferenciasOuIndefinido {
  return undefined;
}

/**
 * `document.cookie` não emite eventos, então o próprio banner avisa quando
 * grava uma escolha e o store é relido.
 */
function assinar(aoAtualizar: () => void) {
  window.addEventListener(EVENTO_CONSENTIMENTO, aoAtualizar);
  return () => window.removeEventListener(EVENTO_CONSENTIMENTO, aoAtualizar);
}

export function useConsentimento() {
  const preferencias = useSyncExternalStore(
    assinar,
    obterSnapshot,
    obterSnapshotNoServidor,
  );

  return { preferencias };
}
