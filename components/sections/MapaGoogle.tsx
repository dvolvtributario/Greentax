"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { registrarCliqueMapa } from "@/app/consentimento/actions";
import { useConsentimento } from "@/components/cookies/useConsentimento";
import estilos from "./MapaGoogle.module.css";

const SRC_MAPA =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.091425208732!2d-50.437224799999996!3d-21.228222899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9496435a5c7055b3%3A0xf0a7ee7a90e78908!2sDvolv%20Intelig%C3%AAncia%20tribut%C3%A1ria!5e0!3m2!1spt-BR!2sbr!4v1787861041430!5m2!1spt-BR!2sbr";

const CHAVE_MAPA = "greentax_mapa_consent";

const EVENTO_MAPA = "greentax:mapa-carregado";


let consentimentoMemorial = false;

function lerMapaConsentido(): boolean {
  if (typeof window === "undefined") return false;
  if (consentimentoMemorial) return true;
  try {
    return window.sessionStorage.getItem(CHAVE_MAPA) === "sim";
  } catch {
    return false;
  }
}

function assinar(aoAtualizar: () => void) {
  window.addEventListener(EVENTO_MAPA, aoAtualizar);
  return () => window.removeEventListener(EVENTO_MAPA, aoAtualizar);
}

function obterSnapshotNoServidor(): boolean {
  return false;
}


export function MapaGoogle() {
  const { preferencias } = useConsentimento();
  const porClique = useSyncExternalStore(
    assinar,
    lerMapaConsentido,
    obterSnapshotNoServidor,
  );

  const carregar = preferencias?.terceiros === true || porClique;

  function carregarPorClique() {
    consentimentoMemorial = true;
    try {
      window.sessionStorage.setItem(CHAVE_MAPA, "sim");
    } catch {
    }
    window.dispatchEvent(new Event(EVENTO_MAPA));
    registrarCliqueMapa().catch(() => {});
  }

  if (carregar) {
    return (
      <div className={estilos.mapa}>
        <iframe
          src={SRC_MAPA}
          className={estilos.frame}
          width="500"
          height="450"
          title="Mapa de localização da Greentax"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <div className={estilos.mapa}>
      <div className={estilos.placeholder}>
        <p className={estilos.titulo}>Onde estamos</p>
        <p className={estilos.texto}>
          O mapa é fornecido pela Google e pode instalar cookies e tratar
          dados como o seu endereço IP. Ele só carrega se você pedir.
        </p>
        <button
          type="button"
          className={estilos.botao}
          onClick={carregarPorClique}
        >
          Carregar mapa do Google
        </button>
        <Link href="/politica-de-privacidade#cookies" className={estilos.link}>
          Saiba mais na política de privacidade
        </Link>
      </div>
    </div>
  );
}
