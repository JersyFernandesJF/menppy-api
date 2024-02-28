# menppy-api

This a Back End for [Front End Application](https://github.com/JersyFernandesJF/trappy-menu-app) and Web Application

## Installation

Make sure you have Node.js, npm and Docker installed globally on your machine.

-[Node JS](https://nodejs.org/en/download/current)
-[Docker](https://www.docker.com/)

1. Clone this repository.
2. Run npm install to install dependencies.
3. Copy .env.example to .env and fill in the environment variables as needed:
    NODE_ENV=dev
    DATABASE_URL="postgresql://menppy:menppy@localhost:5432/menppy?schema=public"
    SECRET_KEY="TdW4fTfRohSm3OfN6Ld3PY0QIBHdUu1YH1NdCMtdePg=asdmenpy"
    APP_NAME=Menppy
    PORT=3333
4. Run docker app with:
   $ docker compose up
5.Open another terminal command and run:
  $ yarn dev
  or
  $ npm dev
6. Go to http://localhost:3000 to view the project.

### How to run

To run this web app you must need to install:

> You've Probably already installed it

- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/) Optional

After that go to your project folder and run:

```bash
$ yarn # To install the dependencies
$ yarn dev # To run the app

## Estrutura do Projeto

-src
  --controller(Controllers Implementation)
  --entity(Models Implementation)
  --Routes(Routes Implementation)

## Technologies Used

- [Node.js](https://nodejs.org/en/download/current)
- [TypeScript](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
- [Prisma](https://www.prisma.io/)
- [TypeORM](https://typeorm.io/)
- Outras tecnologias, se aplicável.
