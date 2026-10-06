"use client";

import { useState } from "react";
import { Ponto } from "@/components/ui/Icons";
import estilos from "./Abas.module.css";

type Aba = {
  titulo: string;
  itens: string[];
};

export function Abas({ abas, tituloCard }: { abas: Aba[]; tituloCard?: string }) {
  const [ativa, setAtiva] = useState(0);
  const aba = abas[ativa];

  return (
    <div className={estilos.raiz}>
      <div
        className={estilos.botoes}
        role="tablist"
        aria-label={tituloCard ?? "Trabalhos"}
      >
        {abas.map((item, indice) => (
          <button
            key={item.titulo}
            type="button"
            role="tab"
            id={`aba-${indice}`}
            aria-selected={indice === ativa}
            aria-controls={`painel-${indice}`}
            onClick={() => setAtiva(indice)}
            className={[estilos.botao, indice === ativa ? estilos.ativo : ""]
              .filter(Boolean)
              .join(" ")}
          >
            {item.titulo}
          </button>
        ))}
      </div>

      <div
        className={estilos.card}
        role="tabpanel"
        id={`painel-${ativa}`}
        aria-labelledby={`aba-${ativa}`}
      >
        <h3 className={estilos.cardTitulo}>{aba.titulo}</h3>
        <ul className={estilos.lista}>
          {aba.itens.map((item) => (
            <li key={item}>
              <Ponto />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
