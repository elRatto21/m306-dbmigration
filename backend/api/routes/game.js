const express = require("express");
const {
  getAllGames
} = require("../controllers/gameController");
const router = express.Router();

router.get("/games", getAllGames);

module.exports = router;
