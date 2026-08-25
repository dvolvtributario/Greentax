import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/lib/site";

/**
 * Inter (variável) hospedada no próprio projeto, em vez de baixada do Google
 * durante o build. Vantagens: o build funciona offline e não depende da
 * disponibilidade do Google Fonts.
 *
 * Arquivo extraído do pacote @fontsource-variable/inter. Licença OFL em
 * app/fonts/inter-LICENSE.txt. Subset "latin", que cobre todos os acentos
 * do português.
 */
const inter = localFont({
  src: "./fonts/inter-variable-latin.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} — Contabilidade consultiva em Araçatuba/SP`,
    template: `%s | ${site.nome}`,
  },
  description: site.descricao,
  applicationName: site.nome,
  authors: [{ name: site.razaoSocial }],
  keywords: [
    "contabilidade Araçatuba",
    "escritório de contabilidade",
    "consultoria tributária",
    "planejamento tributário",
    "recuperação de créditos tributários",
    "Simples Nacional",
    "assessoria empresarial",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.nome,
    title: `${site.nome} — ${site.conceito}`,
    description: site.descricao,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nome} — ${site.conceito}`,
    description: site.descricao,
  },
  robots: { index: true, follow: true },
};

/** Dados estruturados para busca local (schema.org). */
const dadosEstruturados = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: site.nome,
  legalName: site.razaoSocial,
  taxID: site.cnpj,
  description: site.descricao,
  url: site.url,
  telephone: `+${site.contato.whatsappNumero}`,
  ...(site.contato.email ? { email: site.contato.email } : {}),
  areaServed: { "@type": "City", name: site.endereco.cidade },
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.endereco.logradouro} — ${site.endereco.complemento}`,
    addressLocality: site.endereco.cidade,
    addressRegion: site.endereco.estado,
    addressCountry: site.endereco.pais,
    ...(site.endereco.cep ? { postalCode: site.endereco.cep } : {}),
  },
  sameAs: site.redes.map((r) => r.url),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${inter.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(dadosEstruturados).replace(/</g, "\\u003c"),
          }}
        />

        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-brand-800 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Ir para o conteúdo
        </a>

        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  themeColor: "#166936",
};
