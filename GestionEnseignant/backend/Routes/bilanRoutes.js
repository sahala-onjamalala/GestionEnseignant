const express = require("express");
const router = express.Router();
const bilanController = require("../Controllers/bilanController");

router.get("/", bilanController.getBilan);
router.get("/stream", bilanController.streamBilan);

module.exports = router;