# Site institucional Greentax — guia do projeto

Site em **Next.js 16 (App Router) + React 19 + TypeScript + CSS Modules**,
construído a partir do documento *Briefing de Criação + Copy Institucional —
Site Greentax, v1.0*.

---

## Stack

| Camada | Escolha |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Componentes | React 19 (Server Components por padrão) |
| CSS | **CSS Modules + uma folha global de tokens** — sem Tailwind |
| Ícones | SVG próprio (`components/ui/Icons.tsx`) — sem biblioteca |
| Animações | Apenas transições de cor de 120 ms |
| Fonte | Inter variável, hospedada no projeto |
| Formulário | React Hook Form + Server Action |
| Backend | Next.js (Server Actions) |

---

## Rodar localmente

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npx eslint .
```

---

## A linguagem visual

A referência é a comunicação institucional de Deloitte, PwC e EY: autoridade
construída por hierarquia de informação, não por efeito visual.

**As regras que o projeto segue — vale mantê-las ao criar telas novas:**

- **Sem raio de borda.** Tudo é retângulo, inclusive botões e campos.
- **Sem sombra.** A separação entre blocos é feita por filetes de 1px.
- **Sem gradiente, sem blob, sem ilustração decorativa.**
- **Sem animação de entrada.** Nada aparece, desliza ou pulsa. As únicas
  transições são de cor, em 120 ms, no hover.
- **Cor é acento, não superfície.** O verde marca filetes, rótulos e o CTA. O
  fundo é branco ou cinza muito claro.
- **Hierarquia pela tipografia e pelo espaço em branco.**
- **Cada seção abre com um filete grosso + rótulo em caixa alta + título.** É o
  padrão que dá ritmo ao site inteiro (`<CabecalhoSecao>`).
- **Números grandes como prova de autoridade** — a faixa de indicadores usa
  numerais de até 80px, separados por filetes verticais.
- **Grades com filetes**, não cards flutuantes (`<Grade>`).

---

## Estrutura

```
app/
├─ globals.css                tokens, reset e tipografia base — SÓ isso
├─ paginas.module.css         padrões compartilhados pelas páginas internas
├─ layout.tsx                 layout raiz, metadata global, JSON-LD
├─ page.tsx / page.module.css Home
├─ fonts/                     Inter variável (woff2) + licença OFL
├─ quem-somos/
├─ solucoes/
│  ├─ page.tsx                hub das duas frentes
│  ├─ contabil-fiscal-trabalhista/
│  └─ consultoria-estrategica/
├─ diferenciais/
├─ nichos/
├─ blog/
│  ├─ page.tsx                listagem com filtro por categoria
│  └─ [slug]/                 artigo (estilos de prosa no módulo)
├─ contato/
│  ├─ page.tsx
│  └─ acoes.ts                Server Action do formulário
├─ politica-de-privacidade/
├─ sitemap.ts, robots.ts
└─ icon.png, apple-icon.png, favicon.ico

components/
├─ layout/     Header, Footer
├─ sections/   blocos reutilizáveis entre páginas
└─ ui/         Container, Section, Button, Pendente, Icons

lib/
├─ site.ts       DADOS INSTITUCIONAIS — edite aqui
├─ conteudo.ts   copy das páginas
└─ blog.ts       leitura dos artigos MDX

content/blog/    artigos em .mdx
public/marca/    arquivos do logotipo
```

Cada componente tem seu `.module.css` ao lado. Os nomes de classe são locais:
não existe colisão entre arquivos e não há folha global crescendo sem controle.

---

## Onde mexer para cada coisa

| Quero mudar… | Arquivo |
| --- | --- |
| Telefone, endereço, CNPJ, redes sociais | `lib/site.ts` |
| Domínio do site (antes de publicar!) | `lib/site.ts` → `site.url` |
| Números de prova social | `lib/site.ts` → `site.indicadores` |
| Textos das páginas | `lib/conteudo.ts` |
| Cores, tamanhos de fonte, espaçamentos | `app/globals.css` (bloco `:root`) |
| Itens do menu | `lib/site.ts` → `navegacao` |
| Estilo de um componente | o `.module.css` ao lado dele |

---

## Paleta

Extraída do logotipo oficial, medida pixel a pixel — não estimada.

| Token | Hex | Contraste sobre branco | Uso |
| --- | --- | --- | --- |
| `--verde-700` | `#166936` | 6.76:1 ✅ AA | Verde institucional. Texto, CTAs, links. |
| `--verde-500` | `#428436` | 4.58:1 ✅ AA | Verde claro escurecido, seguro para texto pequeno. |
| `--verde-400` | `#509f41` | 3.29:1 ⚠️ | Verde claro da marca. **Só** filetes, numerais e marcadores. |
| `--tinta-500` | `#667075` | 5.3:1 ✅ AA | Texto de apoio. |
| `--tinta-900` | `#14181a` | ~17:1 ✅ | Títulos. |

