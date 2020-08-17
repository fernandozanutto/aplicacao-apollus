Projeto feito com React (front-end) e Java Spring (back-end)

## Executando o projeto
Primeiramente, clone este repositório e entre na pasta.

Para instalar as dependências das pastas `client` e `server`, e executar as aplicações:

  Em um terminal rode:

`cd server`

`mvn spring-boot:run`

  Em outro terminal rode:

`cd client`

`npm run install` ou `yarn install`

`npm run start` ou `yarn start`


Ao rodar a aplicação React, já deve abrir uma página no navegador, caso não abra, acesse `http://localhost:3000`

Ao rodar o servidor back-end foi criado um banco de dados já populado com alguns dados de exemplo, incluindo um usuário administrador. Este banco de dados está apenas em memória, então caso o servidor seja reiniciado, as alterações do banco de dados serão perdidas.

Para fazer login:

Usuário administrador: `admin@admin.com`

Senha adminstrador: `admin`

Usuário comum: `user@user.com`

Senha usuário: `123`

