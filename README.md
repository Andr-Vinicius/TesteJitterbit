# Teste - Jitterbit
O objetivo do desafio era desenvolver uma API em NodeJS para gerenciamento de pedidos, com as suas devidas operações de CRUD.

## Instalações/Configurações
1. [VSCode](https://code.visualstudio.com/download), essa foi a IDE para desenvolvimento da API, porém não é necessária para a execução da API;
2. [Xampp](https://www.apachefriends.org/download.html), necessário instalar um Gerenciador de Banco de Dados. Após a instalação, inicie o MySQL e o Apache;
3. No seu terminal, realizar o comando `git clone git@github.com:Andr-Vinicius/TesteJitterbit.git`;
4. Após extrair a pasta, criar o arquivo .env com as configurações passadas pelo email.

## Inicialização
1. Na raiz da pasta, pelo terminal, executar o comando `npm install` para instalar todas as dependências;
2. Executar o comando `node index.js` para iniciar o servidor da API;
3. Testes podem ser executados pelo [Postman](https://www.postman.com/downloads/) ou diretamente no navegador através do http://localhost:3000/api/ + Rotas.

## SwaggerUI
- Documentação do SwaggerUI: http://localhost:3000/api-docs/

## Bibliotecas utilizadas
- Express
- SwaggerUI
- MySQL
- Json Web Token (JWT - Autenticação)
- BcryptJS (Encriptação da senha)
- Dotenv (Variáveis de Ambiente do Projeto)

## Observações
- Ainda não havia utilizado o SwaggerUI, apenas conhecia, então foi interessante adquirir mais esse conhecimento
- Tentei deixar a utilização do projeto o mais clara o possivel, apesar de não ter tanta experiência com esse uso mais completo do Readme
- Já havia desenvolvido APIs Rest anteriormente, então essa foi uma parte mais tranquila, porém estava há algum tempo sem usar Node/Express, então foi bem legal retomar os estudos