> ⚠️ O verde claro reprova no WCAG AA para texto pequeno. Ele é a cor de
> destaque da marca e funciona em elementos gráficos, mas nunca deve virar cor
> de parágrafo ou de link no corpo do texto.

### Arquivos de marca

| Arquivo | Uso |
| --- | --- |
| `greentax-logo.png` | Lockup completo (wordmark + assinatura), fundo transparente |
| `greentax-logo-branco.png` | Versão negativa, para fundos escuros |
| `greentax-wordmark.png` | Só o wordmark — usado no header, onde a assinatura ficaria ilegível |
| `greentax-wordmark-branco.png` | Wordmark negativo |
| `greentax-icone.png` | Monograma GT, recolorido para a paleta do wordmark |

**Monograma:** o arquivo original do GT usava verdes diferentes do wordmark
(`#097340` / `#4dad43`, mais esmeralda). Foi recolorido para os tons do
wordmark para que favicon e header combinem.

**Formato:** todos os arquivos recebidos eram raster. As resoluções bastam para
tela, mas para impressão ou aplicação em tamanho grande vale pedir o **SVG ou AI
original** a quem criou o logotipo.

---

## Blog

Cada artigo é um `.mdx` em `content/blog/`. O nome do arquivo vira a URL.
Todo arquivo começa com:

```js
export const artigo = {
  titulo: "…",
  resumo: "…",
  categoria: "Tributário", // Tributário | Trabalhista | Gestão | Tecnologia
  data: "2026-09-15",
  autor: "Equipe Greentax",
};
```

A listagem lê a pasta sozinha — não é preciso registrar o artigo em lugar
nenhum. O arquivo `modelo-de-artigo.mdx` é um gabarito: **apague-o** quando o
primeiro conteúdo real for publicado.

Para migrar para um CMS no futuro, o único arquivo a mudar é `lib/blog.ts`.

---

## Formulário de contato

React Hook Form no cliente (validação em `onTouched`, sem re-render
desnecessário) e uma Server Action que **revalida tudo no servidor** — a
validação do cliente é conveniência, não segurança. Tem honeypot anti-spam e
exige consentimento LGPD explícito.

**A entrega do lead ainda não está configurada.** Para ativar sem escolher um
CRM agora, crie um `.env.local`:

```
CONTATO_WEBHOOK_URL=https://…
```

Pode apontar para Zapier, Make, n8n, WhatsApp Business API ou um endpoint
próprio. O lead vai como JSON via POST.

> 🚨 **Sem essa variável, o lead é apenas registrado no log do servidor — na
> prática, ele se perde.** Não publique em produção sem configurar a entrega.

---

## Pendências

Todas as lacunas de conteúdo estão marcadas com o componente `<Pendente>` e
aparecem visualmente na página (de propósito). Para listar:

```bash
grep -rn "<Pendente" app components
```

| # | Pendência | Onde |
| --- | --- | --- |
| 1 | **Nichos de atendimento** — 3 a 6 segmentos a validar na carteira | `/nichos`, Home |
| 2 | **Indicadores numéricos** — empresas atendidas, anos de mercado, % no prazo | `lib/site.ts` |
| 3 | **Logos de clientes** — com autorização por escrito | `public/clientes/` |
| 4 | **E-mail institucional** da Greentax | `lib/site.ts` |
| 5 | **CEP** do endereço | `lib/site.ts` |
| 6 | **Fotos reais de equipe** + cargos e CRC | `/quem-somos` |
| 7 | **Depoimentos e cases** | `/diferenciais` |
| 8 | **Detalhes da plataforma/ERP** do cliente | `/diferenciais` |
| 9 | **Integração do formulário** com CRM/WhatsApp | `app/contato/acoes.ts` |
| 10 | **Mapa** de localização (depende do CEP) | `/contato` |
| 11 | **Materiais ricos** para download + captura de e-mail | `/blog` |
| 12 | **Política de Privacidade** — revisão jurídica, DPO, retenção | `/politica-de-privacidade` |
| 13 | ~~**Banner de cookies**~~ — **resolvido**: banner de 2 camadas no ar (ver “Decisões técnicas”) | global |
| 14 | **Domínio definitivo** | `lib/site.ts` → `site.url` |
| 15 | **Linha do tempo** da empresa (opcional) | `/quem-somos` |

