const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Serveur opérationnel !');
});

app.listen(PORT, () => {
    console.log(`Le serveur tourne sur http://localhost:${PORT}`);
});

const pool = require('./db');

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});