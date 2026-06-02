# FinanControl

Sistema de controle financeiro pessoal com arquitetura fullstack composta por uma API REST, aplicação web e aplicativo mobile.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
  - [API (Backend)](#api-backend)
  - [Frontend (Web)](#frontend-web)
  - [Mobile](#mobile)
- [Documentação da API](#documentação-da-api)
- [Endpoints](#endpoints)
- [Banco de Dados](#banco-de-dados)
- [Contribuição](#contribuição)

---

## Visão Geral

O **FinanControl** é uma aplicação de controle financeiro pessoal desenvolvida com arquitetura de três camadas:

- **API REST** — gerencia usuários, produtos e categorias com autenticação segura
- **Frontend Web** — interface moderna com React para acesso pelo navegador
- **App Mobile** — aplicativo multiplataforma com React Native + Expo para iOS e Android

Todas as camadas compartilham a mesma estrutura de navegação (Login → Tela Principal) e se comunicam via a API REST central.

---

## Tecnologias

### Backend (API)
| Tecnologia | Versão | Função |
|---|---|---|
| Node.js | — | Runtime JavaScript |
| Express.js | ^5.2.1 | Framework HTTP |
| PostgreSQL | — | Banco de dados relacional |
| pg | ^8.20.0 | Driver PostgreSQL |
| bcrypt | ^6.0.0 | Hash de senhas |
| Swagger UI Express | ^5.0.1 | Documentação interativa da API |
| CORS | ^2.8.6 | Controle de origens cruzadas |
| nodemon | ^3.1.14 | Reinicialização automática em dev |

### Frontend (Web)
| Tecnologia | Versão | Função |
|---|---|---|
| React | ^19.2.6 | Biblioteca de UI |
| React Router DOM | ^7.15.1 | Roteamento client-side |
| Vite | ^8.0.12 | Bundler e servidor de desenvolvimento |
| ESLint | ^10.3.0 | Linting de código |

### Mobile
| Tecnologia | Versão | Função |
|---|---|---|
| React Native | ^0.81.5 | Framework mobile |
| Expo | ~54.0.33 | Plataforma de desenvolvimento mobile |
| React Navigation | ^7.x | Navegação entre telas |
| React Native Gesture Handler | ~2.28.0 | Gestos nativos |
| React Native Reanimated | ~4.1.1 | Animações performáticas |

---

## Estrutura do Projeto

```
FinanControl/
│
├── api/                            # Backend — API REST
│   ├── app.js                      # Entry point da aplicação
│   ├── db.js                       # Conexão com PostgreSQL
│   ├── package.json
│   ├── config/
│   │   └── swagger.js              # Configuração do Swagger
│   └── src/
│       └── routes/
│           ├── rotasUsuarios.js    # Rotas de usuários
│           └── rotasCategorias.js  # Rotas de categorias
│
├── frontend/                       # Frontend Web — React + Vite
│   └── FinanControl/
│       ├── index.html
│       ├── vite.config.js
│       ├── package.json
│       └── src/
│           ├── App.jsx             # Componente raiz com rotas
│           ├── main.jsx
│           ├── pages/
│           │   ├── Login.jsx       # Página de login
│           │   └── Principal.jsx   # Painel principal
│           ├── styles/
│           │   └── Estilos.jsx     # Estilos da aplicação
│           └── utils.jsx           # Funções utilitárias
│
└── mobile/                         # App Mobile — React Native + Expo
    └── FinanControl/
        ├── App.js                  # Componente raiz com navegação
        ├── index.js
        ├── app.json                # Configuração do Expo
        ├── package.json
        └── src/
            ├── pages/
            │   ├── Login.js        # Tela de login
            │   ├── Principal.js    # Tela principal
            │   └── MenuDrawer.js   # Menu lateral (drawer)
            ├── styles/
            │   └── Estilos.js      # Estilos React Native
            └── utils.js            # Funções utilitárias
```

---

## Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/) (v9 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (v14 ou superior)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (para o mobile)
- [Expo Go](https://expo.dev/client) no dispositivo físico ou emulador Android/iOS configurado

---

## Instalação e Execução

### API (Backend)

1. Acesse a pasta da API:
   ```bash
   cd api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o banco de dados em `db.js`:
   ```js
   host: 'localhost',
   database: 'bd_produtos',
   user: 'postgres',
   password: 'sua_senha',
   port: 5432
   ```

4. Inicie o servidor:
   ```bash
   npm start
   ```

   A API estará disponível em `http://localhost:3000`.

---

### Frontend (Web)

1. Acesse a pasta do frontend:
   ```bash
   cd frontend/FinanControl
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

   A aplicação estará disponível em `http://localhost:5173`.

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Visualiza o build de produção |
| `npm run lint` | Executa verificação de código |

---

### Mobile

1. Acesse a pasta do mobile:
   ```bash
   cd mobile/FinanControl
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor Expo:
   ```bash
   npm start
   ```

4. Escolha a plataforma desejada:

   ```bash
   npm run android   # Emulador ou dispositivo Android
   npm run ios       # Simulador iOS (requer macOS)
   npm run web       # Versão web
   ```

   > Documentação do Expo utilizada: [Expo v54.0.0](https://docs.expo.dev/versions/v54.0.0/)

---

## Documentação da API

Com a API em execução, acesse a documentação interativa via Swagger:

```
http://localhost:3000/swagger
```

---

## Endpoints

### Autenticação
| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/login` | Autenticação de usuário |

### Usuários
| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/usuarios` | Lista todos os usuários |
| `POST` | `/usuarios` | Cria um novo usuário |
| `PUT` | `/usuarios/:id_usuario` | Atualiza um usuário |
| `DELETE` | `/usuarios/:id_usuario` | Remove um usuário |

### Produtos
| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/produtos` | Lista todos os produtos |
| `POST` | `/produtos` | Cria um novo produto |
| `PUT` | `/produtos/:id_produto` | Atualiza um produto |
| `DELETE` | `/produtos/:id_produto` | Remove um produto |

### Categorias
| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/categorias` | Lista todas as categorias |
| `POST` | `/categorias` | Cria uma nova categoria |
| `PUT` | `/categorias/:id_categoria` | Atualiza uma categoria |
| `DELETE` | `/categorias/:id_categoria` | Remove uma categoria |

---

## Banco de Dados

O projeto utiliza **PostgreSQL** como banco de dados relacional.

**Configuração padrão:**

| Parâmetro | Valor padrão |
|---|---|
| Host | `localhost` |
| Porta | `5432` |
| Database | `bd_produtos` |
| Usuário | `postgres` |

> As credenciais de banco de dados **não devem ser commitadas**. Utilize variáveis de ambiente em produção.

---

## Contribuição

1. Faça um fork do repositório
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/nome-da-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m "feat: descrição da feature"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin feature/nome-da-feature
   ```
5. Abra um Pull Request

---

> Projeto desenvolvido como parte do curso de Desenvolvimento de Software — 3º Semestre (2025).
