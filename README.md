# Casa de Barro — Cardápio Digital com Pedidos via WhatsApp

Aplicação web de cardápio digital interativo para restaurantes, com identidade visual rústica em tons terrosos, carrinho de compras persistente na sessão, cálculo automático de taxa fixa de entrega, validação de formulário e envio direto do pedido formatado para o WhatsApp via link `wa.me`.

> **Aviso de Dados de Demonstração:** O estabelecimento **Casa de Barro — Cozinha de Fogo, Panela de Barro & Raiz**, bem como seu endereço, telefone, descrições de pratos e preços, são **fictícios** e foram criados exclusivamente para fins de demonstração técnica e portfólio.

---

## Tecnologias Utilizadas

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) com [React 19](https://react.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (tipagem estrita em todo o domínio de cardápio, carrinho e pedido)
- **Estilização:** [Tailwind CSS 4](https://tailwindcss.com/) + variáveis CSS com paleta terrosa e tipografia artesanal (`Fraunces` e `Plus Jakarta Sans` via `next/font/google`)
- **Ícones:** [Lucide React](https://lucide.dev/) + ilustrações vetoriais em SVG para fallback de pratos
- **Testes Automatizados:** [Vitest](https://vitest.dev/), [Testing Library](https://testing-library.com/) e `jsdom`

---

## Justificativa da Escolha da Stack (React com Next.js)

Optou-se por **React com Next.js (App Router)** pelos seguintes motivos técnicos:

1. **Integração nativa com a Vercel:** o Next.js possui suporte de primeira classe na Vercel, com configuração zero de build, otimização automática de fontes (`next/font`) e carregamento eficiente de ativos estáticos e imagens.
2. **Arquitetura modular e tipada:** a separação entre configuração de dados (`src/config/`), regras de negócio puras (`src/lib/`) e componentes de interface (`src/components/`) facilita tanto a manutenção do cardápio quanto a execução de testes unitários e de integração rápidos com Vitest.
3. **Experiência mobile-first com hidratação rápida:** o pré-carregamento da estrutura da página aliado ao gerenciamento de estado no cliente (`sessionStorage`) garante abertura imediata em smartphones, que concentram a maioria dos pedidos enviados pelo WhatsApp.

---

## Funcionalidades

- **Cardápio organizado por categorias:** filtro rápido por categorias (*Entradas da Roça*, *Carnes de Brasa & Fogo*, *Panelas de Barro & Raiz*, *Massas & Da Horta*, *Guarnições da Casa*, *Doces de Tacho* e *Bebidas & Refrescos*), busca textual por nome ou ingrediente e filtro por selos de preparo (*Assado na lenha*, *Panela de barro*, *Vegetariano*, *Sem glúten*, *Para compartilhar*).
- **Fotografia com fallback em SVG:** cada prato exibe foto com esqueleto de carregamento e, caso a imagem não esteja disponível ou falhe, renderiza automaticamente uma ilustração geométrica de prato de barro em SVG correspondente à paleta do item.
- **Carrinho de compras persistente na sessão:** adição de itens, alteração de quantidade (`+` e `-`), remoção individual ou limpeza completa da comanda, mantendo os dados salvos em `sessionStorage` durante a sessão do navegador.
- **Cálculo de entrega ou retirada:**
  - **Entrega no endereço:** soma automaticamente a taxa fixa única configurada ao subtotal dos itens e torna o campo de endereço obrigatório.
  - **Retirada no balcão:** isenta a taxa de entrega (`R$ 0,00`) e dispensa o preenchimento de endereço de entrega.
- **Validação dos dados do pedido:** validação de carrinho não vazio, nome do cliente, telefone com máscara automática `(XX) XXXXX-XXXX`, endereço de entrega (apenas quando a modalidade for entrega), forma de pagamento (*PIX*, *Cartão* ou *Dinheiro*), validação opcional de valor para troco em dinheiro e limite de caracteres nas observações.
- **Geração automática da mensagem e link do WhatsApp:** formatação estruturada contendo itens, quantidades, preços unitários, subtotal, modalidade, taxa de entrega (quando aplicável), total geral, forma de pagamento, troco, dados do cliente e observações, com pré-visualização na tela, botão de cópia rápida e abertura em `https://wa.me/<numero>?text=<mensagem_codificada>` usando `encodeURIComponent`.

---

## Estrutura de Pastas

```text
CARDAPIO-DIGITAL-RESTAURANTE/
├── .env.example                           # Exemplo de variáveis de ambiente (WhatsApp e taxa de entrega)
├── next.config.ts                         # Configuração do Next.js
├── package.json                           # Scripts e dependências do projeto
├── postcss.config.mjs                     # Configuração do PostCSS / Tailwind CSS
├── tsconfig.json                          # Configuração do TypeScript
├── vitest.config.ts                       # Configuração da suíte de testes Vitest
└── src/
    ├── app/
    │   ├── globals.css                    # Tema rústico terroso, tipografia e estilos globais
    │   ├── layout.tsx                     # Layout raiz, carregamento de fontes e metadados
    │   └── page.tsx                       # Página principal do cardápio digital
    ├── components/
    │   ├── CartDrawer.tsx                 # Área dedicada do carrinho (Slide-over Drawer sob demanda)
    │   ├── CategoryNav.tsx                # Barra fixa de categorias, busca, filtros e atalho do carrinho
    │   ├── DishIllustration.tsx           # Exibição de imagem do prato com fallback vetorial em SVG
    │   ├── Header.tsx                     # Cabeçalho com aviso de demonstração, contador do carrinho e taxas
    │   ├── MenuCard.tsx                   # Cartão individual de prato com controle de quantidade
    │   ├── MenuExperience.tsx             # Orquestração do cardápio em largura total e carrinho dedicado
    │   ├── OrderPanel.tsx                 # Conteúdo da comanda com resumo, formulário e envio ao WhatsApp
    │   └── __tests__/
    │       └── MenuExperience.test.tsx    # Teste de integração do fluxo completo de pedido
    ├── config/
    │   ├── menu.ts                        # Categorias e itens do cardápio (fonte de dados separada)
    │   └── restaurant.ts                  # Dados do restaurante, número de WhatsApp e taxa de entrega
    ├── lib/
    │   ├── cart.ts                        # Funções puras do carrinho, totais e persistência em sessão
    │   ├── currency.ts                    # Formatação e leitura de valores em Real (BRL)
    │   ├── order-validation.ts            # Máscara de telefone e validação do formulário de pedido
    │   ├── whatsapp.ts                    # Formatação da mensagem e geração da URL codificada wa.me
    │   └── __tests__/
    │       ├── cart.test.ts               # Testes unitários do carrinho e cálculo de totais
    │       ├── order-validation.test.ts   # Testes unitários da validação do formulário
    │       └── whatsapp.test.ts           # Testes unitários da mensagem e link do WhatsApp
    └── types/
        └── menu.ts                        # Contratos e tipos TypeScript do projeto
```

---

## Como Rodar Localmente

### Pré-requisitos

- **Node.js** 20.x ou superior
- **npm** 10.x ou superior

### Passo a passo

1. Acesse a pasta do projeto:

   ```bash
   cd CARDAPIO-DIGITAL-RESTAURANTE
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. (Opcional) Crie um arquivo `.env.local` na raiz a partir do modelo `.env.example`:

   ```bash
   cp .env.example .env.local
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Abra `http://localhost:3000` no navegador.

---

## Como Executar os Testes

Para executar todos os testes automatizados (lógica do carrinho, cálculo de subtotal e taxa de entrega, validação do formulário, geração da mensagem/link do WhatsApp e integração de interface):

```bash
npm test
```

Para executar os testes em modo de observação contínua durante o desenvolvimento:

```bash
npm run test:watch
```

Para validar a tipagem e o linter do código:

```bash
npm run lint
```

Para testar o build de produção localmente:

```bash
npm run build
```

---

## Como Personalizar as Configurações

### 1. Como trocar o número de WhatsApp

O número de WhatsApp não fica fixo nos componentes visuais. Você pode alterá-lo de duas maneiras:

- **Via variável de ambiente (Recomendado para produção/Vercel):**
  Defina a variável `NEXT_PUBLIC_WHATSAPP_NUMBER` no arquivo `.env.local` ou no painel da Vercel contendo o código do país (`55`), o DDD e o número, apenas com dígitos:
  ```env
  NEXT_PUBLIC_WHATSAPP_NUMBER=5512991026455
  ```
- **Via arquivo de configuração:**
  Edite o valor padrão em `src/config/restaurant.ts` na propriedade `contact.whatsappNumber` (e `contact.displayPhone` para o texto exibido no cabeçalho).

### 2. Como alterar o valor da taxa fixa de entrega

- **Via variável de ambiente:**
  Defina `NEXT_PUBLIC_DELIVERY_FEE` no arquivo `.env.local` ou no painel da Vercel (usando ponto como separador decimal):
  ```env
  NEXT_PUBLIC_DELIVERY_FEE=9.90
  ```
- **Via arquivo de configuração:**
  Edite o valor padrão em `src/config/restaurant.ts` na propriedade `delivery.fixedFee`.

### 3. Como editar os itens e categorias do cardápio

Todo o catálogo de categorias e pratos está isolado em `src/config/menu.ts`:

- **Para editar ou criar categorias:** altere a lista `menuCategories` em `src/config/menu.ts` (e, se criar um novo identificador de categoria, adicione-o ao tipo `CategoryId` em `src/types/menu.ts`).
- **Para adicionar, remover ou alterar pratos e preços:** edite o array `menuItems` em `src/config/menu.ts`. Cada item aceita:
  - `id`: identificador único do prato
  - `categoryId`: categoria à qual o prato pertence
  - `name`: nome exibido no cardápio e na mensagem do WhatsApp
  - `description`: descrição detalhada dos ingredientes e preparo
  - `price`: valor numérico em reais (ex.: `36.9`)
  - `servingSize`: indicação de porção (ex.: `"Serve 2 pessoas (700g)"`)
  - `prepTime` (opcional): tempo médio de preparo
  - `imageUrl` (opcional): URL da foto do prato (se omitida ou indisponível, o componente utiliza automaticamente a ilustração cerâmica em SVG definida por `motif`)
  - `motif`: tema de cor do prato (`"terracotta"`, `"olive"`, `"ochre"`, `"clay"`, `"charcoal"` ou `"copper"`)
  - `tags`: lista de etiquetas de preparo/restrição alimentar

---

## Como Fazer o Deploy na Vercel

1. Suba o projeto para um repositório no GitHub, GitLab ou Bitbucket.
2. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório.
3. Caso o repositório contenha múltiplas pastas, configure o **Root Directory** como `CARDAPIO-DIGITAL-RESTAURANTE`.
4. Na seção **Environment Variables**, adicione:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = número de WhatsApp com DDI e DDD (ex.: `5512991026455`)
   - `NEXT_PUBLIC_DELIVERY_FEE` = valor da taxa fixa de entrega (ex.: `9.90`)
5. Clique em **Deploy**. A Vercel detectará automaticamente o Next.js, executará `npm run build` e publicará a aplicação em uma URL HTTPS de produção.

# casa-de-barro
