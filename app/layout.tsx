import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BannerCookies } from "@/components/cookies/BannerCookies";
import { ScriptsConsentimento } from "@/components/cookies/ScriptsConsentimento";
import ChatbotContabilidade from "./chatbotcontabilidade";
import { site } from "@/lib/site";


const instrumentSans = localFont({
  src: [
    {
      path: "./fonts/instrument-sans/instrument-sans-variable-wght-normal.woff2",
      style: "normal",
    },
    {
      path: "./fonts/instrument-sans/instrument-sans-variable-wght-italic.woff2",
      style: "italic",
    },
  ],
  weight: "400 700",
  display: "swap",
  variable: "--font-corpo",
});

const montserrat = localFont({
  src: [
    {
      path: "./fonts/gotham/montserrat-variable-wght-normal.ttf",
      style: "normal",
    },
    {
      path: "./fonts/gotham/montserrat-variable-wght-italic.ttf",
      style: "italic",
    },
  ],
  weight: "100 900",
  display: "swap",
  variable: "--font-titulo",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} | Contabilidade consultiva em Araçatuba/SP`,
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

export const viewport: Viewport = {
  themeColor: "#166936",
};

// GitHub Pages não permite definir headers HTTP de segurança (só arquivos
// estáticos), então a CSP entra como <meta http-equiv> no HTML — suporte
// oficial do React 19/Next 16 (ver docs: Unsupported Metadata). "frame-ancestors"
// não pode vir por meta (limitação do spec) e só é possível em servidor.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://hook.us2.make.com https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com",
  "frame-src https://www.google.com https://www.gstatic.com https://maps.google.com",
  "worker-src 'self' blob:",
  "form-action 'self'",
].join("; ");

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
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${instrumentSans.variable} ${montserrat.variable}`}>
      <body>
        {process.env.NODE_ENV === "production" && (
          <meta httpEquiv="Content-Security-Policy" content={csp} />
        )}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(dadosEstruturados).replace(/</g, "\\u003c"),
          }}
        />

        <a href="#conteudo" className="pular-para-conteudo">
          Ir para o conteúdo
        </a>

        <Header />
        <main id="conteudo" style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
        <ChatbotContabilidade />
        <BannerCookies />
        <ScriptsConsentimento />
      </body>
    </html>
  );
}
