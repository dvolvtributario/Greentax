# Site institucional Greentax — guia do projeto

Site em Next.js 16 (App Router), React 19, TypeScript e Tailwind CSS v4,
construído a partir do documento *Briefing de Criação + Copy Institucional —
Site Greentax, v1.0*.

---

## Rodar localmente

```bash
npm install     # necessário: o projeto ganhou novas dependências (MDX)
npm run dev     # http://localhost:3000
npm run build   # build de produção
npx eslint .    # lint
```

---

## Estrutura

```
app/                          rotas (App Router)
├─ page.tsx                   Home
├─ layout.tsx                 layout raiz, metadata global, JSON-LD
├─ globals.css                design tokens (cores, sombras, tipografia)
├─ fonts/                     Inter variável, hospedada localmente
├─ quem-somos/
├─ solucoes/
│  ├─ page.tsx                hub das duas frentes
│  ├─ contabil-fiscal-trabalhista/
│  └─ consultoria-estrategica/
├─ diferenciais/
├─ nichos/
├─ blog/
│  ├─ page.tsx                listagem com filtro por categoria
│  └─ [slug]/page.tsx         artigo
├─ contato/
│  ├─ page.tsx
│  └─ acoes.ts                Server Action do formulário
├─ politica-de-privacidade/
├─ sitemap.ts                 sitemap.xml gerado
├─ robots.ts                  robots.txt gerado
├─ icon.png / apple-icon.png / favicon.ico

components/
├─ layout/                    Header, Footer
├─ sections/                  blocos reutilizáveis entre páginas
└─ ui/                        primitivas (botão, container, seção, ícones)

lib/
├─ site.ts                    DADOS INSTITUCIONAIS — edite aqui
├─ conteudo.ts                copy das páginas
├─ blog.ts                    leitura dos artigos MDX
└─ utils.ts

content/blog/                 artigos em .mdx
public/marca/                 arquivos do logotipo
```

---

## Onde mexer para cada coisa

| Quero mudar… | Arquivo |
| --- | --- |
| Telefone, endereço, CNPJ, redes sociais | `lib/site.ts` |
| Domínio do site (antes de publicar!) | `lib/site.ts` → `site.url` |
| Números de prova social | `lib/site.ts` → `site.indicadores` |
| Textos das páginas | `lib/conteudo.ts` |
| Cores e sombras | `app/globals.css` |
| Itens do menu | `lib/site.ts` → `navegacao` |

---

## Paleta

Extraída do logotipo oficial, medida pixel a pixel — não estimada.

| Token | Hex | Contraste sobre branco | Uso |
| --- | --- | --- | --- |
| `brand-800` | `#166936` | 6.76:1 ✅ AA | Verde institucional. Texto, CTAs, links. |
| `brand-600` | `#428436` | 4.58:1 ✅ AA | Verde claro escurecido, seguro para texto pequeno. |
| `brand-500` | `#509F41` | 3.29:1 ⚠️ | Verde claro da marca. **Só** ícones, gráficos e títulos grandes. |
| `ink-500` | `#5C6560` | 6.03:1 ✅ AA | Texto de apoio. |
| `ink-900` | `#101512` | 18.45:1 ✅ | Títulos. |

> ⚠️ O verde claro (`brand-500`) reprova no WCAG AA para texto pequeno. Ele é a
> cor de destaque da marca e funciona bem em elementos gráficos, mas nunca deve
> virar cor de parágrafo ou de link no corpo do texto.

### Arquivos de marca

| Arquivo | Uso |
| --- | --- |
| `public/marca/greentax-logo.png` | Lockup completo (wordmark + assinatura), fundo transparente |
| `public/marca/greentax-logo-branco.png` | Versão negativa, para fundos escuros/verdes |
| `public/marca/greentax-wordmark.png` | Só o wordmark — usado no header, onde a assinatura ficaria ilegível |
| `public/marca/greentax-wordmark-branco.png` | Wordmark negativo |
| `public/marca/greentax-icone.png` | Monograma GT, recolorido para a paleta do wordmark |

**Nota sobre o monograma:** o arquivo original do GT usava verdes diferentes do
wordmark (`#097340` / `#4DAD43`, mais esmeralda). Ele foi recolorido para os
tons do wordmark (`#166936` / `#509F41`) para que favicon e header combinem.

**Nota sobre formato:** todos os arquivos recebidos eram raster (PNG/JPG). As
resoluções são suficientes para uso em tela, mas se algum dia for preciso
imprimir ou aplicar em tamanho grande, vale pedir o **SVG ou AI original** a
quem criou o logotipo.

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

A listagem lê a pasta sozinha — não é preciso registrar o artigo em lugar nenhum.

O arquivo `modelo-de-artigo.mdx` é só um gabarito: **apague-o** quando o primeiro
conteúdo real for publicado.

Se um dia a Greentax quiser publicar por painel em vez de por commit, o único
arquivo a mudar é `lib/blog.ts` — as páginas continuam iguais.

---

## Formulário de contato

O formulário valida os campos, tem proteção anti-spam (honeypot) e exige
consentimento LGPD explícito. **A entrega do lead ainda não está configurada.**

Para ativar sem escolher um CRM agora, crie um `.env.local`:

```
CONTATO_WEBHOOK_URL=https://…
```

Pode apontar para Zapier, Make, n8n, WhatsApp Business API ou um endpoint
próprio. O lead é enviado como JSON via POST.

> 🚨 **Sem essa variável, o lead é apenas registrado no log do servidor — ou
> seja, na prática ele se perde.** Não publique o site em produção sem
> configurar a entrega.

---

## Pendências

Todas as lacunas de conteúdo estão marcadas no código com o componente
`<Pendente>` e aparecem visualmente na página (de propósito — lacuna esquecida
tem que incomodar). Para listar todas:

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
| 13 | **Banner de cookies** — depende de decidir as ferramentas de análise | global |
| 14 | **Domínio definitivo** | `lib/site.ts` → `site.url` |
| 15 | **Linha do tempo** da empresa (opcional) | `/quem-somos` |

---

## Decisões técnicas registradas

**Fonte hospedada localmente.** A Inter vem de um `.woff2` dentro do projeto
(`app/fonts/`) em vez de ser baixada do Google Fonts durante o build. O build
funciona offline e não depende da disponibilidade de um serviço externo.
Licença OFL incluída.

**Filtro do blog por URL.** As categorias usam `?categoria=` com links reais em
vez de estado no cliente: funciona sem JavaScript, é indexável e o usuário pode
compartilhar o link filtrado.

**Dados estruturados.** `AccountingService` (schema.org) no layout raiz e
`BlogPosting` em cada artigo, para busca local em Araçatuba/SP.

**Sem banner de cookies ainda.** O site hoje não carrega nenhum script de
terceiros — nem Google Analytics, nem Meta Pixel, nem iframe do Maps. Enquanto
for assim, não há cookie que exija consentimento. O banner passa a ser
obrigatório no momento em que qualquer uma dessas ferramentas entrar.

**Acessibilidade.** Skip link, foco visível, `aria-current` na navegação,
`aria-invalid` e mensagens de erro associadas nos campos do formulário,
`prefers-reduced-motion` respeitado.
