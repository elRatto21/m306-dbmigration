const Game = require("../models/Game");

const getGames = async () => {
    return Game.findAll();
  };