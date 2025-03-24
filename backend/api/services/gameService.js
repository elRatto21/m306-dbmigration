const Game = require("../models/Game");

const register = async (username, password) => {
    return Game.findAll();
  };