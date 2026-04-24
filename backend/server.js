const express = require('express');
const app = express();
const PORT = 5000;

const cors = require('cors');
app.use(cors());

const { Pool } = require('pg');

app.use(express.json()); // IMPORTANT

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gestion-enseignants',
  password: '123456',
  port: 5432,
});

// Test connexion
pool.connect()
  .then(() => console.log("✅ Connecté à PostgreSQL"))
  .catch(err => console.error("❌ Erreur connexion", err));

// Route test
app.get('/', (req, res) => {
  res.send('Serveur opérationnel !');
});

// GET
app.get('/enseignants', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        matricule,
        nom,
        taux_horaire,
        nombre_heure,
        (taux_horaire * nombre_heure) AS prestation
      FROM enseignant
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/enseignants', async (req, res) => {
  try {
    const { matricule, nom, taux_horaire, nombre_heure } = req.body;

    // DEBUG (optionnel)
    console.log(req.body);

    // VALIDATION
    if (!matricule || !nom || !taux_horaire || !nombre_heure) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont obligatoires"
      });
    }

    const result = await pool.query(
      `INSERT INTO enseignant (matricule, nom, taux_horaire, nombre_heure)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [matricule, nom, taux_horaire, nombre_heure]
    );

    res.json({
      success: true,
      message: "Insertion réussie",
      data: result.rows[0]
    });

  } catch (err) {
    console.error(err);

    if (err.code === '23505') {
      return res.status(400).json({
        success: false,
        message: "Matricule déjà existant"
      });
    }

    res.status(500).json({
      success: false,
      message: "Erreur lors de l'insertion"
    });
  }
});

app.put('/enseignants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { matricule, nom, taux_horaire, nombre_heure } = req.body;

    // Validation
    if (!matricule || !nom || !taux_horaire || !nombre_heure) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont obligatoires"
      });
    }

    const result = await pool.query(
      `UPDATE enseignant 
       SET matricule = $1, nom = $2, taux_horaire = $3, nombre_heure = $4
       WHERE id = $5 RETURNING *`,
      [matricule, nom, taux_horaire, nombre_heure, id]
    );

    // Si id n'existe pas
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Enseignant non trouvé"
      });
    }

    res.json({
      success: true,
      message: "Modification réussie",
      data: result.rows[0]
    });

  } catch (err) {
    console.error(err);

    if (err.code === '23505') {
      return res.status(400).json({
        success: false,
        message: "Matricule déjà existant"
      });
    }

    res.status(500).json({
      success: false,
      message: "Erreur lors de la modification"
    });
  }
});

app.delete('/enseignants/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM enseignant WHERE id = $1 RETURNING *`,
      [id]
    );

    // Si l'id n'existe pas
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Enseignant non trouvé"
      });
    }

    res.json({
      success: true,
      message: "Suppression réussie",
      data: result.rows[0]
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression"
    });
  }
});

// TOUJOURS A LA FIN
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur http://localhost:${PORT}`);
});