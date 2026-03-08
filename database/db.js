const mysql = require("mysql2/promise");
require("dotenv").config();

const dbName = process.env.DB_NAME;

async function initialize() {
  // Conecta sem um banco definido
  const tempConnection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  });

  // Cria o banco se não existir
  await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  console.log(`Banco ${dbName} criado ou já existente!`);
  await tempConnection.end();

  // Criação de um conjunto de conexões para o BD criado
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Criação automática das tabelas
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`Order\` (
      orderId INT AUTO_INCREMENT PRIMARY KEY,
      value DECIMAL(10,2) NOT NULL,
      creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS Items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      orderId INT,
      productId INT,
      quantity INT,
      price DECIMAL(10,2),
      FOREIGN KEY (orderId) REFERENCES \`Order\`(orderId)
    )
  `);

  console.log("Tabelas criadas ou já existentes!");
  return pool;
}

module.exports = initialize;