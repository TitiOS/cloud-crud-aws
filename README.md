### Cloud-Crud-AWS

## Sistema de Gerenciamento Financeiro em Nuvem utilizando AWS

Grupo
10374691 - LUCAS GIOVANNETTI MOTTA HORN
10437356 - ARTHUR EDUARDO DE ALMEIDA SANTOS
10427342 - THIAGO DE OLIVEIRA SILVA

## 1. Visão Geral
O projeto consiste em um sistema de gerenciamento financeiro que permite aos usuários registrar, consultar, editar e excluir transações financeiras.

A aplicação foi desenvolvida com arquitetura distribuída em nuvem utilizando serviços da AWS, aplicando conceitos de computação em nuvem, microsserviços e integração entre serviços gerenciados.

As principais funcionalidades incluem:
Cadastro de receitas e despesas
Listagem de transações
Atualização de registros financeiros
Exclusão de transações
Geração de relatórios financeiros através de AWS Lambda
Persistência dos dados em banco PostgreSQL hospedado no Amazon RDS

## 2. Arquitetura

# Camada	Serviço AWS	Descrição
Front-end	EC2 + Docker:	Aplicação React responsável pela interface do usuário
Back-end	EC2 + Docker:	API REST Node.js responsável pelas regras de negócio
Banco de Dados	Amazon RDS PostgreSQL:	Armazenamento persistente das transações
Amazon API Gateway:	Exposição das rotas da aplicação
Função Serverless	AWS Lambda:	Geração de relatórios financeiros
Segurança	Security Groups:	Controle de acesso entre os componentes
# Fluxo da Aplicação
O usuário acessa o Front-end hospedado na EC2.
O Front-end realiza chamadas para o API Gateway.
O API Gateway encaminha requisições CRUD para o Back-end.
O Back-end realiza operações no banco PostgreSQL hospedado no RDS.
Requisições para /report são encaminhadas para uma função AWS Lambda.
A Lambda consulta os dados da API e retorna estatísticas financeiras em formato JSON.

## 3. Tecnologias Utilizadas
React
Docker
Node.js
PostgreSQL
Amazon EC2
Amazon RDS PostgreSQL
Amazon API Gateway
AWS Lambda
IAM
VPC
Security Groups

## 4. Estrutura do Projeto
cloud-crud-aws/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── Dockerfile
│
├── backend/
│   ├── src/
│   ├── routes/
│   ├── models/
│   └── Dockerfile
│
├── lambda/
│   └── report/
│
├── docs/
│   └── arquitetura.png
│
├── docker-compose.yml
└── README.md

## 5. Endpoints da API
Transações
Método	Endpoint	Descrição
GET	/transactions	Lista todas as transações
GET	/transactions/	Busca uma transação
POST	/transactions	Cria uma nova transação
PUT	/transactions/	Atualiza uma transação
DELETE	/transactions/	Remove uma transação

Relatórios
GET /report/ Retorna estatísticas financeiras consolidadas.

## 7. Segurança
Banco de dados não exposto publicamente.
Comunicação protegida por Security Groups.
Controle de permissões utilizando IAM Roles.
API Gateway atuando como ponto único de entrada.

## 8. Resultados Obtidos

O projeto demonstra a integração entre múltiplos serviços AWS para construção de uma aplicação moderna baseada em microsserviços e computação em nuvem.

Foram aplicados conceitos de:

Containers com Docker;
Banco gerenciado com RDS;
Serverless com AWS Lambda;
Gerenciamento de APIs com API Gateway;
Infraestrutura em nuvem AWS.
