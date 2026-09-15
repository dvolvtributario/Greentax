import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ChatbotContabilidade from "./chatbotcontabilidade";
import { site } from "@/lib/site";


const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-atkinson",
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
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${atkinson.variable} ${montserrat.variable}`}>
      <body>
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
      </body>
    </html>
  );
}
