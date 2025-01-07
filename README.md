# StudentBlog

StudentBlog é uma aplicação de blog para estudantes com gerenciamento de usuários, implementada em Node.js, Express, TypeScript e PostgreSQL.

## Índice

1. [Introdução](#introdução)
2. [Setup Inicial](#setup-inicial)
3. [Arquitetura da Aplicação](#arquitetura-da-aplicação)
4. [Guia de Uso das APIs](#guia-de-uso-das-apis)
5. [Testes e Qualidade](#testes-e-qualidade)
6. [Deploy](#deploy)
7. [Contribuições](#contribuições)

## Introdução

StudentBlog é uma plataforma que permite aos estudantes criar, editar e excluir postagens de blog, bem como gerenciar contas de usuário. A aplicação segue os princípios da Clean Architecture, garantindo um código limpo e manutenível.

## Setup Inicial

### Requisitos

- Node.js (v14 ou superior)
- Docker
- PostgreSQL
- Dependências do Node.js listadas no `package.json`

### Instalação

1. Clone este repositório:

    ```bash
    git clone https://github.com/seu-usuario/studentblog.git
    cd studentblog
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Crie e configure o arquivo `.env`:

    ```bash
    POSTGRES_USER=studentblog
    POSTGRES_PASSWORD=studentblog
    POSTGRES_DB=studentblog
    JWT_SECRET=sua_chave_secreta
    ```

4. Inicie os contêineres Docker:

    ```bash
    docker-compose up --build
    ```

## Arquitetura da Aplicação

A aplicação segue os princípios da Clean Architecture, dividida em várias camadas:

- **Domain**: Contém as entidades e interfaces de repositórios.
- **Use-Cases**: Implementa os casos de uso principais.
- **Infrastructure**: Configurações de banco de dados, modelos ORM e implementação dos repositórios.
- **Interfaces**: Contém os controladores e rotas para a API.

Estrutura de diretórios:

StudentBlog/<br>
├── .githut/workflows/<br>
│   ├── ci-cd.yml/<br>
├── config/<br>
│   ├── config.js/<br>
├── src/<br>
│   ├── domain/<br>
│   │   ├── entities/<br>
│   │   │   ├── Post.ts<br>
│   │   │   └── User.ts<br>
│   │   ├── repositories/<br>
│   │   │   ├── PostRepository.ts<br>
│   │   │   └── UserRepository.ts<br>
│   ├── use-cases/<br>
│   │   ├── posts/<br>
│   │   │   ├── __tests__/<br>
│   │   │   │   ├── CreatePost.spec.ts<br>
│   │   │   │   ├── DeletePost.spec.ts<br>
│   │   │   │   ├── ListPosts.spec.ts<br>
│   │   │   │   ├── UpdatePost.spec.ts<br>
│   │   │   ├── CreatePost.ts<br>
│   │   │   ├── DeletePost.ts<br>
│   │   │   ├── GetPostById.ts<br>
│   │   │   ├── ListPosts.ts<br>
│   │   │   ├── SearchPosts.ts<br>
│   │   │   ├── UpdatePost.ts<br>
│   │   └── users/<br>
│   │       ├── __tests__/<br>
│   │       │   ├── CreateUser.spec.ts<br>
│   │       │   ├── DeleteUser.spec.ts<br>
│   │       │   ├── GetUserById.spec.ts<br>
│   │       │   ├── LoginUser.spec.ts<br>
│   │       │   ├── UpdateUser.spec.ts<br>
│   │       ├── CreateUser.ts<br>
│   │       ├── DeleteUser.ts<br>
│   │       ├── GetUserById.ts<br>
│   │       ├── LoginUser.ts<br>
│   │       ├── UpdateUser.ts<br>
│   ├── infrastructure/<br>
│   │   ├── database/<br>
│   │   │   ├── config.ts<br>
│   │   │   ├── migrations/<br>
│   │   │   │   ├── createPostTable.ts<br>
│   │   │   │   ├── createUserTable.ts<br>
│   │   │   ├── models/<br>
│   │   │   │   ├── Post.ts<br>
│   │   │   │   └── User.ts<br>
│   ├── express/<br>
│   │   ├── App.ts<br>
│   │   └── routes/<br>
│   │       ├── Posts.ts<br>
│   │       └── Users.ts<br>
│   ├── interfaces/<br>
│   │   ├── controllers/<br>
│   │   │   ├── PostController.ts<br>
│   │   │   └── UserController.ts<br>
│   │   ├── presenters/<br>
│   │   └── views/<br>
│   ├── __tests__/integration/<br>
│   │   ├── posts.integration.spec.ts<br>
│   │   ├── users.integration.spec.ts<br>
│   ├── server.ts<br>
├── .env<br>
├── .eslintrc.json<br>
├── .gitignore<br>
├── docker-compose.yml<br>
├── Dockerfile<br>
├── Dockerfile.dev<br>
├── jest.config.js<br>
├── package.json<br>
├── README.md<br>
└── tsconfig.json<br>