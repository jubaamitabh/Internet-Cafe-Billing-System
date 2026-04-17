// Ini adalah contoh koneksi ke database PostgreSQL
// Dalam produksi gunakan pool dari 'pg' library

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "warnet_billing",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
