# Real Estate Engine – Motor de Sites Imobiliários Multi‑Tenant

Motor de sites imobiliários white‑label construído com Next.js (App Router).  
A mesma base de código serve diferentes “sites” (tenants), trocando identidade visual, layout e conteúdo apenas via arquivos de configuração.

Atualmente o projeto inclui dois tenants:

- **Premium** – imobiliária de alto padrão (dourado, bordas retas, tipografia serifada).
- **Moderno** – imobiliária digital (azul, bordas arredondadas, foco em tecnologia).

---

## 1. Objetivo do Projeto

Atender a um cenário de arquitetura **multi‑tenant** com Next.js:

- Servir **múltiplos sites** a partir de **um único código**.
- Alterar **tema**, **layout** e **dados** somente via JSON.
- Usar **TypeScript**, **Tailwind CSS** e **App Router**.
- Garantir boa **escalabilidade**, **tipagem forte** e **uso correto de Server/Client Components**.

---

## 2. Stack Tecnológica

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4 (`@import "tailwindcss"` + `@theme inline`)
- **Config/Tema:**  
  - Server: funções puras (`getTenantConfig`)
  - Client: React Context (`TenantProvider` + `useTenant`)
- **Animações:** `motion/react`

Scripts principais:

```bash
npm run dev     # desenvolvimento
npm run build   # build de produção (lint + typecheck)
npm start       # rodar build de produção
npm run lint    # ESLint
```

---

## 3. Arquitetura

Estrutura geral:

```text
src/
  app/                # Rotas e páginas (App Router)
    api/              # Rotas de API (ex: /api/imoveis)
    imoveis/          # Listagem e página de detalhes
    layout.tsx        # Root layout (Server Component)
    page.tsx          # Home (Server Component)
    globals.css       # Tailwind + CSS variables

  config/
    tenants/          # Configuração por tenant (JSON + registry)

  data/
    imoveis.json      # Mock de imóveis

  lib/
    filter-imoveis.ts # Filtro por bairroTag
    get-tenant-config.ts
    theme-to-css-vars.ts

  types/
    tenant.ts         # Interfaces de configuração por tenant

  components/
    layout/           # Header, Footer
    sections/         # Hero, Services, Stats, Testimonials, PropertyGrid
    cards/            # Cards de imóvel
    ui/               # Button, Tag, Container, PriceDisplay
    providers/        # TenantProvider, ThemeProvider
    animation/        # ElementAnimations, PageTransition, etc.

middleware.ts         # Middleware de detecção de tenant
```

Princípios:

- **Config‑driven UI:** tema, layout, textos e seções vêm da configuração JSON.
- **Server Components por padrão:** páginas e layout são Server Components.
- **Client Components só onde precisa:** animações, troca de tenant, efeitos de scroll/hover.
- **Zero duplicação de CSS:** tudo via Tailwind + CSS variables.

---

## 4. Multi‑Tenancy (Detecção de Tenant)

A detecção do tenant é feita pelo middleware em [src/middleware.ts](./src/middleware.ts), seguindo esta ordem:

1. Query string: `?tenant=premium` ou `?tenant=moderno`
2. Subdomínio: `premium.localhost:3000`, `moderno.localhost:3000`
3. Cookie `tenant`
4. Fallback: `moderno`

O middleware:

- Seta o header `x-tenant-slug` (lido nos Server Components via `headers()`).
- Persiste o tenant em um cookie `tenant` para navegações seguintes.

No server, `getTenantConfig()` usa esse header/cookie para retornar o `TenantConfig` correto.  
No client, `TenantProvider` expõe a configuração com `useTenant()`.

---

## 5. Motor de Temas (Design Tokens + Tailwind)

### 5.1. Tokens por tenant

Cada tenant define um conjunto de tokens em JSON:

- [Premium](./src/config/tenants/premium.json)
- [Moderno](./src/config/tenants/moderno.json)

Esses arquivos seguem a interface `ThemeTokens` em [src/types/tenant.ts](./src/types/tenant.ts), com:

- Cores primárias/secundárias, background, surface, texto, borda.
- Fontes (display e body), tamanho e peso de hero.
- Border radius (sm, md, lg, card, button).
- Sombras de card, blur de header.
- Tempo padrão de transição.

Exemplo de contraste:

- **Premium**
  - Primary dourado, bordas quase retas, fonte display serifada.
- **Moderno**
  - Primary azul, bordas bem arredondadas, fonte display sans‑serif.

### 5.2. CSS variables + `@theme inline`

O theming funciona em duas camadas:

1. **Runtime:** `ThemeProvider` converte `ThemeTokens` em variáveis CSS (`--tenant-*`) usando `themeToCssVars`.
2. **Build time:** `app/globals.css` registra essas variáveis no Tailwind com `@theme inline`, criando utilitários como:
   - `bg-surface`, `bg-secondary`
   - `text-muted`, `text-on-primary`
   - `rounded-card`, `rounded-button`
   - `shadow-card`, `shadow-card-hover`

Assim, as classes Tailwind são fixas, mas os valores mudam por tenant via CSS variables.

---

## 6. Componentização Dinâmica

### 6.1. Header

Controlado por `layout.headerLogoPosition` em `TenantConfig`:

- `"left"`, `"center"` ou `"right"`.
- O Header monta a barra com a logo e navegação em posições diferentes conforme o tenant.

### 6.2. Card de Imóvel

Controlado por `layout.propertyCardLayout` (`"vertical"` ou `"horizontal"`) e `layout.gridColumns`:

