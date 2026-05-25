const pool = require("../database/db");

const getTransactions = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM transactions ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch transactions",
    });
  }
};

const createTransaction = async (req, res) => {
  try {
    const {
      title,
      amount,
      type,
      category,
      description,
      transaction_date,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO transactions
      (title, amount, type, category, description, transaction_date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [title, amount, type, category, description, transaction_date]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create transaction",
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM transactions WHERE id = $1",
      [id]
    );

    res.json({
      message: "Transaction deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete transaction",
    });
  }
};
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      amount,
      type,
      category,
      description,
      transaction_date,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE transactions
      SET
        title = $1,
        amount = $2,
        type = $3,
        category = $4,
        description = $5,
        transaction_date = $6
      WHERE id = $7
      RETURNING *
      `,
      [
        title,
        amount,
        type,
        category,
        description,
        transaction_date,
        id,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update transaction",
    });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
};