import Image from "next/image";
import Link from "next/link";
import {
  enderecoLinhaUnica,
  navegacao,
  site,
  whatsappLink,
} from "@/lib/site";
import {
  IconeEmail,
  IconeEscudo,
  IconeInstagram,
  IconeLocal,
  IconeWhatsapp,
} from "@/components/ui/icons";
import { Pendente } from "@/components/ui/pendente";

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Marca e endereço */}
          <div className="md:col-span-5">
            <Image
              src="/marca/greentax-logo-branco.png"
              alt="Greentax — Contabilidade e Assessoria Empresarial"
              width={846}
              height={223}
              className="h-13 w-auto"
            />

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-200">
              {site.conceito}
            </p>

            <address className="mt-6 flex gap-3 text-sm leading-relaxed text-brand-200 not-italic">
              <IconeLocal className="mt-0.5 size-5 shrink-0 text-brand-500" />
              <span>
                {site.endereco.logradouro}
                <br />
                {site.endereco.complemento}
                <br />
                {site.endereco.bairro} — {site.endereco.cidade}/
                {site.endereco.estado}
                {site.endereco.cep ? (
                  <>
                    <br />
                    CEP {site.endereco.cep}
                  </>
                ) : null}
              </span>
            </address>
          </div>

          {/* Navegação */}
          <nav aria-label="Rodapé" className="md:col-span-3">
            <h2 className="text-sm font-semibold tracking-[0.14em] text-white uppercase">
              Navegação
            </h2>
            <ul className="mt-5 space-y-3">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-brand-200 transition-colors hover:text-white"
                  >
                    {item.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div className="md:col-span-4">
            <h2 className="text-sm font-semibold tracking-[0.14em] text-white uppercase">
              Contato
            </h2>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={whatsappLink(
                    "Olá! Vim pelo site e gostaria de falar com um especialista da Greentax.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-brand-200 transition-colors hover:text-white"
                >
                  <IconeWhatsapp className="size-5 shrink-0 text-brand-500" />
                  {site.contato.whatsappExibicao}
                </a>
              </li>

              {site.contato.email ? (
                <li>
                  <a
                    href={`mailto:${site.contato.email}`}
                    className="inline-flex items-center gap-3 text-brand-200 transition-colors hover:text-white"
                  >
                    <IconeEmail className="size-5 shrink-0 text-brand-500" />
                    {site.contato.email}
                  </a>
                </li>
              ) : null}

              {site.redes.map((rede) => (
                <li key={rede.url}>
                  <a
                    href={rede.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-brand-200 transition-colors hover:text-white"
                  >
                    <IconeInstagram className="size-5 shrink-0 text-brand-500" />
                    {rede.nome}
                  </a>
                </li>
              ))}
            </ul>

            {!site.contato.email ? (
              <Pendente compacto tema="escuro" titulo="E-mail institucional" className="mt-5">
                Informe o e-mail da Greentax em{" "}
                <code className="font-mono">lib/site.ts</code> e ele aparece aqui
                automaticamente.
              </Pendente>
            ) : null}
          </div>
        </div>

        {/* Selo LGPD */}
        <div className="mt-12 flex items-start gap-3 rounded-card border border-brand-900 bg-brand-900/60 p-5">
          <IconeEscudo className="mt-0.5 size-5 shrink-0 text-brand-500" />
          <p className="text-sm leading-relaxed text-brand-200">
            Seus dados estão seguros com a gente. Tratamos todas as informações em
            conformidade com a Lei Geral de Proteção de Dados —{" "}
            <span className="whitespace-nowrap">Lei nº 13.709/2018</span>.
          </p>
        </div>

        {/* Linha legal */}
        <div className="mt-10 flex flex-col gap-4 border-t border-brand-900 pt-8 text-xs leading-relaxed text-brand-200 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.razaoSocial}
            <br />
            CNPJ {site.cnpj} — {enderecoLinhaUnica}
          </p>

          <div className="flex shrink-0 items-center gap-5">
            <Link
              href="/politica-de-privacidade"
              className="transition-colors hover:text-white"
            >
              Política de Privacidade
            </Link>
            <span>© {ano}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
