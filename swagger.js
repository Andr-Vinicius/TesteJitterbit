const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Pedidos",
      description: `API responsável pelo gerenciamento de pedidos. 
      Permite criar, listar, atualizar e excluir pedidos através de endpoints REST protegidos pela autenticação JWT (Criação, Atualização, Exclusão).
      \nOs pedidos possuem Identificadores, Valor e Data de Criação, além de itens associados. Esses itens possuem preço e quantidade.`,
      version: "1.0.0"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./routes.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;