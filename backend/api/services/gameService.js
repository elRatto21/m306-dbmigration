const Game = require("../models/Game");

const getGames = async () => {
    return Game.findAll();
  };

module.exports = { getGames };