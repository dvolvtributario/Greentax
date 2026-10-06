"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import estilos from "./FAQ.module.css";

type FaqItem = {
  pergunta: string;
  resposta: string;
};

type FAQProps = {
  itens: FaqItem[];
  className?: string;
};

export function FAQ({ itens, className }: FAQProps) {
  const [expandido, setExpandido] = useState<number | null>(null);

  function toggle(index: number) {
    setExpandido(expandido === index ? null : index);
  }

  return (
    <div className={[estilos.faq, className].filter(Boolean).join(" ")}>
      {itens.map((item, index) => (
        <div
          key={item.pergunta}
          className={`${estilos.faqItem} ${expandido === index ? estilos.ativo : ""}`}
        >
          <button
            onClick={() => toggle(index)}
            className={estilos.faqBotao}
            aria-expanded={expandido === index}
          >
            <dt className={estilos.faqPergunta}>{item.pergunta}</dt>
            <ChevronDown
              size={20}
              className={estilos.faqSeta}
              aria-hidden="true"
            />
          </button>

          {expandido === index && (
            <dd className={estilos.faqResposta}>{item.resposta}</dd>
          )}
        </div>
      ))}
    </div>
  );
}
