const db = require("../database/db");


const list = async (req, res) => {
  try {
    const [orders] = await db.query("SELECT * FROM `Order` ORDER BY creationDate DESC");
    res.json(orders);

  } catch (error) {
    res.status(500).json({
      erro: "Erro ao listar pedidos",
      detalhe: error.message
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [orders] = await db.query(
      "SELECT * FROM `Order` WHERE orderId = ?",
      [id]
    );

    if (orders.length === 0) return res.status(404).json({ mensagem: "Pedido não encontrado" });

    const [items] = await db.query(
      "SELECT * FROM Items WHERE orderId = ?",
      [id]
    );

    res.json({
      ...orders[0],
      items
    });

  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar pedido",
      detalhe: error.message
    });
  }
};

const insert = async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { value, items } = req.body;

    if (!value) {
      return res.status(400).json({
        mensagem: "Campo \"value\" é obrigatório"
      });
    }

    await connection.beginTransaction();

    const [orderResult] = await connection.query(
      "INSERT INTO `Order` (value, creationDate) VALUES (?, NOW())",
      [value]
    );

    const orderId = orderResult.insertId;

    if (Array.isArray(items) && items.length > 0) {

      const itemValues = items.map(item => [
        orderId,
        item.productId,
        item.quantity,
        item.price
      ]);

      await connection.query(
        `INSERT INTO Items 
        (orderId, productId, quantity, price) 
        VALUES ?`,
        [itemValues]
      );
    }

    await connection.commit();

    res.status(201).json({
      mensagem: "Pedido criado com sucesso",
      orderId
    });

  } catch (error) {
    await connection.rollback();

    res.status(500).json({
      erro: "Erro ao criar pedido",
      detalhe: error.message
    });

  } finally {
    connection.release();
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    const [result] = await db.query(
      "UPDATE `Order` SET value = ? WHERE orderId = ?",
      [value, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensagem: "Pedido não encontrado"
      });
    }

    res.json({
      mensagem: "Pedido atualizado"
    });

  } catch (error) {
    res.status(500).json({
      erro: "Erro ao atualizar pedido",
      detalhe: error.message
    });
  }
};

const deleteById = async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { id } = req.params;

    await connection.beginTransaction();

    await connection.query(
      "DELETE FROM Items WHERE orderId = ?",
      [id]
    );

    const [result] = await connection.query(
      "DELETE FROM `Order` WHERE orderId = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();

      return res.status(404).json({
        mensagem: "Pedido não encontrado"
      });
    }

    await connection.commit();

    res.json({
      mensagem: "Pedido e itens removidos"
    });

  } catch (error) {
    await connection.rollback();

    res.status(500).json({
      erro: "Erro ao excluir pedido",
      detalhe: error.message
    });

  } finally {
    connection.release();
  }
};

module.exports = {
  list,
  getById,
  insert,
  update,
  deleteById
};