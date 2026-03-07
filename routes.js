const express = require('express');
const router = express.Router();
const orderController = require('./controllers/orderController');
const authController = require("./controllers/authController");
const authMiddleware = require("./middleware/authMiddleware");

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     tags: [Autenticação]
 *     description: Autenticação do usuário, com o retorno do token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Usuário ou senha inválidos
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: Listagem dos pedidos
 *     tags: [Pedidos]
 *     description: Retorna os pedidos cadastrados, ordenados por data de criação
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get('/order/list', orderController.list);

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Busca o pedido pelo ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */
router.get('/order/:id', orderController.getById);

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Insere um novo pedido
 *     tags: [Pedidos]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente:
 *                 type: string
 *               valor:
 *                 type: number
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 */
router.post('/order', authMiddleware, orderController.insert);

/**
 * @swagger
 * /order/{id}:
 *   put:
 *     summary: Atualiza um pedido existente através do ID
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido atualizado
 */
router.put('/order/:id', authMiddleware, orderController.update);

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Deleta um pedido existente através do ID
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido atualizado
 */
router.delete('/order/:id', authMiddleware, orderController.deleteById);

module.exports = router;