- **Moderno**
  - Layout horizontal (imagem na lateral), 2 colunas.
- **Premium**
  - Layout vertical (imagem no topo), 3 colunas, detalhes mais sóbrios e hover refinado.

O componente [PropertyGrid](./src/components/sections/PropertyGrid.tsx) escolhe qual card usar (vertical/horizontal) de forma server‑side.

### 6.3. Seção Hero

Controlada pelo bloco `hero` dos JSONs:

- `backgroundImage`, `headline`, `subheadline`, `ctaText`, `ctaLink`
- Opções como `secondaryCtaText`, direção de gradiente e flags de partículas.

Implementação em [HeroSection.tsx](./src/components/sections/HeroSection.tsx):

- Premium:
  - Overlay escuro com foco em elegância.
  - Tipografia serif, layout centralizado.
- Moderno:
  - Gradiente conforme `hero.gradientDirection`.
  - Partículas flutuantes e elementos animados discretos.

### 6.4. Seções opcionais

Flags no `layout` ligam/desligam seções:

- `showServices` → ServicesSection
- `showStats` → StatsSection
- `showTestimonials` → TestimonialsSection
- `showTeam` → seção de equipe (opcional)

Cada tenant decide o que exibir apenas alterando JSON.

---

## 7. Dados e Filtro de Imóveis

### 7.1. Dados mock

Arquivo: [src/data/imoveis.json](./src/data/imoveis.json)

Cada imóvel possui:

- `id`, `titulo`, `descricao`
- `bairroTag` (usado para filtrar por tenant)
- `preco`, `imagem`
- `caracteristicas` (ícone, label, valor)

### 7.2. Filtro por tenant

Implementado em [src/lib/filter-imoveis.ts](./src/lib/filter-imoveis.ts):

- `filterImoveisByTenant(allowedTags)` filtra imóveis cujo `bairroTag` está em `config.allowedTags`.
- `getImovelById(id)` retorna um imóvel específico.

Uso:

- Home (`/`): exibe um grid de imóveis do tenant ativo.
- `/imoveis`: listagem completa filtrada pelo tenant.
- `/imoveis/[id]`: página de detalhes do imóvel.

### 7.3. Mock API

Rota `/api/imoveis` em [src/app/api/imoveis/route.ts](./src/app/api/imoveis/route.ts):

- Lê `?tenant=` na query string.
- Carrega a configuração do tenant.
- Filtra imóveis com `filterImoveisByTenant`.
- Retorna `{ imoveis, tenant }` em JSON.

---

### 7.4. Como adicionar novos imóveis e regiões

1. Abrir [`src/data/imoveis.json`](./src/data/imoveis.json) e adicionar um novo objeto com:
   - `id` único (string)
   - `bairroTag` com o nome da região (ex: `"Morumbi"`)
   - `titulo`, `descricao`, `preco`, `imagem`, `caracteristicas`
2. Incluir essa região em `allowedTags` do tenant que deve enxergar o imóvel:
   - Premium: [`src/config/tenants/premium.json`](./src/config/tenants/premium.json)
   - Moderno: [`src/config/tenants/moderno.json`](./src/config/tenants/moderno.json)
3. Opcional: colocar a mesma `bairroTag` em `allowedTags` dos dois tenants para que ambos vejam imóveis daquela região.

Não é necessário alterar componentes ou lógica: o filtro usa apenas `bairroTag` + `allowedTags`.

## 8. Como Rodar Localmente

Pré‑requisitos:

- Node.js instalado
- npm

Passos:

```bash
# Instalar dependências
npm install

# Ambiente de desenvolvimento
npm run dev
```

Acessar no navegador:

- `http://localhost:3000` (tenant padrão: moderno)
- `http://localhost:3000/?tenant=moderno`
- `http://localhost:3000/?tenant=premium`

### Subdomínio (opcional)

Adicionar no arquivo `hosts`:

```text
127.0.0.1 premium.localhost
127.0.0.1 moderno.localhost
```

Depois acessar:

- `http://premium.localhost:3000`
- `http://moderno.localhost:3000`

---

## 9. Adicionando um Novo Tenant

1. Criar `src/config/tenants/novo.json` seguindo `TenantConfig`.
2. Registrar esse JSON no registry de tenants.
3. Incluir o novo slug em `VALID_TENANTS` no middleware.
4. Acessar via `/?tenant=novo` ou subdomínio.

Nenhum componente precisa ser alterado para suportar o novo site.

---

## 10. Decisões Técnicas

- **Configuração via JSON** para separar código e conteúdo/layout.
- **Uso de Server Components** para páginas e seções estáticas.
- **Client Components mínimos** para animações e troca de tenant.
- **Theming por CSS variables** para evitar duplicação de CSS.
- **Filtros de dados puros** (`filterImoveisByTenant`) reaproveitáveis em páginas e API.

---

## 11. Links Curtos por Tenant

O projeto suporta caminhos curtos para ativar o tenant sem usar query string:

- `/premium` → abre a home do tenant Premium
- `/moderno` → abre a home do tenant Moderno
- Caminhos aninhados também funcionam:
  - `/premium/imoveis`
  - `/moderno/imoveis/123`

Como funciona:

- O middleware reescreve o caminho removendo o prefixo e define o cookie `tenant`.
- A partir daí, a navegação continua no tenant escolhido.
- Funciona normalmente no domínio padrão da Vercel (`*.vercel.app`), sem precisar de domínio próprio.
