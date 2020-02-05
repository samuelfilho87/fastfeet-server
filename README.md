<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/blob/master/.github/logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio: FastFeet, o início
</h3>

<h3 align="center">
  :warning: Etapa 1/4 do Desafio Final :warning:
</h3>

<p>Esse desafio faz parte do Desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile) que é avaliada para emissão do Certificado do Bootcamp GoStack.</p>

## :rocket: Sobre o desafio

É um app para uma transportadora fictícia, o FastFeet.

Nesse primeiro desafio foi criado algumas funcionalidades básicas que aprendemos ao longo das aulas até aqui. Esse projeto será desenvolvido aos poucos até o fim da jornada será uma aplicação completa envolvendo back-end, front-end e mobile, que será utilizada para a **certificação do bootcamp**!

### **Um pouco sobre as ferramentas**

A aplicação utilizanda o [Express](https://expressjs.com/), além das seguintes ferramentas:

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Com PostgreSQL);

### **Funcionalidades**

Abaixo estão descritas as funcionalidades adicionadas na aplicação.

### **1. Autenticação**

Permiti que o usuário se autentique utilizando e-mail e uma senha.

- A autenticação é feita utilizando JWT.
- Realiza a validação dos dados de entrada;

### 2. Gestão de destinatários

Destinatários são mantidos (cadastrados/atualizados) na aplicação.

O cadastro de destinatários só pode ser feito por administradores autenticados na aplicação.

O destinatário não pode se autenticar no sistema, ou seja, não possui senha.
