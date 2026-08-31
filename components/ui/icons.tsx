/**
 * Conjunto de ícones em SVG próprio.
 *
 * Traço fino, terminações retas — coerente com a ausência de cantos
 * arredondados no restante do site. Sem biblioteca externa: são poucos
 * ícones e nenhum deles justifica uma dependência.
 */

type Props = React.SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
  focusable: false,
};

export const Seta = (p: Props) => (
  <svg {...base} {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const SetaDiagonal = (p: Props) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const Marca = (p: Props) => (
  <svg {...base} {...p}>
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
);

export const Ponto = (p: Props) => (
  <svg {...base} {...p} fill="currentColor">
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
  </svg>
);

export const Menos = (p: Props) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
);

export const Menu = (p: Props) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Fechar = (p: Props) => (
  <svg {...base} {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const Local = (p: Props) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const Envelope = (p: Props) => (
  <svg {...base} {...p}>
    <path d="M3 5h18v14H3z" />
    <path d="m3 6 9 6.5L21 6" />
  </svg>
);

export const Instagram = (p: Props) => (
  <svg {...base} {...p}>
    <path d="M3.5 3.5h17v17h-17z" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17 6.6h.01" strokeWidth={2} />
  </svg>
);

export const Whatsapp = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.8 9.8 0 0 0 4.68 1.2h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.78 9.78 0 0 0 12.04 2Zm0 17.94h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.1.82.83-3.03-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.52 3.68-8.19 8.2-8.19a8.14 8.14 0 0 1 5.79 2.4 8.14 8.14 0 0 1 2.4 5.8c0 4.52-3.68 8.19-8.2 8.19Zm4.5-6.13c-.25-.13-1.46-.72-1.68-.8-.23-.09-.39-.13-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42l-.47-.01a.9.9 0 0 0-.65.3c-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.64 4.2 3.7.58.26 1.04.4 1.4.51.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.11-.23-.17-.48-.29Z" />
  </svg>
);

export const Escudo = (p: Props) => (
  <svg {...base} {...p}>
    <path d="M12 3 5 5.8v5.4c0 4.1 2.9 7.9 7 9.4 4.1-1.5 7-5.3 7-9.4V5.8Z" />
    <path d="m9.4 12 1.9 1.9L15 10.2" />
  </svg>
);
