const express = require("express");
const router = express.Router();
const pool = require("../db");

//Ajout d'un enseignant
router.post('/', async (req, res) => {
  try {
    const { matricule, nom, taux_horaire, nombre_heure } = req.body;

    // DEBUG
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

// Récupérer tous les enseignants
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM enseignant ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mettre à jour les informations d'un enseignant
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { matricule, nom, taux_horaire, nombre_heure } = req.body;
  try {
    await pool.query(
      "UPDATE enseignant SET matricule = $1, nom = $2, taux_horaire = $3, nombre_heure = $4 WHERE id = $5",
      [matricule, nom, taux_horaire, nombre_heure, id]
    );
    res.json({ message: "Mis à jour avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Suppression d'un enseignant
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      "DELETE from enseignant WHERE id = $1", [id]
    );
    res.json({ message: "Suppression avec succès"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;