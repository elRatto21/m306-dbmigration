const express = require('express');
const { postCoinflip } = require('../controllers/coinflipController');
const router = express.Router();

router.post('', postCoinflip);

module.exports = router;
