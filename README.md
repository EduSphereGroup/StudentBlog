## 👋  Bem-vindo(a)

Projeto desenvolvido para resolver o Tech Challenge - Fase 2 - FIAP.

Sobre o desafio: "_Desenvolver uma API para uma aplicação de blogging dinâmico._"

**Integrantes**

- Gabriel Nascimento - RM359635
- Rodrigo Souza - RM359534
- Stella Yano - RM359726
- Vinicius Wrubleski - RM359675
- Vitor Bassani - RM358848

##

## Estrutura do Projeto

student-blog/<br>
├── .github/<br>
│   ├── workflows/<br>
│   │   ├── ci-cd.yml<br>
├── backend/<br>
│   ├── controllers/<br>
│   │   ├── postController.ts<br>
│   ├── models/<br>
│   │   ├── postModel.ts<br>
│   ├── routes/<br>
│   │   ├── postRoutes.ts<br>
│   ├── middleware/<br>
│   │   ├── auth.ts<br>
│   ├── config/<br>
│   │   ├── db.ts<br>
│   ├── tests/<br>
│   │   ├── postRoutes.test.ts<br>
│   ├── migrations/<br>
│   │   ├── 001_create_posts_table.sql<br>
│   ├── .env<br>
│   ├── docker-compose.yml<br>
│   ├── Dockerfile<br>
│   ├── app.ts<br>
│   ├── package.json<br>
│   ├── tsconfig.json<br>
└── README.md<br>


## Pré-requisitos

- [Node.js 18](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Configuração do Projeto

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/student-blog.git
cd student-blog
Backend
Configuração Local
Navegue até o diretório do backend:

cd backend
Instale as dependências do Node.js:

npm install
Configure as variáveis de ambiente: Crie um arquivo .env na raiz do diretório backend e adicione as seguintes variáveis:

DB_NAME=student_blog
DB_USER=user
DB_PASSWORD=password
DATABASE_URL=postgres://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}
Inicie o PostgreSQL utilizando Docker Compose:

docker-compose up -d
Execute as migrações do banco de dados:

psql -h localhost -d student_blog -U user -a -f ./migrations/001_create_posts_table.sql
Compile o projeto:

npm run build
Inicie o servidor:

npm start
O servidor estará disponível em http://localhost:5000.

Executando Testes
Para executar os testes, use o comando:


npm test
Frontend
(O frontend ainda não está configurado neste exemplo, mas você pode adicionar as instruções relevantes aqui.)

CI/CD com GitHub Actions
O projeto utiliza GitHub Actions para automação de testes e deploy. O arquivo de workflow está localizado em .github/workflows/ci-cd.yml.

Adicionando Variáveis de Ambiente no GitHub
Vá para o seu repositório no GitHub.
Vá para Settings > Secrets > New repository secret.
Adicione os seguintes secrets:
DB_NAME: Nome do banco de dados (e.g., student_blog).
DB_USER: Nome de usuário do banco de dados (e.g., user).
DB_PASSWORD: Senha do banco de dados (e.g., password).
Docker
Você pode executar todo o projeto usando Docker Compose. Garanta que você configurou o .env como detalhado acima.

Para iniciar todo o stack (backend e banco de dados), use:


docker-compose up
Este comando irá configurar e iniciar os serviços definidos no arquivo docker-compose.yml.

Autor
Escrito por [Seu Nome]

Licença
Este projeto é licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.