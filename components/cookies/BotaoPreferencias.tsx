"use client";

import { EVENTO_ABRIR_PREFERENCIAS } from "@/lib/cookies";

export function BotaoPreferencias() {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent(EVENTO_ABRIR_PREFERENCIAS));
      }}
    >
      Preferências de cookies
    </button>
  );
}
