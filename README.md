
<h1 align="center">Tech Challenge Fase 4 - Turma 4SOAT - Grupo 77</h1>
Este repositório é um microserviço da aplicação tech challenge fast food construída com uma arquitetura limpa.   
O microserviço utiliza um banco de dados MySQL para armazenar dados relacionados a orders.  

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest



## Descrição

Este é um projeto de microserviço de pagamento usando o framework [Nest](https://github.com/nestjs/nest) com Serverless e Prisma. Ele fornece uma solução escalável e eficiente para o processamento de pagamentos.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (>= 18.x)
- [Yarn](https://yarnpkg.com/)
- [Serverless Framework](https://www.serverless.com/)
- [Prisma](https://www.prisma.io/)


## Instalação

Clone o repositório e instale as dependências:

```bash
$ git clone https://github.com/Projetosgeovane/fastfood-payment-service.git
$ cd fastfood-payment-service
$ yarn install
```

## Configuração do Ambiente

Crie um arquivo `.env` no diretório raiz e adicione as variáveis de ambiente necessárias. Consulte o arquivo `.env.example` para orientação.

adicione as seguintes variáveis de ambiente:

`DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"` 

Substitua `usuario`, `senha`, `localhost`, `5432` e `nome_do_banco` pelos valores apropriados para sua configuração.

## Setup do Prisma

Gere o cliente Prisma com o comando:

npx prisma generate

Aplique as migrações do banco de dados com o comando:

`npx prisma migrate dev`

## Executando a aplicação

### Desenvolvimento
```
yarn start
```

### Modo de Observação

`yarn start:dev`


### Produção

`yarn start:prod`


## Deployment

Faça o deploy da aplicação usando o Serverless Framework:

`yarn deploy`


## Testes

Execute os seguintes comandos para realizar os testes:

### Testes Unitários

`yarn test`


### Testes de Integração (End-to-End)

`yarn test:e2e`


### Cobertura de Testes

`yarn test:cov`


## Linting e Formatação

Garanta que seu código atenda aos padrões do projeto:

` Lint do código`


`yarn lint`


# Formatação do código

`yarn format`


## Debugging

Use o seguinte comando para iniciar o debugging:

`yarn test:debug`

## Sonarqube

![SonarQube Report](https://github.com/Projetosgeovane/fastfood-payment-service/blob/main/img/sonar.png?raw=true)

Coverage

![SonarQube Coverage](https://github.com/Projetosgeovane/fastfood-payment-service/blob/main/img/coverage.png?raw=true)

## APIs Disponíveis

As APIs disponíveis são: <br />  
**1. Criação de pedidos sem identificação do cliente, pedido com o cliente e Busca de Pedidos**<br />

Para utilizar as APIs importe o arquivo: [Tech-challenge.postman_collection.json](https://github.com/pietroow/tech-challenge-pos-tech/blob/main/Tech-challenge.postman_collection.json) no Postman.
