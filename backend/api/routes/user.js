const express = require("express");
const {
  getUserBalance,
  updateUserBalance,
} = require("../controllers/userController");
const router = express.Router();

router.get("/balance", getUserBalance);
router.put("/balance", updateUserBalance);

module.exports = router;
