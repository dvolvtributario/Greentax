import { Container } from "@/components/ui/Container";
import { metadadosPagina } from "@/lib/seo";
import estilos from "./page.module.css";

export const metadata = metadadosPagina({
  titulo: "Política de Privacidade",
  descricao:
    "Como a Greentax coleta, usa e protege os dados pessoais tratados por meio deste site, em conformidade com a Lei nº 13.709/2018 (LGPD).",
  rota: "/politica-de-privacidade",
  robots: { index: true, follow: false },
});

// Texto formalizado pelo advogado da Greentax (versão de 26/10/2026).
// Alterações de conteúdo devem partir de um novo documento revisado.
export default function PoliticaDePrivacidade() {
  return (
    <article className={estilos.pagina}>
      <Container largura="estreito">
        <p className={estilos.rotulo}>Documento legal</p>
        <h1 className={estilos.titulo}>Política de Privacidade</h1>
        <p className={estilos.lead}>
          A <strong>GREENTAX CONTABILIDADE E ASSESSORIA EMPRESARIAL LTDA</strong>{" "}
          compromete-se com a privacidade, a segurança e a transparência no
          tratamento dos dados pessoais dos visitantes de seu site e das pessoas que
          entram em contato por meio dele. Esta Política de Privacidade explica quais
          dados pessoais tratamos, para quais finalidades, com base em quais
          hipóteses legais, com quem os compartilhamos, por quanto tempo os mantemos
          e como você pode exercer seus direitos.
        </p>

        <div className={estilos.texto}>
          <p>
            Esta Política observa a Lei Geral de Proteção de Dados Pessoais – LGPD
            (Lei nº 13.709/2018), o Marco Civil da Internet (Lei nº 12.965/2014), o
            Código de Defesa do Consumidor (Lei nº 8.078/1990), quando aplicável, e
            as normas e orientações da Agência Nacional de Proteção de Dados – ANPD.
          </p>
          <p>
            Para os fins desta Política, a{" "}
            <strong>GREENTAX CONTABILIDADE E ASSESSORIA EMPRESARIAL LTDA</strong>,
            doravante denominada simplesmente como “<strong>Greentax</strong>”,
            inscrita no CNPJ/MF nº 37.026.778/0001-80, com sede localizada na Avenida
            Brasília, nº 2121, Jardim Nova Yorque, 13º andar, Edifício New York Tower,
            sala 1314, CEP 16.018-000, é a controladora dos dados pessoais tratados no
            âmbito desta política.
          </p>

          <h2>I- Da coleta de dados</h2>

          <h3>a) Quais dados são tratados?</h3>
          <p>
            Tratamos apenas os dados pessoais necessários às finalidades descritas
            nesta Política, observados os princípios da finalidade, da adequação e da
            necessidade (art. 6º da LGPD).
          </p>

          <h4>
            a.1) Dados pessoais fornecidos pelo titular no site e em nossos canais de
            atendimento
          </h4>
          <p>
            No formulário de contato: nome completo, empresa, telefone/WhatsApp,
            e-mail, a indicação de já ser ou não cliente, o serviço de interesse e a
            mensagem que você escrever. Também tratamos as informações que você nos
            enviar pelo WhatsApp, por e-mail ou por telefone.
          </p>

          <h4>a.2) Dados pessoais coletados automaticamente</h4>
          <p>
            Ao acessar o site, são coletados automaticamente o endereço IP, a data e a
            hora do acesso (registros de acesso a aplicações de internet), informações
            sobre o dispositivo e o navegador e dados sobre a navegação em nosso site,
            por meio de cookies e tecnologias semelhantes (ver item VII).
          </p>

          <h4>a.3) Assistente virtual e WhatsApp</h4>
          <p>
            O assistente virtual do site funciona apenas com opções pré-definidas e
            não solicita dados pessoais. Ao escolher falar com um contador, você é
            direcionado ao WhatsApp, serviço da Meta, e as informações que enviar por
            lá serão tratadas conforme esta Política e a política de privacidade do
            WhatsApp.
          </p>

          <h4>a.4) Área do Cliente</h4>
          <p>
            O link “Área do Cliente” direciona ao Portal Hubstrom, plataforma de
            terceiro contratada pela Greentax, onde o cliente acessa documentos e
            informações de sua empresa mediante login com CPF ou CNPJ e senha. O
            tratamento de dados nesse portal segue o contrato de prestação de
            serviços. Mantenha sua senha em sigilo e não a compartilhe.
          </p>

          <h3>b) Qual a finalidade desta coleta?</h3>
          <p>
            Os dados pessoais são tratados para as finalidades abaixo, cada uma
            amparada em uma hipótese legal prevista no art. 7º da LGPD:
          </p>
          <ul className={estilos.incisos}>
            <li>
              I- responder a contatos, dúvidas e solicitações de proposta feitos pelo
              site ou por nossos canais de atendimento: procedimentos preliminares
              relacionados a contrato, a pedido do titular (art. 7º, V);
            </li>
            <li>
              II- manter os registros de acesso ao site pelo prazo legal: cumprimento
              de obrigação legal (art. 7º, II, e art. 15 do Marco Civil da Internet);
            </li>
            <li>
              III- garantir a segurança do site, inclusive a proteção do formulário de
              contato contra envios automatizados (Google reCAPTCHA), e prevenir
              fraudes: legítimo interesse (art. 7º, IX, e art. 10), respeitados os
              direitos e as legítimas expectativas dos titulares;
            </li>
            <li>
              IV- exercer direitos em processos judiciais, administrativos ou
              arbitrais: exercício regular de direitos (art. 7º, VI);
            </li>
            <li>
              V- enviar notícias, informativos, insights e comunicações sobre nossos
              serviços por e-mail, telefone ou WhatsApp: consentimento (art. 7º, I),
              que pode ser revogado a qualquer momento, sempre com opção de
              descadastramento;
            </li>
            <li>
              VI- medir o uso do site com o Google Analytics e exibir conteúdos de
              terceiros, como o mapa da página de contato: consentimento (art. 7º, I).
            </li>
          </ul>

          <h3>c) Qual é a forma de coleta desses dados?</h3>
          <p>
            Os dados são coletados (i) diretamente do titular, por meio do formulário
            do site, e-mail, telefone e WhatsApp; e (ii) automaticamente, por meio de
            cookies e tecnologias semelhantes, conforme as preferências registradas no
            aviso de cookies.
          </p>

          <h2>II- Das bases legais e do consentimento</h2>
          <p>
            O consentimento é apenas uma das hipóteses legais que autorizam o
            tratamento de dados pessoais. Os dados enviados pelo formulário de
            contato, por exemplo, são tratados para responder à sua solicitação, com
            base em procedimentos preliminares relacionados a contrato (art. 7º, V, da
            LGPD), hipótese em que o consentimento não é exigido.
          </p>
          <p>
            Quando o tratamento se basear no consentimento, este será uma manifestação
            livre, informada e inequívoca, fornecida para finalidades determinadas
            (art. 5º, XII, e art. 8º da LGPD), e será solicitado de forma específica,
            por exemplo, no cadastro para recebimento de informativos ou no aviso de
            cookies.
          </p>
          <p>
            Quando o tratamento se basear no legítimo interesse, a{" "}
            <strong>Greentax</strong> tratará apenas os dados estritamente
            necessários, avaliando previamente se o tratamento respeita os direitos e
            as legítimas expectativas do titular, conforme o art. 10 da LGPD.
          </p>
          <p>
            Você poderá revogar seu consentimento a qualquer tempo e sem custo, pelo
            link de descadastramento das mensagens, pelas preferências de cookies do
            site ou pelos canais indicados no item 3.1. A revogação não afeta os
            tratamentos já realizados nem aqueles amparados em outras hipóteses
            legais, mas poderá impedir o recebimento de comunicações ou o
            funcionamento de algumas funcionalidades do site.
          </p>

          <h2>III- Seus direitos</h2>
          <p>
            A <strong>Greentax</strong> assegura aos usuários/clientes, na qualidade
            de titulares de seus direitos, o disposto no artigo 18, da Lei Geral de
            Proteção de Dados:
          </p>
          <ul className={estilos.incisos}>
            <li>
              <strong>I -</strong> confirmação da existência de tratamento;
            </li>
            <li>
              <strong>II -</strong> acesso aos dados;
            </li>
            <li>
              <strong>III -</strong> correção de dados incompletos, inexatos ou
              desatualizados;
            </li>
            <li>
              <strong>IV -</strong> anonimização, bloqueio ou eliminação de dados
              desnecessários, excessivos ou tratados em desconformidade com o disposto
              na LGPD;
            </li>
            <li>
              <strong>V -</strong> portabilidade dos dados a outro fornecedor de
              serviço ou produto, mediante requisição expressa, de acordo com a
              regulamentação da autoridade nacional, observados os segredos comercial
              e industrial;
            </li>
            <li>
              <strong>VI -</strong> eliminação dos dados pessoais tratados com o
              consentimento do titular, exceto nas hipóteses previstos em lei;
            </li>
            <li>
              <strong>VII -</strong> informação das entidades públicas e privadas com
              as quais o controlador realizou uso compartilhado de dados;
            </li>
            <li>
              <strong>VIII -</strong> informação sobre a possibilidade de não fornecer
              consentimento e sobre as consequências da negativa;
            </li>
            <li>
              <strong>IX -</strong> revogação do consentimento.
            </li>
          </ul>
          <p>
            Além desses, o titular tem direito a: (a) opor-se a tratamento realizado
            com fundamento em outras hipóteses legais, em caso de descumprimento da
            LGPD (art. 18, § 2º); (b) solicitar a revisão de decisões tomadas
            unicamente com base em tratamento automatizado que afetem seus interesses
            (art. 20); e (c) peticionar em relação aos seus dados perante a ANPD e os
            órgãos de defesa do consumidor (art. 18, §§ 1º e 8º).
          </p>
          <p>
            Esses direitos serão atendidos gratuitamente. A confirmação de existência
            ou o acesso aos dados serão fornecidos de imediato, em formato
            simplificado, ou em até 15 (quinze) dias, por meio de declaração completa
            (art. 19 da LGPD). Alguns direitos podem ser limitados quando houver
            obrigação legal de guarda dos dados.
          </p>

          <h3 id="exercicio-de-direitos">3.1- Como exerço esses direitos?</h3>
          <p>
            Para exercer seus direitos de titular, você deverá entrar em contato com a{" "}
            <strong>Greentax</strong>, através do telefone (18) 99750-6584 ou do
            e-mail{" "}
            <a href="mailto:comercial@greentaxcontabilidade.com.br">
              comercial@greentaxcontabilidade.com.br
            </a>
            , com o assunto LGPD e nome de usuário. As dúvidas também poderão ser
            retiradas através destes meios de comunicação.
          </p>
          <p>
            Mesmo assim, a fim de garantia de sua correta identificação como titular,
            poderemos efetuar a solicitação de documentação ou demais comprovações que
            possam comprovar sua real identidade.
          </p>

          <h2>IV- Do armazenamento de dados</h2>
          <p>
            Seus dados coletados serão armazenados durante o tempo necessário à
            prestação do serviço ou para que as finalidades desta presente Política de
            Privacidade sejam atingidas, considerando os direitos dos titulares dos
            dados e dos controladores.
          </p>
          <p>
            Se você se tornar cliente, seus dados passam a ser tratados conforme o
            contrato de prestação de serviços e os prazos de guarda previstos na
            legislação aplicável.
          </p>
          <p>
            Ao término do prazo de armazenamento, os dados serão excluídos de nossas
            bases de dados ou anonimizados, ressalvadas o disposto em lei, como no
            artigo 16 da LGPD:
          </p>
          <ul className={estilos.incisos}>
            <li>I - cumprimento de obrigação legal ou regulatória pelo controlador;</li>
            <li>
              II - estudo por órgão de pesquisa, garantida, sempre que possível, a
              anonimização dos dados pessoais;
            </li>
            <li>
              III - transferência a terceiro, desde que respeitados os requisitos de
              tratamento de dados dispostos nesta Lei; ou
            </li>
            <li>
              IV - uso exclusivo do controlador, vedado seu acesso por terceiro, e
              desde que anonimizados os dados.
            </li>
          </ul>
          <p>
            Ou seja, as informações necessárias para cumprimento de determinações
            legais, judiciais e/ou administrativas, ou no exercício de direito de
            defesa em processos judiciais e/ou administrativos serão mantidas pelo
            prazo necessário.
          </p>
          <p>
            No mais, empregamos soluções técnicas de proteção, medidas necessárias
            para garantir a integridade e inviolabilidade dos seus dados, garantindo
            sua confidencialidade, além de diversas outras medidas de segurança, para
            a garantia do aqui disposto.
          </p>

          <h2>V- Da segurança</h2>
          <p>
            A fim de uma manutenção correta e segura das informações de nossos
            usuários/clientes, utilizamos ferramentas físicas e eletrônicas, além de
            medidas gerenciais orientadas para a proteção destes dados.
          </p>
          <p>
            Consideramos a natureza dos dados, contexto, finalidade e riscos de
            eventuais, ressaltando que o acesso é somente de pessoas autorizadas, há um
            compromisso de confidencialidade e a armazenagem é em ambiente seguro e
            idôneo.
          </p>
          <p>
            Havendo incidentes, com risco ou dano a qualquer usuário/cliente, a{" "}
            <strong>Greentax</strong> comunicará os envolvidos e a autoridade nacional
            de proteção de dados, na forma da LGPD.
          </p>

          <h2>VI- Do compartilhamento de dados</h2>
          <p>
            A <strong>Greentax</strong> não comercializa dados pessoais. Os dados
            poderão ser compartilhados apenas na medida necessária às finalidades
            desta Política, com:
          </p>
          <ul className={estilos.incisos}>
            <li>
              a) fornecedores que nos apoiam na operação do site e no atendimento,
              como hospedagem do site, ferramenta de gestão de relacionamento com
              clientes (CRM) e e-mail, que atuam como operadores e estão sujeitos a
              obrigações de confidencialidade e segurança;
            </li>
            <li>
              b) Google, pelo reCAPTCHA do formulário de contato e, se você autorizar,
              pelo Google Analytics e pelo mapa da página de contato; e Meta, quando
              você optar por falar conosco pelo WhatsApp. Cada empresa tem política de
              privacidade própria:
            </li>
          </ul>
          <ul className={estilos.links}>
            <li>
              <a
                href="https://policies.google.com/privacy?hl=pt-BR"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/privacy?hl=pt-BR
              </a>
            </li>
            <li>
              <a
                href="https://www.whatsapp.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.whatsapp.com/legal/privacy-policy
              </a>
            </li>
          </ul>
          <p>Outrossim, também poderão ser compartilhados nas seguintes situações:</p>
          <ul className={estilos.incisos}>
            <li>
              <strong>I-</strong> Por determinação legal de autoridade judicial,
              governamental e administrativa;
            </li>
            <li>
              <strong>II-</strong> Em alterações/movimentações societárias;
            </li>
            <li>
              <strong>III-</strong> Para proteção de todos os direitos da{" "}
              <strong>Greentax</strong>.
            </li>
          </ul>
          <p>
            Alguns fornecedores, como provedores de hospedagem e de e-mail e as
            ferramentas do Google e da Meta, podem armazenar dados em servidores
            localizados fora do Brasil. Nesses casos, a transferência internacional
            somente ocorrerá nas hipóteses do art. 33 da LGPD e na forma da Resolução
            CD/ANPD nº 19/2024 (por exemplo, para países reconhecidos pela ANPD como
            de nível de proteção adequado ou mediante cláusulas-padrão contratuais),
            assegurando grau de proteção compatível com a legislação brasileira.
          </p>
          <p>
            Ao consentir, você está concordando com esse compartilhamento de acordo
            com as finalidades desta Política de Privacidade.
          </p>

          <h2 id="cookies">VII- Cookies</h2>
          <p>
            O site da <strong>Greentax Contabilidade e Assessoria Empresarial</strong>{" "}
            faz o uso de Cookies, que são arquivos enviados pela plataforma ao seu
            dispositivo de conexão. Esses Cookies contém informações de navegação e
            aprimoram a experiência do usuário/cliente.
          </p>
          <p>
            Ao consentir, você aceita a utilização da coleta de dados automáticos de
            navegação com uso de Cookies.
          </p>
          <p>
            Porém, a qualquer tempo, de forma gratuita, você poderá bloquear ou
            recursar os Cookies, o que poderá ser feito diretamente no seu web browser
            (navegador).
          </p>
          <p>
            <strong>
              <u>
                *A recusa ou bloqueio de Cookies poderá inviabilizar o correto
                funcionamento do site.
              </u>
            </strong>
          </p>

          <h2>VIII- Da responsabilidade</h2>
          <p>
            A <strong>Greentax</strong> e os demais agentes envolvidos no tratamento
            respondem pelos danos decorrentes do tratamento de dados pessoais nos
            termos dos arts. 42 a 45 da LGPD. Comprometemo-nos a manter esta Política
            atualizada e a aprimorar continuamente nossos processos de proteção de
            dados, observando as normas e orientações da ANPD.
          </p>
          <p>
            Todavia, nos termos do art. 43 da LGPD, a <strong>Greentax</strong> não
            será responsabilizada quando comprovar que não realizou o tratamento, que
            não houve violação à legislação de proteção de dados ou que o dano decorre
            de culpa exclusiva do titular ou de terceiros, como nos casos de:
          </p>
          <ul className={estilos.incisos}>
            <li>
              a) negligência, imprudência ou imperícia do próprio titular na guarda de
              seus dados e senhas;
            </li>
            <li>
              b) atuação maliciosa de terceiros, como ataques cibernéticos, salvo se
              comprovada falha da <strong>Greentax</strong> na adoção das medidas de
              segurança exigíveis (art. 44 da LGPD);
            </li>
            <li>c) fornecimento de dados falsos, fraudulentos ou inexatos pelo titular.</li>
          </ul>

          <h2>IX- Disposições finais</h2>
          <p>
            A última atualização desta proposta foi elaborada em 26 de outubro de
            2026, de acordo com a legislação vigente à época, reservando-nos no
            direito de modificar os termos da presente Política de Privacidade para
            adequações determinadas pela legislação e pela Autoridade Nacional de
            Proteção de Dados.
          </p>
          <p>
            Recomendamos ao usuário/cliente a revisão com frequência dos termos desta
            Política de Privacidade.
          </p>
          <p>
            Fica eleito o foro da comarca de Araçatuba/SP para dirimir eventuais
            controvérsias decorrentes desta Política, ressalvado o direito do titular
            consumidor de optar pelo foro de seu domicílio.
          </p>
        </div>
      </Container>
    </article>
  );
}
