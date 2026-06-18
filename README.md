# Gestão Financeira — Frontend

Interface web do MVP de uma plataforma de gestão financeira: registro e
acompanhamento de movimentações financeiras por categoria (entradas e saídas),
com dashboard de indicadores, filtros e paginação.

Construído em **React 19 + TypeScript**, consumindo uma API REST em NestJS.

> 🔗 **Deploy:** [adicionar link aqui]
> 🔗 **Repositório backend:** [adicionar link aqui]

---

## ✨ Funcionalidades

- **Autenticação** — registro, login com JWT, rotas protegidas e validação de
  token (expiração) no client.
- **Categorias** — CRUD completo via modais, com tratamento do caso de exclusão
  bloqueada (categoria com transações associadas).
- **Transações** — criação e edição em páginas dedicadas, exclusão com
  confirmação, listagem paginada e filtros (tipo, categoria, período).
- **Dashboard** — saldo atual, total de entradas/saídas e top 3 categorias de
  gastos, com filtro de período. Todos os cálculos vêm da API.
- **Tema claro/escuro** — alternância persistida, via tokens semânticos de cor.
- **Feedback visual** — estados de carregamento, erro e sucesso em todas as
  operações.

---

## 🛠️ Stack e decisões técnicas

| Camada             | Escolha                                       |
| ------------------ | --------------------------------------------- |
| Build              | Vite                                          |
| UI                 | React 19 (apenas function components + hooks) |
| Estilo             | Tailwind CSS v4 (CSS-first)                   |
| Estado de servidor | TanStack React Query                          |
| Estado de cliente  | Zustand                                       |
| Formulários        | React Hook Form + Zod                         |
| Rotas              | React Router                                  |
| HTTP               | Axios (via adapter)                           |

### Gerenciamento de estado — justificativa

A escolha foi **separar estado de servidor de estado de cliente**, em vez de um
único store global:

- **React Query** para tudo que vem da API (transações, categorias, dashboard,
  perfil). Ele cuida de cache, invalidação, refetch e estados de
  loading/error/success. Por exemplo, ao criar uma transação, invalidamos as
  queries de `transactions` e `dashboard` — a UI se atualiza sozinha, sem estado
  manual.
- **Zustand** para estado realmente de cliente: sessão/token de autenticação,
  filtros de transações (persistem ao navegar e têm botão de reset), tema e
  pequenos estados de coordenação entre componentes.

Evitamos Redux de propósito: para este escopo seria peso desnecessário. A
combinação React Query + Zustand cobre as necessidades com menos boilerplate e
limites de responsabilidade mais claros.

### Dependências enxutas

O projeto usa poucas bibliotecas além do essencial. A camada de UI (botões,
inputs, selects, modais, formulários, listas) é **composta por componentes
próprios** sobre Tailwind — não há design system de terceiros. A única exceção é
o `@radix-ui/react-dialog`, usado como base acessível dos modais (foco, ESC,
overlay), e `lucide-react` para ícones.

### Sobre a arquitetura (DDD) — decisão consciente

O enunciado indica que DDD não é necessário, e isso está correto: o problema não
exige essa complexidade. **A escolha de aplicar uma arquitetura em camadas
inspirada em DDD foi deliberada**, pelos seguintes motivos:

1. É a forma como trabalho no dia a dia em React, e me permite desenvolver com
   velocidade e consistência — a estrutura já é familiar e cada peça tem um lugar
   óbvio.
2. Mantém a regra de negócio (validações, value objects) desacoplada da API e da
   UI. Se o backend mudar o formato de resposta, só a camada de
   `infrastructure` é tocada.
3. Facilita testes: os use cases dependem de interfaces, não de implementações,
   então podem ser testados sem mockar Axios.

A separação é simples de seguir e **não introduz over-engineering operacional**
(sem filas, sem event sourcing, sem CQRS): é apenas organização de código em
camadas com dependências apontando para o centro.

---

## 📂 Estrutura do projeto

```
src/
├── app/                    # composição: providers (React Query)
├── domain/                 # núcleo: entities, value objects, errors,
│                           #   repositories (interfaces), use cases (interfaces)
├── aplication/             # use cases (implementação) + services (query/mutation)
├── infrastructure/         # api (adapter/factory), actions, interfaces,
│                           #   mappers, repositories (implementação)
└── presentation/           # screens, components, hooks, schemas (Zod),
                            #   stores (Zustand), layouts, router, utils
```

Fluxo de dados (exemplo de criação):

```
Screen → hook de tela → mutation (React Query) → use case
   → repository (interface)  ← repository impl (infrastructure)
   → action (HTTP) → API → mapper (resposta → entity) → volta à UI
```

A dependência sempre aponta para o centro:
`presentation → aplication → domain ← infrastructure`.

---

## 🎨 Tema e estilo

Cores definidas como **tokens semânticos** em `src/index.css`
(`background`, `surface`, `text`, `primary`, `success`, `danger`, etc.). O tema
escuro sobrescreve esses tokens via atributo `data-theme="dark"` no `<html>`.
Componentes usam classes como `bg-background` / `text-text`, então a troca de
tema reflete em toda a aplicação sem alterar componente algum.

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 20+
- API backend rodando (ver repositório do backend)

### Passo a passo

```bash
# 1. Clonar e instalar dependências
git clone <url-do-repo>
cd gestao-finaciera-frontend
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# editar .env com a URL da API

# 3. Iniciar em desenvolvimento
npm run dev
```

A aplicação sobe em `http://localhost:5173`.

### Variáveis de ambiente

```bash
# .env
VITE_API_URL=http://localhost:3000/api
```

Apenas variáveis com prefixo `VITE_` são expostas ao client (regra do Vite).

---

## 📜 Scripts

| Script            | Descrição                      |
| ----------------- | ------------------------------ |
| `npm run dev`     | Servidor de desenvolvimento    |
| `npm run build`   | Type-check + build de produção |
| `npm run preview` | Pré-visualização do build      |
| `npm run lint`    | ESLint                         |

---

## 🔒 Qualidade de código

- **TypeScript strict** com `erasableSyntaxOnly` ativo — sem parameter
  properties, enums ou namespaces; código transpilável por qualquer ferramenta.
- **Uso de `any` evitado** — componentes genéricos (`Form`,
  `CategorySelectField`) são tipados com generics em vez de `any`.
- **Husky + commitlint** — commits seguem Conventional Commits, validados em
  hook de `commit-msg`. Lint e format automáticos via `lint-staged` no
  `pre-commit`.
- **Componentes pequenos** — UI dividida em componentes reutilizáveis;
  formulários e listas usam composição (compound components).

---

## 🔑 Credenciais de teste

```
E-mail: [adicionar usuário seed]
Senha:  [adicionar senha]
```

---

## 📌 Observações

- As datas de transação seguem o formato `YYYY-MM-DD`.
- O valor (`amount`) é sempre positivo; o sinal é determinado pelo tipo
  (`entrada` soma, `saida` subtrai).
- Os indicadores do dashboard são calculados pela API — o frontend apenas
  exibe.
