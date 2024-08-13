# Tech Challenge Fase 5 - Turma 4SOAT - Grupo 77

Este repositório contém um microserviço da aplicação Tech Challenge Fast Food, construída com uma arquitetura limpa. O microserviço utiliza um banco de dados MySQL para armazenar dados relacionados a pagamentos e implementa o padrão Saga para orquestração de transações distribuídas. O sistema de mensageria é gerido pelo RabbitMQ, e a aplicação é escaneada para vulnerabilidades de segurança com OWASP ZAP.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descrição

Este é um microserviço de pagamento desenvolvido com o framework [Nest](https://github.com/nestjs/nest) utilizando Serverless, Prisma, e RabbitMQ. Ele oferece uma solução escalável e eficiente para o processamento de pagamentos, com suporte ao padrão Saga para garantir consistência em transações distribuídas.

A aplicação foi escaneada utilizando OWASP ZAP, garantindo conformidade com os padrões de segurança e proteção de dados de acordo com a LGPD.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (>= 18.x)
- [Yarn](https://yarnpkg.com/)
- [Serverless Framework](https://www.serverless.com/)
- [Prisma](https://www.prisma.io/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [OWASP ZAP](https://www.zaproxy.org/)

## Instalação

Clone o repositório e instale as dependências:

```bash
$ git clone https://github.com/Projetosgeovane/fastfood-payment-service.git
$ cd fastfood-payment-service
$ yarn install
```
Crie um arquivo `.env` no diretório raiz e adicione as variáveis de ambiente necessárias. Consulte o arquivo `.env.example` para orientação.

```bash
DATABASE_URL="mysql://usuario:senha@localhost:5432/nome_do_banco"
```
Substitua `usuario`, `senha`, `localhost`, `5432`, `nome_do_banco`, e `5672` pelos valores apropriados para sua configuração.

## Setup do Prisma

Gere o cliente Prisma com o comando:

```bash
npx prisma generate
```
Aplique as migrações do banco de dados com o comando:
```bash
npx prisma migrate dev
```

## Executando a Aplicação

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

As APIs disponíveis incluem:  
**1. Criação de pedidos sem identificação do cliente, pedidos com o cliente e Busca de Pedidos**

Para utilizar as APIs, acesse - (https://documenter.getpostman.com/view/15832888/2sA3QngZ2x#df732d55-ed2c-4ec1-

b288-3062b66dba9b) no Postman.

## Novas Funcionalidades

### Implementação do Padrão Saga

O padrão Saga foi implementado para orquestrar transações distribuídas, garantindo que as operações sejam consistentes e que, em caso de falha, todas as ações sejam devidamente compensadas. Este padrão é essencial para manter a integridade dos dados em um sistema distribuído.

![Arquitetura Saga](https://github.com/Projetosgeovane/fastfood-product-service/blob/main/Arquitetura%20Saga.jpg)

### Integração com RabbitMQ

Utilizamos RabbitMQ para gerenciar a fila de mensagens entre os microserviços, assegurando uma comunicação assíncrona e eficiente. Essa integração é fundamental para o funcionamento do padrão Saga e para a comunicação entre os diferentes serviços.

### Scaneamento de Segurança com OWASP ZAP

A aplicação foi escaneada para identificar vulnerabilidades de segurança utilizando a ferramenta OWASP ZAP. Este scaneamento é parte do esforço para garantir a conformidade com a LGPD e proteger os dados dos usuários.

## Links Importantes

-  [Repositório Orchestrator](https://github.com/Projetosgeovane/orchestrator)
-   [Repositório Microserviço Orders](https://github.com/Projetosgeovane/fastfood-order-service)
-   [Repositório Microserviço Payments](https://github.com/Projetosgeovane/fastfood-payment-service)
-   [Repositório Microserviço Products](https://github.com/Projetosgeovane/fastfood-product-service)
-   [Repositório Microserviço Customers](https://github.com/Projetosgeovane/fastfood-customer-service)
-   [Relatório OWASP](https://onedrive.live.com/?cid=F8DA2A1BC167CE49&id=F8DA2A1BC167CE49%21s066b0f4e125047bdadf944785ec3deea&parId=F8DA2A1BC167CE49%21sa0f22f73ccaf41f78c5d26d78a5b12e9&o=OneUp)
-  [Relatório LGPD](https://onedrive.live.com/:w:/g/personal/F8DA2A1BC167CE49/EfY4JP2nesJPo5lvVjqSXF4BTHVX4nOzUkhEa4Ssp1SbPg?resid=F8DA2A1BC167CE49!sfd2438f67aa74fc2a3996f563a925c5e&ithint=file%2Cdocx&e=4%3AtSxA7s&sharingv2=true&fromShare=true&at=9&wdOrigin=OWA.LINK&wdPreviousSession=f89075b6-2395-41ab-aed0-37e7bb080a5a&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3cvYy9mOGRhMmExYmMxNjdjZTQ5L0VmWTRKUDJuZXNKUG81bHZWanFTWEY0QlRIVlg0bk96VWtoRWE0U3NwMVNiUGc_ZT00OnRTeEE3cyZzaGFyaW5ndjI9dHJ1ZSZmcm9tU2hhcmU9dHJ1ZSZhdD05JndkT3JpZ2luPU9XQS5MSU5LJndkUHJldmlvdXNTZXNzaW9uPWY4OTA3NWI2LTIzOTUtNDFhYi1hZWQwLTM3ZTdiYjA4MGE1YQ)
-   [Coleção Postman](https://documenter.getpostman.com/view/15832888/2sA3QngZ2x#df732d55-ed2c-4ec1-b288-3062b66dba9b)
-   [Vídeo de Explicação](https://www.youtube.com/watch?v=5PkAGDtcWpo)





