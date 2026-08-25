import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Pendente } from "@/components/ui/pendente";
import { enderecoLinhaUnica, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Greentax coleta, usa e protege os dados pessoais tratados por meio deste site, em conformidade com a Lei nº 13.709/2018 (LGPD).",
  alternates: { canonical: "/politica-de-privacidade" },
  robots: { index: true, follow: false },
};

export default function PoliticaDePrivacidade() {
  return (
    <article className="py-14 sm:py-20">
      <Container size="narrow">
        <h1 className="text-3xl font-bold sm:text-4xl">Política de Privacidade</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-500">
          Esta política descreve como a {site.razaoSocial} trata os dados pessoais
          coletados por meio deste site, em conformidade com a Lei Geral de Proteção
          de Dados — Lei nº 13.709/2018.
        </p>

        <Pendente titulo="Minuta — precisa de revisão jurídica antes de publicar" className="mt-8">
          <p>
            O texto abaixo segue a estrutura exigida pela LGPD e cobre o que este
            site de fato coleta, mas <strong>não substitui revisão de um advogado</strong>.
            Três pontos dependem de decisão da Greentax e estão marcados no corpo do
            documento: o encarregado de dados (DPO), o prazo de retenção e as
            ferramentas de análise que o site vai usar.
          </p>
        </Pendente>

        <div className="prose prose-greentax mt-10 max-w-none">
          <h2>1. Quem é o controlador dos dados</h2>
          <p>
            {site.razaoSocial}, inscrita no CNPJ sob o nº {site.cnpj}, com endereço
            em {enderecoLinhaUnica}.
          </p>

          <h2>2. Quais dados coletamos</h2>
          <p>
            <strong>Dados que você nos fornece.</strong> Ao preencher o formulário de
            contato, coletamos nome, empresa, telefone/WhatsApp, e-mail, a indicação
            de já ser ou não cliente, o serviço de interesse e a mensagem que você
            escrever.
          </p>
          <p>
            <strong>Dados coletados automaticamente.</strong> Como qualquer site,
            nosso servidor registra informações técnicas de acesso, como endereço IP,
            tipo de navegador e páginas visitadas.
          </p>

          <h2>3. Para que usamos os dados</h2>
          <ul>
            <li>Responder à sua solicitação e elaborar propostas comerciais</li>
            <li>Entrar em contato pelos canais que você informou</li>
            <li>
              Enviar conteúdos e materiais, quando você tiver manifestado interesse
            </li>
            <li>Manter a segurança e o funcionamento do site</li>
          </ul>
          <p>
            A base legal para o tratamento é o seu consentimento e a execução de
            procedimentos preliminares a um contrato, nos termos do art. 7º, incisos
            I e V, da LGPD.
          </p>

          <h2>4. Com quem compartilhamos</h2>
          <p>
            Não vendemos nem cedemos seus dados. O compartilhamento ocorre apenas com
            prestadores de serviço necessários à operação — como hospedagem do site e
            a ferramenta de gestão de relacionamento com clientes — e com autoridades
            públicas, quando houver obrigação legal.
          </p>

          <h2>5. Por quanto tempo guardamos</h2>
          <p>
            Mantemos os dados pelo tempo necessário às finalidades acima ou pelos
            prazos exigidos por lei. Encerrada a finalidade, os dados são eliminados
            ou anonimizados.
          </p>

          <h2>6. Seus direitos</h2>
          <p>
            A LGPD garante a você o direito de confirmar a existência de tratamento,
            acessar seus dados, corrigir dados incompletos ou desatualizados,
            solicitar anonimização, bloqueio ou eliminação, revogar o consentimento e
            se opor a tratamentos feitos em desacordo com a lei.
          </p>
          <p>
            Para exercer qualquer desses direitos, entre em contato pelo WhatsApp{" "}
            {site.contato.whatsappExibicao}
            {site.contato.email ? ` ou pelo e-mail ${site.contato.email}` : ""}.
          </p>

          <h2>7. Cookies</h2>
          <p>
            Utilizamos cookies estritamente necessários ao funcionamento do site.
            Cookies de análise ou de publicidade só são ativados mediante o seu
            consentimento, manifestado no aviso exibido no primeiro acesso.
          </p>

          <h2>8. Segurança</h2>
          <p>
            Adotamos medidas técnicas e administrativas para proteger os dados
            pessoais contra acessos não autorizados e situações acidentais ou ilícitas
            de destruição, perda, alteração ou difusão.
          </p>

          <h2>9. Alterações desta política</h2>
          <p>
            Esta política pode ser atualizada. A data da última revisão fica indicada
            ao final do documento.
          </p>
        </div>

        <Pendente titulo="Itens a definir antes de publicar" className="mt-12">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong>Encarregado de dados (DPO):</strong> nome e canal de contato —
              a LGPD exige a indicação (art. 41).
            </li>
            <li>
              <strong>Prazo de retenção:</strong> definir por quanto tempo os leads
              ficam armazenados.
            </li>
            <li>
              <strong>Ferramentas de terceiros:</strong> se o site usará Google
              Analytics, Meta Pixel ou similares, elas precisam ser nomeadas aqui e
              o aviso de cookies precisa ser implementado.
            </li>
            <li>
              <strong>Aviso de cookies:</strong> o item 10 do briefing pede o banner
              com consentimento explícito — ainda não construído, porque depende da
              decisão sobre as ferramentas acima.
            </li>
            <li>
              <strong>Revisão jurídica</strong> do texto completo.
            </li>
          </ul>
        </Pendente>
      </Container>
    </article>
  );
}
