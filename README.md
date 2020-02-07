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

A aplicação utiliza o [Express](https://expressjs.com/), além das seguintes ferramentas:

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

<h3 align="center">
  FastFeet, continuando a aplicação
</h3>

<h3 align="center">
  :warning: Etapa 2/4 do Desafio Final :warning:
</h3>

## :rocket: Sobre o desafio

Aprimorada a aplicação FastFeet que demos início no desafio anterior implementando funcionalidades que aprendemos durante as aulas.

### **Funcionalidades do administrador**

Abaixo estão descritas as funcionalidades adicionadas na aplicação para administradores.

### **1. Gestão de entregadores**

Permitir que o administrador possa cadastrar entregadores para a plataforma.

Criada rotas para listagem/cadastro/atualização/remoção de entregadores;

Obs.: Essa funcionalidade é para administradores autenticados na aplicação.

### **2. Gestão de encomendas**

Criado cadastro de encomendas por entregador.

Quando a encomenda é **cadastrada** para um entregador, o entregador recebe um e-mail com detalhes da encomenda, com nome do produto e uma mensagem informando-o que o produto já está disponível para a retirada.

Criada rotas para listagem/cadastro/atualização/remoção de encomendas;

Obs.: Essa funcionalidade é para administradores autenticados na aplicação.

### **Funcionalidades do entregador**

Abaixo estão descritas as funcionalidades adicionadas na aplicação para os entregadores.

### **1. Visualizar encomendas**

Funcionalidade retorna as encomendas atribuidas a ele, que **não estejam entregues ou canceladas**;

Permite também que ele liste apenas as encomendas que já foram **entregues** por ele;

### 2. Alterar status de encomendas

Entregador pode incluir uma data de retirada e data de entrega para as encomendas. O entregador só pode fazer **5 retiradas por dia**.

Obs.: Funcionalidade de finalizar a entrega, permite o envio de uma imagem.

### 3. Cadastrar problemas nas entregas

Crieda rota para a distribuidora listar todas as entregas com algum problema;

Criada rota para listar todos os problemas de uma encomenda;

Criada rota para o entregador cadastrar problemas na entrega;

Criada rota para a distribuidora cancelar uma entrega baseado no ID do problema.

Quando uma encomenda é cancelada, o entregador recebe um e-mail informando-o sobre o cancelamento.
