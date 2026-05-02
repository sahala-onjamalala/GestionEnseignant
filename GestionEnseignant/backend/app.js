const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// IMPORT ROUTES
const bilanRoutes = require("./Routes/bilanRoutes");

// UTILISATION ROUTES
app.use("/api/bilan", bilanRoutes);

// TEST ROOT
app.get("/", (req, res) => {
  res.send("Serveur OK");
});

app.listen(5000, () => {
  console.log("Serveur lancé sur http://localhost:5000");
});