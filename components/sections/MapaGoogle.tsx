"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { registrarCliqueMapa } from "@/app/consentimento/actions";
import { EVENTO_CONSENTIMENTO } from "@/lib/cookies";
import { useConsentimento } from "@/components/cookies/useConsentimento";
import estilos from "./MapaGoogle.module.css";

const SRC_MAPA =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.091425208732!2d-50.437224799999996!3d-21.228222899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9496435a5c7055b3%3A0xf0a7ee7a90e78908!2sDvolv%20Intelig%C3%AAncia%20tribut%C3%A1ria!5e0!3m2!1spt-BR!2sbr!4v1787861041430!5m2!1spt-BR!2sbr";

export function MapaGoogle() {
  const { preferencias } = useConsentimento();
  const [porClique, setPorClique] = useState(false);

  // O consentimento por clique vale só para este carregamento da página.
  // Se as preferências forem salvas sem "terceiros", o mapa descarrega na hora.
  useEffect(() => {
    const aoAlterar = (evento: Event) => {
      const detalhe = (evento as CustomEvent).detail;
      if (detalhe?.terceiros !== true) setPorClique(false);
    };
    window.addEventListener(EVENTO_CONSENTIMENTO, aoAlterar);
    return () => window.removeEventListener(EVENTO_CONSENTIMENTO, aoAlterar);
  }, []);

  const carregar = preferencias?.terceiros === true || porClique;

  function carregarPorClique() {
    setPorClique(true);
    registrarCliqueMapa();
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
