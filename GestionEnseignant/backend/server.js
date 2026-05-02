const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

//IMPORT ROUTES
const bilanRoutes = require("./Routes/bilanRoutes");
const enseignantRoutes = require("./Routes/enseignantRoutes");

//UTILISATION ROUTES
app.use("/api/bilan", bilanRoutes);
app.use("/api/enseignant", enseignantRoutes); //implique que l'url sera  http://localhost:5000/api/enseignant

app.get("/", (req, res) => {
  res.send("Serveur Backend opérationnel");
});

app.listen(5000, () => {
  console.log("Serveur lancé sur http://localhost:5000");
});