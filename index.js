// Express para a criação da API
const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const routes = require('./routes');
app.use('/api', routes);

const authRoutes = require("./routes");
app.use("/auth", authRoutes);

// Documentação com Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});