const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "money_manager",
  password: "postgres123",
  port: 5432,
});

module.exports = pool;