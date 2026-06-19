# Gestão Financeira — Frontend

Interface web do MVP de uma plataforma de gestão financeira: registro e
acompanhamento de movimentações financeiras por categoria (entradas e saídas),
com dashboard de indicadores, filtros e paginação.

Construído em **React 19 + TypeScript**, consumindo uma API REST em NestJS.

---

## Links

- **Frontend em produção (Vercel):** https://gestoe-finaciera-frontend.vercel.app
- **API em produção (Swagger):** https://dev.backend-api-agua.shop/api/docs
- **Repositório backend:** https://github.com/kervisvasquez1993/Gest-o-Financeira
- **Repositório wrapper (execução local de backend + frontend):** https://github.com/kervisvasquez1993/wrapper-gestao-financiera

> ⚠️ **Sobre este repositório:** contém **apenas o frontend** e está pensado para
> **deploy em produção** (publicado na Vercel) e para registrar o histórico de
> commits do desenvolvimento. **Não é destinado a execução local isolada.**
>
> Para rodar o projeto completo localmente (backend + frontend + PostgreSQL com
> um único comando via Docker Compose), utilize o **repositório wrapper** acima,
> que orquestra ambos os serviços e contém as instruções de execução local.

### Credenciais de teste (pós-seed)

Ambos os usuários têm a senha **`123456`**:

| Email               | Senha    |
| ------------------- | -------- |
| `joao@example.com`  | `123456` |
| `maria@example.com` | `123456` |

---

## ✨ Funcionalidades

- **Autenticação** — registro, login com JWT, rotas protegidas e validação de
  token (expiração) no client.
- **Categorias** — CRUD completo via modais, com tratamento do caso de exclusão
  bloqueada (categoria com transações associadas).
- **Transações** — criação e edição em páginas dedicadas, exclusão com
  confirmação, listagem paginada e filtros (tipo, categoria, período e busca por
  texto na descrição).
- **Dashboard** — saldo atual, total de entradas/saídas e top 3 categorias de
  gastos, com filtro de período. Cada item do top leva à lista de transações já
  filtrada. Todos os cálculos vêm da API.
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
| Testes             | Vitest                                        |

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

1. **É a forma como trabalho no dia a dia** em React, e me dá fluidez e
   confiança. Aplicá-la **não representou atraso nem dificuldade** — pelo
   contrário, a estrutura já é familiar e cada peça tem um lugar óbvio, o que me
   permitiu manter um ritmo de desenvolvimento consistente e cumprir o prazo.
2. **É consequência de escrever código limpo**, princípio que sigo sempre:
   separar responsabilidades, manter a regra de negócio (validações, value
   objects) desacoplada da API e da UI. Se o backend mudar o formato de
   resposta, só a camada de `infrastructure` é tocada.
3. **Facilita testes**: os use cases dependem de interfaces, não de
   implementações, então podem ser testados sem mockar Axios — exatamente o que
   foi feito na suíte de testes.

A separação foi mantida **proporcional ao problema** e **não introduz
over-engineering operacional**: sem filas, sem event sourcing, sem CQRS. É
apenas organização de código em camadas com as dependências apontando para o
centro — uma Clean Architecture leve, voltada a manutenção e testes, na mesma
linha da decisão tomada no backend.

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

## 🧪 Testes

Os testes focam na **lógica pura e regras de negócio**, não em componentes
triviais — qualidade e relevância acima de quantidade, conforme o enunciado.
São **17 casos em 4 suites**, cobrindo as camadas onde vive a regra de negócio:

| Suite                 | Casos cobertos                                                          |
| --------------------- | ----------------------------------------------------------------------- |
| Value objects         | `Email`, `Password`, `Money`, `TransactionType` — invariantes e limites |
| `normalizeHttpError`  | Parse do erro do backend, incluindo `message` como `string[]`           |
| `TransactionMapper`   | Resposta → entidade com value objects; valor com sinal; paginação       |
| `TransactionUseCases` | Valida o domínio **antes** de chamar o repositório (com repo mockado)   |

A suíte do use case demonstra o benefício da arquitetura: como o caso de uso
depende de uma interface, basta mockar o repositório — sem tocar em Axios nem na
rede.

Executar:

```bash
npm run test         # modo watch
npm run test:run     # execução única (CI)
```

---

## 🚀 Desenvolvimento local (apenas frontend)

> Para rodar a stack completa, use o **repositório wrapper**. Esta seção é só
> para trabalhar isoladamente no frontend, apontando para uma API já em execução.

### Pré-requisitos

- Node.js 20+
- API backend acessível (local ou a de produção)

### Passo a passo

```bash
# 1. Instalar dependências
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
A variável é compilada no bundle em **build time** — ao trocar de ambiente, é
necessário rebuildar.

---

## 🐳 Docker

A imagem é multi-stage (build com `node:22-alpine`, produção com `nginx:alpine`
servindo apenas os estáticos). O nginx está configurado com fallback a
`index.html` para o routing da SPA.

```bash
docker build \
  --build-arg VITE_API_URL=http://localhost:3000/api \
  -t gestao-financiera-frontend .

docker run -p 8080:80 gestao-financiera-frontend
```

> A `VITE_API_URL` vai como `--build-arg` (não como env de runtime) porque o
> Vite a compila no bundle. No wrapper, é passada via `build.args` do compose.

---

## 📜 Scripts

| Script             | Descrição                      |
| ------------------ | ------------------------------ |
| `npm run dev`      | Servidor de desenvolvimento    |
| `npm run build`    | Type-check + build de produção |
| `npm run preview`  | Pré-visualização do build      |
| `npm run lint`     | ESLint                         |
| `npm run test`     | Testes (watch)                 |
| `npm run test:run` | Testes (execução única)        |

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

## 📌 Observações

- As datas de transação seguem o formato `YYYY-MM-DD`.
- O valor (`amount`) é sempre positivo; o sinal é determinado pelo tipo
  (`entrada` soma, `saida` subtrai).
- Os indicadores do dashboard são calculados pela API — o frontend apenas
  exibe.
