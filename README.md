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

StudentBlog/<br>
├── .github/<br>
│   ├── workflows/<br>
│   │   ├── ci-cd.yml<br>
├── src/<br>
│   ├── config/<br>
│   │   ├── db.ts<br>
│   ├── controllers/<br>
│   │   ├── postController.ts<br>
│   ├── middleware/<br>
│   │   ├── auth.ts<br>
│   ├── migrations/<br>
│   │   ├── 001_create_posts_table.sql<br>
│   ├── models/<br>
│   │   ├── postModel.ts<br>
│   ├── routes/<br>
│   │   ├── postRoutes.ts<br>
│   ├── tests/<br>
│   │   ├── postRoutes.test.ts<br>
│   ├── app.ts<br>
├── .env<br>
├── .gitignore<br>
├── docker-compose.yml<br>
├── Dockerfile<br>
├── package.json<br>
├── README.md<br>
└── tsconfig.json<br>