console.log(__dirname);  // Affiche le chemin actuel
const pool = require("../db");
console.log(pool);  // Vérifie si l'import fonctionne

// API normale
exports.getBilan = async (req, res) => {
  const result = await pool.query(`
    SELECT 
      SUM(taux_horaire * nombre_heures) AS total,
      MIN(taux_horaire * nombre_heures) AS min,
      MAX(taux_horaire * nombre_heures) AS max,
      AVG(taux_horaire * nombre_heures) AS moyenne,
      COUNT(*) AS nombre_enseignants
    FROM enseignant
    WHERE taux_horaire IS NOT NULL AND nombre_heures IS NOT NULL
  `);

  res.json(result.rows[0]);
};

// API SSE
exports.streamBilan = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendData = async () => {
    const result = await pool.query(`
      SELECT 
        SUM(taux_horaire * nombre_heures) AS total,
        MIN(taux_horaire * nombre_heures) AS min,
        MAX(taux_horaire * nombre_heures) AS max,
        AVG(taux_horaire * nombre_heures) AS moyenne,
        COUNT(*) AS nombre_enseignants,
        NOW() AS timestamp
      FROM enseignant
      WHERE taux_horaire IS NOT NULL AND nombre_heures IS NOT NULL
    `);

    res.write(`data: ${JSON.stringify(result.rows[0])}\n\n`);
  };

  sendData();
  const interval = setInterval(sendData, 5000);

  req.on("close", () => clearInterval(interval));
};