---

## Decisões técnicas registradas

**CSS Modules, não Tailwind.** Os estilos ficam ao lado do componente, com
nomes de classe escopados. Os valores compartilhados (cor, tipo, espaço) vivem
como custom properties no `:root` de `globals.css` — mudar a paleta inteira é
editar um bloco.

**Fonte hospedada localmente.** A Inter vem de um `.woff2` dentro do projeto em
vez de ser baixada do Google Fonts no build. O build funciona offline e não
depende de serviço externo. Licença OFL incluída.

**Ícones em SVG próprio.** São doze ícones; nenhuma biblioteca justificaria o
peso. Traço de 1,5px com terminações retas, coerente com a ausência de cantos
arredondados.

**Filtro do blog por URL.** As categorias usam `?categoria=` com links reais em
vez de estado no cliente: funciona sem JavaScript, é indexável e o link filtrado
pode ser compartilhado.

**Dados estruturados.** `AccountingService` (schema.org) no layout raiz e
`BlogPosting` em cada artigo, para busca local em Araçatuba/SP.

**Banner de cookies no ar.** O consentimento é gerado por
`components/cookies/BannerCookies` — camada 1 fixa no rodapé com “Aceitar
todos”, “Rejeitar não necessários” (mesmo destaque) e “Personalizar”, e camada 2
com um toggle por categoria (necessários travados ativos; análise, marketing e
conteúdo de terceiros desligados por padrão). A escolha fica no cookie
`greentax_consent` (12 meses, `SameSite=Lax`, legível pelo cliente), que guarda
também a origem da decisão (banner/rodapé) e a data, e é lida pelo hook
`useConsentimento`. A prova vai ao servidor pela server action
`app/consentimento/actions.ts`: sempre no log do servidor e, quando
`CONSENT_WEBHOOK_URL` estiver definida, também num webhook — a falha do webhook
nunca bloqueia o visitante. Categorias e scripts por categoria vivem em
`lib/cookies.ts`: as listas de análise, marketing e terceiros estão vazias,
então nenhum script de terceiro é injetado; ao ligar o GA4 ou o Pixel, basta
lançar o script na lista da categoria certa. Aumentar `VERSAO_POLITICA` faz o
banner reaparecer para todo mundo. A revogação fica no rodapé
(“Preferências de cookies”) e a tabela oficial de cookies está na §7 da política
de privacidade. Único terceiro embarcado: o iframe do Google Maps em `/contato`,
nomeado na mesma seção — com gate híbrido em
`components/sections/MapaGoogle`: se a categoria “terceiros” foi aceita ele
carrega sozinho; se não (ou se o visitante ainda não escolheu), aparece um
placeholder com botão, e o clique vale como consentimento pontual para aquele
carregamento da página — sem persistir em `sessionStorage`, ele morre ao
navegar/recarregar, e salvar as preferências sem "terceiros" descarrega o mapa
na hora (registrado no log por `registrarCliqueMapa`). O iframe nunca é
renderizado no servidor.

**Painel administrativo é local e nunca vai ao ar.** `app/admin/` está no
`.gitignore`, então `/admin` e `/admin/login` não existem no deploy — a rota vira
404 lá. As envs `ADMIN_SENHA` e `ADMIN_SESSION_SECRET` só existem no
`.env.local` (sem elas a checagem falha fechado: tudo redireciona pro login). O
fluxo de publicação é: texto escrito no painel local → `content/blog/<slug>.mdx`
e `public/blog/imagens/*` versionados → build/deploy. `proxy.ts`, a sessão em
`greentax_admin` (8h, `httpOnly`) e o `disallow: /admin` do `robots.ts`
permanecem como trava extra caso o painel seja ligado em produção — por isso
esse cookie não aparece na tabela da §7 da política.

**Acessibilidade.** Skip link, foco visível, `aria-current` na navegação,
`aria-invalid` e mensagens de erro associadas nos campos, `prefers-reduced-motion`
respeitado.
