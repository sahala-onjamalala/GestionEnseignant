require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test de connexion
pool.connect((err, client, done) => {
  if (err) throw err;
  console.log('Connecté à la base de données PostgreSQL avec succès !');
  done();
});

module.exports = pool;