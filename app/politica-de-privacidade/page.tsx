import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Pendente } from "@/components/ui/Pendente";
import { enderecoLinhaUnica, site } from "@/lib/site";
import estilos from "./page.module.css";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Greentax coleta, usa e protege os dados pessoais tratados por meio deste site, em conformidade com a Lei nº 13.709/2018 (LGPD).",
  alternates: { canonical: "/politica-de-privacidade" },
  robots: { index: true, follow: false },
};

export default function PoliticaDePrivacidade() {
  return (
    <article className={estilos.pagina}>
      <Container largura="estreito">
        <p className={estilos.rotulo}>Documento legal</p>
        <h1 className={estilos.titulo}>Política de Privacidade</h1>
        <p className={estilos.lead}>
          Esta política descreve como a {site.razaoSocial} trata os dados pessoais
          coletados por meio deste site, em conformidade com a Lei Geral de Proteção
          de Dados — Lei nº 13.709/2018.
        </p>

        <Pendente
          titulo="Minuta — precisa de revisão jurídica antes de publicar"
          className={estilos.aviso}
        >
          O texto abaixo segue a estrutura exigida pela LGPD e cobre o que este site
          de fato coleta, mas <strong>não substitui revisão de um advogado</strong>.
          Três pontos dependem de decisão da Greentax e estão listados ao final.
        </Pendente>

        <div className={estilos.texto}>
          <h2>1. Quem é o controlador dos dados</h2>
          <p>
            {site.razaoSocial}, inscrita no CNPJ sob o nº {site.cnpj}, com endereço em{" "}
            {enderecoLinhaUnica}.
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
            <li>Enviar conteúdos e materiais, quando você tiver manifestado interesse</li>
            <li>Manter a segurança e o funcionamento do site</li>
          </ul>
          <p>
            A base legal para o tratamento é o seu consentimento e a execução de
            procedimentos preliminares a um contrato, nos termos do art. 7º, incisos I
            e V, da LGPD.
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

          <h2 id="cookies">7. Cookies</h2>
          <p>
            Este site usa cookies próprios, estritamente necessários ao seu
            funcionamento. Cookies de análise ou de publicidade só são ativados
            mediante o seu consentimento, manifestado no aviso exibido no primeiro
            acesso. Você pode revogar essa escolha a qualquer momento, sem custo,
            pelo link <strong>“Preferências de cookies”</strong> no rodapé.
          </p>

          <div className={estilos.tabelaWrap}>
            <table className={estilos.tabela}>
              <thead>
                <tr>
                  <th scope="col">Cookie</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Finalidade</th>
                  <th scope="col">Duração</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>greentax_consent</code>
                  </td>
                  <td>Necessário</td>
                  <td>
                    Registra a sua escolha no aviso de cookies e a versão da lista
                    vigente.
                  </td>
                  <td>12 meses</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>Categorias de consentimento.</strong> Além dos necessários,
            há duas categorias que só são ativadas com o seu aceite:{" "}
            <strong>Análise</strong> (medição agregada de uso do site) e{" "}
            <strong>Marketing</strong> (publicidade e remarketing). Nenhuma
            ferramenta dessas está ativa no momento; quando uma delas for
            adicionada, ela passa a constar nesta tabela e só será carregada
            depois do seu consentimento.
          </p>
          <p>
            <strong>Conteúdo de terceiros.</strong> A página de contato exibe um
            mapa do Google Maps incorporado. Ao carregar esse conteúdo, o Google
            pode instalar cookies sob o domínio dele e tratar dados como o seu
            endereço IP, conforme a política de privacidade do Google. Nenhum
            outro conteúdo de terceiros é incorporado a este site.
          </p>
          <p>
            <strong>Como revogar.</strong> Abra “Preferências de cookies” no
            rodapé, ajuste as categorias e salve. A retirada do consentimento é
            gratuita e imediata e não afeta a licitude do tratamento feito antes
            dela, nos termos do art. 8º, § 5º, da LGPD.
          </p>
          <p className={estilos.atualizacao}>
            Última atualização desta seção: 29 de setembro de 2026.
          </p>

          <h2>8. Segurança</h2>
          <p>
            Adotamos medidas técnicas e administrativas para proteger os dados
            pessoais contra acessos não autorizados e situações acidentais ou
            ilícitas de destruição, perda, alteração ou difusão.
          </p>

          <h2>9. Alterações desta política</h2>
          <p>
            Esta política pode ser atualizada. A data da última revisão fica indicada
            ao final do documento.
          </p>
        </div>

        <Pendente titulo="Itens a definir antes de publicar" className={estilos.aviso}>
          <ul>
            <li>
              <strong>Encarregado de dados (DPO):</strong> nome e canal de contato — a
              LGPD exige a indicação (art. 41).
            </li>
            <li>
              <strong>Prazo de retenção:</strong> por quanto tempo os leads ficam
              armazenados.
            </li>
            <li>
              <strong>Ferramentas de terceiros:</strong> o mapa do Google Maps já
              está nomeado na seção 7. Se o site passar a usar Google Analytics,
              Meta Pixel ou similares, elas precisam ser nomeadas aqui, lançadas
              em <code>lib/cookies.ts</code> e — como o banner já está no ar —
              passam a exigir aceite prévio do visitante.
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
